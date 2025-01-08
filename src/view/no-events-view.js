import AbstractView from '../framework/view/abstract-view';

const createNoEventTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class NoEventsView extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createNoEventTemplate(this.#message);
  }
}
