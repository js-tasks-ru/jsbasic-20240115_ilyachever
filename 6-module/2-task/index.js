import convertPrice from '../../assets/lib/convert-price.js';
import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  _name = '';
  _price = 0;
  _category = '';
  _image = '';
  _id = '';
  _currencyVariants = {
    euro: "€"
  };
  _productsImagePath = '../../assets/images/products';

  constructor(product) {
    ({
      name: this._name,
      price: this._price,
      category: this._category,
      image: this._image,
      id: this._id
    } = product);

    this.elem = this.#createCard();
  }

  #handleAddEvent = ({target}) => {
    if (target.classList.contains('card__button')) {
      const event = new CustomEvent('product-add', {
        detail: this._id,
        bubbles: true
      });

      target.dispatchEvent(event);
    }
  }

  #createCard() {
    const cardTemplate = `
      <div class="card">
        <div class="card__top">
            <img src="${this._productsImagePath}/${this._image}" class="card__image" alt="product">
            <span class="card__price">${convertPrice(this._price, this._currencyVariants.euro)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this._name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
      </div>
    `;

    const card = createElement(cardTemplate);
    card.addEventListener('click', this.#handleAddEvent);

    return card;
  }
}
