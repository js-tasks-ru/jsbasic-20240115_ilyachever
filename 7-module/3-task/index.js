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
    activeStep: 'slider__step-active'
  };

  constructor({steps, value = 2}) {
    this._steps = steps || 0;
    this._initialValue = value;

    this.elem = this.#renderStepSlider();
  }

  #calculateInitialOffset() {
    return this._initialValue * (100 / (this._steps - 1));
  }

  #calculateOffset(e) {
    let left = e.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this._steps - 1;
    let approximateValue = leftRelative * segments;

    this._currentStep = Math.round(approximateValue);
    this._currentOffset = this._currentStep / segments * 100;
  }

  #updateThumb() {
    this.elem.querySelector(`.${this._sliderElements.sliderThumb}`).style.left = `${this._currentOffset}%`;
    this.elem.querySelector(`.${this._sliderElements.sliderThumbValue}`).textContent = this._currentStep;
  }

  #updateProgress() {
    this.elem.querySelector(`.${this._sliderElements.sliderProgress}`).style.width = `${this._currentOffset}%`;
  }

  #highlightActiveStep() {
    const allSteps = this.elem.querySelectorAll(`.${this._sliderElements.sliderSteps} > ${this._sliderElements.step}`);
    const activeStep = allSteps[this._currentStep];

    allSteps.forEach(step => step.classList.remove(this._sliderElements.activeStep));
    activeStep.classList.add(this._sliderElements.activeStep);
  }

  #handleChangeStep = (e) => {
    this.#calculateOffset(e);
    this.#updateThumb();
    this.#updateProgress();
    this.#highlightActiveStep();
    dispatchEvent(this.elem, 'slider-change', this._currentStep);
  };

  #renderSteps() {
    return `
      <div class="slider__steps">
      ${new Array(this._steps).fill(0).map((_, index) => {
      return index === this._initialValue ? `<span class="${this._sliderElements.activeStep}"></span>` : '<span></span>';
    }).join('')}
      </div>
    `;
  }

  #renderStepSlider() {
    const stepSlider = createElement(`
      <div class="slider">
      <div class="slider__thumb" style="left: ${this.#calculateInitialOffset()}%;">
        <span class="slider__value">${this._initialValue}</span>
      </div>
      <div class="slider__progress" style="width: ${this.#calculateInitialOffset()}%;"></div>
      ${this.#renderSteps()}
    `);

    stepSlider.addEventListener('click', this.#handleChangeStep);

    return stepSlider;
  }
}
