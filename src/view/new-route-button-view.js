import AbstractView from './abstract-view';

const getComponentTemplate = () => (`
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" disabled>New event</button>
 `);

export default class NewRouteButtonView extends AbstractView {
  get template() {
    return getComponentTemplate();
  }
}
