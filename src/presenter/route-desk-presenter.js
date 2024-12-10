import { render } from '../render';
import RouteCreateView from '../view/route-create-view';
import RouteListView from '../view/route-list-view';
import RoutePointView from '../view/route-point-view';
import SortView from '../view/sort-view';

export default class RouteDeskPresenter {
  #routeDesk = null;
  #routeList = new RouteListView();
  #routeSort = new SortView();

  constructor(deskContainer) {
    this.#routeDesk = deskContainer;
  }

  init() {
    render(this.#routeDesk, this.#routeSort);
    render(this.#routeDesk, this.#routeList);
    render(this.#routeList, new RouteCreateView());
    render(this.#routeList, new RoutePointView());
    render(this.#routeList, new RoutePointView());
    render(this.#routeList, new RoutePointView());
  }
}
