import createElement from '../../assets/lib/create-element.js';
import dispatchEvent from "../../assets/lib/dispatch-event.js";

export default class StepSlider {
  elem = null;
  _sliderElements = {
    sliderSteps: 'slider__steps',
    sliderThumb: 'slider__thumb',
    sliderThumbValue: 'slider__value',
    sliderProgress: 'slider__progress',
    step: 'SPAN',
    activeStep: 'slider__step-active',
    activeDnD: 'slider_dragging'
  };

  constructor({steps, value = 2}) {
    this._steps = steps || 0;
    this.value = value;

    this.elem = this.#renderStepSlider();
    this.#handleDnD();
  }

  #calculateInitialOffset() {
    return this.value * (100 / (this._steps - 1));
  }

  #calculateOffsetForClick(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this._steps - 1;
    let approximateValue = leftRelative * segments;

    this._currentStep = Math.round(approximateValue);
    this._currentOffset = this._currentStep / segments * 100;
  }

  #calculateOffsetForDnD(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    this._currentOffset = leftRelative * 100;
    let segments = this._steps - 1;
    this._currentStep = Math.round(leftRelative * segments);
  }

  #updateThumb() {
    this.elem.querySelector(`.${this._sliderElements.sliderThumb}`).style.left = `${this._currentOffset}%`;
    this.elem.querySelector(`.${this._sliderElements.sliderThumbValue}`).textContent = this._currentStep;
  }

  #updateProgress() {
    this.elem.querySelector(`.${this._sliderElements.sliderProgress}`).style.width = `${this._currentOffset}%`;
  }

  #handleChangeStep = (e) => {
    this.#calculateOffsetForClick(e);
    this.#updateThumb();
    this.#updateProgress();
    this.#highlightActiveStep();
    dispatchEvent(this.elem, 'slider-change', this._currentStep);
  }

  #highlightActiveStep() {
    const allSteps = this.elem.querySelectorAll(`.${this._sliderElements.sliderSteps} > ${this._sliderElements.step}`);
    const activeStep = allSteps[this._currentStep];

    allSteps.forEach(step => step.classList.remove(this._sliderElements.activeStep));
    activeStep.classList.add(this._sliderElements.activeStep);
  }

  #renderSteps() {
    return `
      <div class="slider__steps">
      ${new Array(this._steps).fill(0).map((_, index) => {
      return index === this.value ? `<span class="${this._sliderElements.activeStep}"></span>` : '<span></span>';
    }).join('')}
      </div>
    `;
  }

  #handleDnD() {
    const thumb = this.elem.querySelector(`.${this._sliderElements.sliderThumb}`);
    thumb.addEventListener('pointerdown', this.#onDown);
  }

  #onDown = (e) => {
    e.preventDefault();

    document.addEventListener('pointermove', this.#onMove);
    document.addEventListener('pointerup', this.#onUp, {once: true});
  };

  #onMove = (e) => {
    e.preventDefault();
    this.elem.classList.add(this._sliderElements.activeDnD);
    this.#calculateOffsetForDnD(e);
    this.#updateThumb();
    this.#updateProgress();
    this.#highlightActiveStep();
  };

  #onUp = () => {
    this.elem.classList.remove(this._sliderElements.activeDnD);
    document.removeEventListener('pointermove', this.#onMove);
    dispatchEvent(this.elem, 'slider-change', this._currentStep);
  };

  #renderStepSlider() {
    const stepSlider = createElement(`
      <div class="slider">
      <div class="slider__thumb" style="left: ${this.#calculateInitialOffset()}%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.#calculateInitialOffset()}%;"></div>
      ${this.#renderSteps()}
    `);

    stepSlider.addEventListener('click', this.#handleChangeStep);

    return stepSlider;
  }
}
