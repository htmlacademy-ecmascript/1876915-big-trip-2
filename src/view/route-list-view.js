import AbstractView from './abstract-view';

const getComponentTemplate = () => (`
  <ul class="trip-events__list">
  </ul>`
);

export default class RouteListView extends AbstractView {
  get template() {
    return getComponentTemplate();
  }
}
