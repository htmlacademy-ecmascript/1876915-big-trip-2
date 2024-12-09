import { render } from '../render';
import FormViewCreate from '../view/form-view-create';
import RouteListView from '../view/route-list-view';
import RoutePointView from '../view/route-point-view';

export default class RouteListPresenter {
  #routeListContainer = null;
  #routeList = new RouteListView();

  constructor(deskContainer) {
    this.#routeListContainer = deskContainer;
  }

  init() {
    render(this.#routeListContainer, this.#routeList);
    render(this.#routeList, new FormViewCreate());
    render(this.#routeList, new RoutePointView());
    render(this.#routeList, new RoutePointView());
    render(this.#routeList, new RoutePointView());
  }
}
