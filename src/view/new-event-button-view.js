import { ButtonText } from '../const';
import AbstractView from './abstract-view';

const createButtonTemplate = (isDisabled) => (`
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" ${isDisabled ? 'disabled' : ''}>
    ${ButtonText.CREATE}
  </button>
 `);

export default class NewEventButtonView extends AbstractView {
  #isDisabled;

  constructor(isDisabled = false) {
    super();
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createButtonTemplate(this.#isDisabled);
  }

  disable() {
    this.element.disabled = true;
  }

  enable() {
    this.element.disabled = false;
  }
}
