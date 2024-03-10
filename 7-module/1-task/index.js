import createElement from '../../assets/lib/create-element.js';
import dispatchEvent from "../../assets/lib/dispatch-event.js";

export default class RibbonMenu {
  elem = null;
  _offset = 350;
  _currentDirection = '';
  _directionVariants = {
    next: 'forward',
    prev: 'backward'
  };
  _controls = {
    next: 'ribbon__arrow_right',
    prev: 'ribbon__arrow_left',
    activeControl: 'ribbon__arrow_visible',
    activeCategory: 'ribbon__item_active'
  }

  constructor(categories) {
    this.categories = categories || [];

    this.elem = this.#renderMenu();
    this.#initialRenderControls();
    this.#handleUpdateControls();
  }

  #toggleMenu({currentTarget}) {
    const menuFeed = currentTarget.querySelector('.ribbon__inner');
    switch (this._currentDirection) {
    case this._directionVariants.next:
      menuFeed.scrollBy(this._offset, 0);
      break;
    case this._directionVariants.prev:
      menuFeed.scrollBy(-this._offset, 0);
      break;
    }
  }

  #handleDirection({target}) {
    if (target.className.includes(this._controls.next)) {
      this._currentDirection = this._directionVariants.next;
    }

    if (target.className.includes(this._controls.prev)) {
      this._currentDirection = this._directionVariants.prev;
    }
  }

  #handleUpdateControls() {
    const menuFeed = this.elem.querySelector('.ribbon__inner');
    const prevControl = this.elem.querySelector(`.${this._controls.prev}`);
    const nextControl = this.elem.querySelector(`.${this._controls.next}`);

    menuFeed.addEventListener('scroll', () => {
      if (menuFeed.scrollLeft === 0) {
        prevControl.classList.remove(this._controls.activeControl);
      } else {
        prevControl.classList.add(this._controls.activeControl);
      }

      if ((menuFeed.scrollWidth - menuFeed.scrollLeft - menuFeed.clientWidth) < 1) {
        nextControl.classList.remove(this._controls.activeControl);
      } else {
        nextControl.classList.add(this._controls.activeControl);
      }
    });
  }

  #initialRenderControls() {
    const menuFeed = this.elem.querySelector('.ribbon__inner');
    const prevControl = this.elem.querySelector(`.${this._controls.prev}`);

    if (menuFeed.scrollLeft === 0) {
      prevControl.classList.remove(this._controls.activeControl);
    } else {
      prevControl.classList.add(this._controls.activeControl);
    }
  }

  #handleChooseCategory({target}) {
    const currentChosenCategory = this.elem.querySelector(`.${this._controls.activeCategory}`);

    if (currentChosenCategory) {
      currentChosenCategory.classList.remove(this._controls.activeCategory);
    }

    target.classList.add(this._controls.activeCategory);
    this.categoryId = target.dataset.id ? target.dataset.id : '';
    dispatchEvent(this.elem, 'ribbon-select', this.categoryId);
  }

  #renderMenu() {
    const menuTemplate = `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories
          .map(({id, name}) => `<a class="ribbon__item" data-id="${id}">${name}</a>`
        ).join('')}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
  `;

  const menu = createElement(menuTemplate);
  menu.addEventListener('click', (evt) => {
    this.#handleDirection(evt);
    this.#toggleMenu(evt);
    this.#handleChooseCategory(evt);
  });

  return menu;
  }
}
