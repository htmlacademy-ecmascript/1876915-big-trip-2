import { render } from '../render';
import FiltersView from '../view/filters-view';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = null;

  constructor(filtersContainer) {
    this.#filtersContainer = filtersContainer;
  }

  init() {
    this.#filtersComponent = new FiltersView();
    render(this.#filtersContainer, this.#filtersComponent);
  }
}
