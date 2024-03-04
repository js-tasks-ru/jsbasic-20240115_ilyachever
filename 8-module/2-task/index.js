import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  _filteredProducts = [];

  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = this.#initialRenderProducts();
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    this.#filterProducts();
    this.#updateProducts();
  }

  #filterProducts() {
    const {
      noNuts,
      vegeterianOnly,
      maxSpiciness,
      category: filterCategory
    } = this.filters;
    const filterByNuts = ({nuts}, noNuts) => !noNuts || noNuts !== nuts;
    const filterByVegeterian = ({vegeterian}, vegeterianOnly) => !vegeterianOnly || vegeterian === vegeterianOnly;
    const filterBySpiciness = ({spiciness}, maxSpiciness) => !maxSpiciness || spiciness <= maxSpiciness;
    const filterByCategory = ({category}, filterCategory) => !filterCategory || filterCategory === '' || category === filterCategory;

    this._filteredProducts = this.products.filter(product => {
      return filterByNuts(product, noNuts) && filterByVegeterian(product, vegeterianOnly) && filterBySpiciness(product, maxSpiciness) && filterByCategory(product, filterCategory);
    });
  }

  #initialRenderProducts() {
    const rootElement = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>
    `);

    this.products.forEach(product => {
      rootElement.querySelector('.products-grid__inner').append(new ProductCard(product).elem);
    });

    return rootElement;
  }

  #updateProducts() {
    const productsHolder = this.elem.querySelector('.products-grid__inner');

    productsHolder.innerHTML = '';
    this._filteredProducts.forEach(filteredProduct => productsHolder.append(new ProductCard(filteredProduct).elem));
    console.log(this._filteredProducts.length);
  }
}
