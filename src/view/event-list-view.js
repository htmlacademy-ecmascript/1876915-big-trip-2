import { render } from '../render';
import AbstractView from './abstract-view';

const createEventListTemplate = () => (`
  <ul class="trip-events__list">
  </ul>`
);

export default class EventListView extends AbstractView {
  #itemConstructor = null;

  constructor(itemConstructor) {
    super();
    this.#itemConstructor = itemConstructor;
  }

  get template() {
    return createEventListTemplate();
  }

  add = (item) => {
    const listItem = new this.#itemConstructor();
    render(this.element, listItem);
    render(listItem, item);
    item.setOnRemoveHandler(() => listItem.removeElement());
  };

  setEventToggleHandler = (callback) => {
    this.createEventListener(this.element, 'click', callback);
  };

  setEscKeyDownHandler = (callback) => {
    this.createEventListener(document.body, 'keydown', callback);
  };
}
