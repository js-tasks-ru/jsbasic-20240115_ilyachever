import createElement from '../../assets/lib/create-element.js';
import { hideElement, showElement } from '../../assets/lib/toggle-element-visibility.js';
import convertPrice from '../../assets/lib/convert-price.js';

export default class Carousel {
  elem = null;
  _currentPosition = 1;
  _currentSlideId = '';
  _currentOffset = 0;
  _currentDirection = '';
  _currencyVariants = {
    euro: "€"
  };
  _carouselImagePath = '../../assets/images/carousel';
  _directionVariants = {
    prevSlide: 'backward',
    nextSlide: 'forward'
  }
  _carouselControls = {
    prevSlide: 'carousel__arrow_left',
    nextSlide: 'carousel__arrow_right',
    addButton: 'carousel__button'
  }

  constructor(slides) {
    this._slides = slides || [];

    this.elem = this.#renderSlider();
    this.#updateControls();
    this.#updateCurrentSlideId();
  }

  #updateControls() {
    const positionVariants = {
      min: 1,
      max: this._slides.length
    };
    const prevControl = this.elem.querySelector('.carousel__arrow_left');
    const nextControl = this.elem.querySelector('.carousel__arrow_right');

    switch (this._currentPosition) {
    case positionVariants.min:
      hideElement(prevControl);
      break;
    case positionVariants.max:
      hideElement(nextControl);
      break;
    default:
      showElement(prevControl);
      showElement(nextControl);
    }
  }

  #updateCurrentSlideId() {
    this._currentSlideId = this._slides[this._currentPosition - 1].id;
  }

  #getCurrentSlideWidth() {
    const currentSlide = this.elem.querySelector(`[data-id=${this._currentSlideId}]`);

    return currentSlide.offsetWidth;
  }

  #getCurrentSlideOffset(slideWidth) {
    switch (this._currentDirection) {
    case this._directionVariants.nextSlide:
      this._currentOffset -= slideWidth;
      return this._currentOffset;
    case this._directionVariants.prevSlide:
      this._currentOffset += slideWidth;
      return this._currentOffset;
    }
  }

  #toggleSlider() {
    const carouselFeed = this.elem.querySelector('.carousel__inner');
    const currentSlideWidth = this.#getCurrentSlideWidth();
    const currentSlideOffset = this.#getCurrentSlideOffset(currentSlideWidth);

    carouselFeed.style.transform = `translateX(${currentSlideOffset}px)`;
  }

  #handleEvents = (evt) => {
    const {target} = evt;

    if (target.classList.contains(this._carouselControls.nextSlide)) {
      this._currentDirection = this._directionVariants.nextSlide;
      this._currentPosition++;
      this.#updateCurrentSlideId();
      this.#toggleSlider();
      this.#updateControls();
    }

    if (target.classList.contains(this._carouselControls.prevSlide)) {
      this._currentDirection = this._directionVariants.prevSlide;
      this._currentPosition--;
      this.#updateCurrentSlideId();
      this.#toggleSlider();
      this.#updateControls();
    }

    if (target.classList.contains(this._carouselControls.addButton)) {
      const event = new CustomEvent('product-add', {
        detail: this._currentSlideId,
        bubbles: true
      });

      target.dispatchEvent(event);
    }
  }

  #renderSlider() {
    const sliderTemplate = `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      ${this._slides.map(({name, price, image, id}) => {
        return `
        <div class="carousel__slide" data-id="${id}">
          <img src="${this._carouselImagePath}/${image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">${convertPrice(price, this._currencyVariants.euro)}</span>
            <div class="carousel__title">${name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `
      }).join('')}
      </div>
    </div>
    `;
    const slider = createElement(sliderTemplate);

    slider.addEventListener('click', this.#handleEvents);

    return slider;
  }
}
