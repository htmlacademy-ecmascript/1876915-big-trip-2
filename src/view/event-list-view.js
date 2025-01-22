import AbstractView from '../framework/view/abstract-view';

const createEventListTemplate = () => (`
  <ul class="trip-events__list">
  </ul>`
);

export default class EventListView extends AbstractView {

  get template() {
    return createEventListTemplate();
  }

  setEventToggleHandler = (callback) => {
    this.createEventListener(this.element, 'click', callback);
    return this;
  };

  setEscKeyDownHandler = (callback) => {
    this.createEventListener(document.body, 'keydown', callback);
    return this;
  };
}
