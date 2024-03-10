import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  _cartIconIndentOffsets = {
    container: 20,
    page: 10
  }
  _cartIconMobileSize = 767;
  _cartIconStyleVariants = {
    static: {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    },
    scrollable: {
      position: 'fixed',
      top: '50px',
      zIndex: 1e3,
      left: ''
    }
  }

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  #getCartIconTopCoordinate () {
    this._cartIconTopCoordinate = this.elem.getBoundingClientRect().top + window.scrollY;
  }

  #getCartIconLeftIndent() {
    const containerIndent = document.querySelector('.container').getBoundingClientRect().right + this._cartIconIndentOffsets.container;
    const pageIndent = document.documentElement.clientWidth - this.elem.offsetWidth - this._cartIconIndentOffsets.page;

    this._cartIconLeftIndent = `${Math.min(containerIndent, pageIndent)}px`;
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
        .getTotalPrice()
        .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        {once: true}
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this._cartIconTopCoordinate) this.#getCartIconTopCoordinate();

    if (document.documentElement.clientWidth <= this._cartIconMobileSize) {
      Object.assign(this.elem.style, this._cartIconStyleVariants.static);

      return;
    }

    if (window.scrollY > this._cartIconTopCoordinate) {
      this.#getCartIconLeftIndent();
      this._cartIconStyleVariants.scrollable.left = this._cartIconLeftIndent;

      Object.assign(this.elem.style, this._cartIconStyleVariants.scrollable);
    } else {
      Object.assign(this.elem.style, this._cartIconStyleVariants.static);
    }
  }
}
