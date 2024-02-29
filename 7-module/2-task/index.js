import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  _modalClasses = {
    active: 'is-modal-open',
    title: 'modal__title',
    body: 'modal__body',
    close: 'modal__close'
  }

  constructor() {
    this.modal = this.#render() || null;
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add(this._modalClasses.active);
    this.#handleSetListeners();
  }

  close = () => {
    if (this.modal) {
      this.modal.remove();
      document.body.classList.remove(this._modalClasses.active);
      this.#handleRemoveListeners();
    }

    return;
  }

  setTitle(title) {
    this.modal.querySelector(`.${this._modalClasses.title}`).textContent = title;
  }

  setBody(node) {
    const body = this.modal.querySelector(`.${this._modalClasses.body}`);

    body.innerHtml = '';
    body.append(node);
  }

  #handleSetListeners = () => {
    this.modal.querySelector(`.${this._modalClasses.close}`).addEventListener('click', this.close);
    document.documentElement.addEventListener('keydown', this.#closeByEsc);
  }

  #handleRemoveListeners = () => {
    this.modal.querySelector(`.${this._modalClasses.close}`).removeEventListener('click', this.close);
    document.documentElement.removeEventListener('keydown', this.#closeByEsc);
  }

  #closeByEsc = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }

    return;
  }

  #render() {
    const modal = createElement(`
    <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
        </h3>
      </div>
      <div class="modal__body">
      </div>
    </div>
    </div>
    `);

    return modal;
  }
}
