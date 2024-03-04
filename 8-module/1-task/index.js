import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  _cartIconInitialTopCoordinate = 0;
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
      left: 0
    }
  }

  constructor() {
    this.render();

    this.addEventListeners();
  }

  #getCartIconLeftIndent() {
    const containerIndent = document.querySelector('.container').getBoundingClientRect().right + this._cartIconIndentOffsets.container;
    const pageIndent = document.documentElement.clientWidth - this.elem.offsetWidth - this._cartIconIndentOffsets.page;

    this._cartIconStyleVariants.scrollable.left = `${Math.min(containerIndent, pageIndent)}px`;
  }

  #getCartIconInitialTopCoordinate() {
    this._cartIconInitialTopCoordinate = this.elem.getBoundingClientRect().top + window.pageYOffset;
  }

  #getCartIconVisibility() {
    return (window.pageYOffset > this._cartIconInitialTopCoordinate) && (document.documentElement.clientWidth > this._cartIconMobileSize);
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.#getCartIconLeftIndent();
      this.#getCartIconInitialTopCoordinate();
      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.#getCartIconVisibility()) {
      Object.assign(this.elem.style, this._cartIconStyleVariants.scrollable);
    } else {
      Object.assign(this.elem.style, this._cartIconStyleVariants.static);
    }
  }
}
