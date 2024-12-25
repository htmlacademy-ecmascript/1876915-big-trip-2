import AbstractView from './abstract-view';

const createEventListMessageTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class EventListMessageView extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEventListMessageTemplate(this.#message);
  }
}
