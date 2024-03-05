import handleError from "../../assets/lib/error-handler.js";

import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  _fetchProductsUrl = 'products.json';
  _customEvents = {
    product: 'product-add',
    slider: 'slider-change',
    ribbon: 'ribbon-select'
  };
  _elements = {
    carouselHolder: '[data-carousel-holder]',
    ribbonHolder: '[data-ribbon-holder]',
    sliderHolder: '[data-slider-holder]',
    productsHolder: '[data-products-grid-holder]',
    cartIconHolder: '[data-cart-icon-holder]',
    nutsCheckbox: 'nuts-checkbox',
    vegetarianCheckbox: 'vegeterian-checkbox',
  }

  constructor() {
  }

  async render() {
    this.products = await this.fetchProducts();

    if (this.products) {
      this.carousel = new Carousel(slides);
      this.ribbonMenu = new RibbonMenu(categories);
      this.stepSlider = new StepSlider({ steps: 5, value: 3 });
      this.productsGrid = new ProductsGrid(this.products);
      this.cartIcon = new CartIcon();
      this.cart = new Cart(this.cartIcon);

      this.appendElements();
      this.filterElements();
      this.addEventListeners();
    }
  }

  async fetchProducts() {
    try {
      const response = await fetch(this._fetchProductsUrl);

      if (response.ok) {
        return await response.json();
      } else {
        handleError(response);
      }
    } catch (err) {
      console.error(`Произошла ошибка: ${err}`);
    }
  }

  appendElements() {
    document.querySelector(this._elements.carouselHolder).append(this.carousel.elem);
    document.querySelector(this._elements.ribbonHolder).append(this.ribbonMenu.elem);
    document.querySelector(this._elements.sliderHolder).append(this.stepSlider.elem);
    document.querySelector(this._elements.productsHolder).append(this.productsGrid.elem);
    document.querySelector(this._elements.cartIconHolder).append(this.cartIcon.elem);
  }

  filterElements() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById(this._elements.nutsCheckbox).checked,
      vegeterianOnly: document.getElementById(this._elements.vegetarianCheckbox).checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.categoryId
    });
  }

  addEventListeners() {
    document.body.addEventListener(this._customEvents.product, ({ detail }) => {
      const product = this.products.find(({id}) => id === detail);

      this.cart.addProduct(product);
    });

    document.body.addEventListener(this._customEvents.slider, ({ detail }) => {
      this.productsGrid.updateFilter({ maxSpiciness: detail });
    });

    document.body.addEventListener(this._customEvents.ribbon, ({ detail }) => {
      this.productsGrid.updateFilter({ category: detail });
    });

    document.getElementById(this._elements.nutsCheckbox).addEventListener("change", ({ target }) => {
      this.productsGrid.updateFilter({ noNuts: target.checked });
    });

    document.getElementById(this._elements.vegetarianCheckbox).addEventListener("change", ({ target }) => {
      this.productsGrid.updateFilter({ vegeterianOnly: target.checked });
    });
  }
}
