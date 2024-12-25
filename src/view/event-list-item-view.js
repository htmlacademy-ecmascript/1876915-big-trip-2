import AbstractView from './abstract-view';

const createEventListItemTemplate = () => ('<li class="trip-events__item"></li>');

export default class EventListItemView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createEventListItemTemplate();
  }
}
