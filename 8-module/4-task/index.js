import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import convertPrice from '../../assets/lib/convert-price.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  _modal = null;
  _modalSettings = {
    title: 'Your order',
    successTitle: 'Success!',
    modalActiveClass: 'is-modal-open',
    modalHolderClass: 'modal',
    modalHolderElement: null,
  };
  _formSettings = {
    loadingClass: 'is-loading',
    formHolderClass: 'cart-form',
    formHolderElement: null,
    formFetchAddress: 'https://httpbin.org/post'
  }
  _cartControls = {
    reduceControl: 'cart-counter__button_minus',
    addControl: 'cart-counter__button_plus',
  }

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(({product: {id}}) => id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(({product: {id}}) => id === productId);

    if (!cartItem) return;

    switch (amount) {
    case 1:
      cartItem.count++;
      break;
    case -1:
      cartItem.count--;
      if (cartItem.count === 0) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }
      break;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, {count}) => sum + count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, {count, product: {price}}) => sum + (count * price), 0);
  }

  getProductPrice(price, count, currency = '€', digits = 2) {
    return `${currency}${(price * count).toFixed(digits)}`;
  }

  #renderCartItems() {
    const cartItemsHolder = document.createElement('div');

    this.cartItems.forEach(({product, count}) => {
      cartItemsHolder.append(this.renderProduct(product, count));
    });

    cartItemsHolder.append(this.renderOrderForm());

    return cartItemsHolder;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this._modal = new Modal();
    this._modal.setTitle(this._modalSettings.title);
    this._modal.setBody(this.#renderCartItems());
    this._modal.open();

    this._modalSettings.modalHolderElement = document.querySelector(`.${this._modalSettings.modalHolderClass}`);
    this._formSettings.formHolderElement = document.querySelector(`.${this._formSettings.formHolderClass}`);

    this._modalSettings.modalHolderElement.addEventListener('click', this.handleAmountOfProduct);
    this._formSettings.formHolderElement.addEventListener('submit', this.onSubmit);
  }

  onProductUpdate(cartItem) {
    if (document.body.classList.contains(this._modalSettings.modalActiveClass)) {
      const {product: {id, price}, count} = cartItem;
      let productHolder = this._modalSettings.modalHolderElement.querySelector(`[data-product-id="${id}"]`);

      if (!this.getTotalCount()) {
        this._modal.close();
      }

      if (!count) {
        productHolder.remove();
      }

      let productCount = productHolder.querySelector(`.cart-counter__count`);
      let productPrice = productHolder.querySelector(`.cart-product__price`);
      let totalPrice = this._modalSettings.modalHolderElement.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = count;
      productPrice.innerHTML = this.getProductPrice(price, count);
      totalPrice.innerHTML = convertPrice(this.getTotalPrice(), '€');
    }

    this.cartIcon.update(this);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const {currentTarget} = event;

    const button = currentTarget.querySelector('[type="submit"]');
    button.classList.add(this._formSettings.loadingClass);

    try {
      const response = await fetch(this._formSettings.formFetchAddress, {
        method: 'POST',
        body: new FormData(this._formSettings.formHolderElement)
      });

      if (response.ok) {
        this._modal.setTitle(this._modalSettings.successTitle);
        this.cartItems.splice(0);
        this._modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `));
      }
    } catch (err) {
      console.error(err);
    }
  }

  handleAmountOfProduct = (e) => {
    const {target} = e;

    if (target.classList.contains(this._cartControls.addControl)) {
      const productId = target.closest('.cart-product').dataset.productId;

      this.updateProductCount(productId, 1);
    }

    if (target.classList.contains(this._cartControls.reduceControl)) {
      const productId = target.closest('.cart-product').dataset.productId;

      this.updateProductCount(productId, -1);
    }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

