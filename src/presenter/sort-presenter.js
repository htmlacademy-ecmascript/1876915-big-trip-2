import { render } from '../render';
import SortView from '../view/sort-view';

export default class SortPresenter {
  #sortContainer = null;
  #sortComponent = null;

  constructor(sortContainer) {
    this.#sortContainer = sortContainer;
  }

  init() {
    this.#sortComponent = new SortView();
    render(this.#sortContainer, this.#sortComponent);
  }
}
