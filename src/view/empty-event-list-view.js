import AbstractView from './abstract-view';

const createEmptyEventListTemplate = (message) => (`<p class="trip-events__msg">${message}</p>`);

export default class EmptyEventListView extends AbstractView {
  #message = '';

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEmptyEventListTemplate(this.#message);
  }
}
