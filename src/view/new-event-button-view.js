import AbstractView from '../framework/view/abstract-view';
import { ButtonText } from '../const';

const createButtonTemplate = () => (`
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>
    ${ButtonText.CREATE}
  </button>
 `);

export default class NewEventButtonView extends AbstractView {

  get template() {
    return createButtonTemplate();
  }

  disable() {
    this.element.disabled = true;
  }

  enable() {
    this.element.disabled = false;
  }

  setOnClickHandler = (callback) => {
    this.createEventListener(this.element, 'click', callback);
    return this;
  };
}
