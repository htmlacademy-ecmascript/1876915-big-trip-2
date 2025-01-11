import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import { SortType } from '../const';
import { sortEvents } from '../utils/sort';
import { render, RenderPosition } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;
  #tripInfo = null;

  #filters = [];

  /** @type {TripEvent[]} */
  #events = [];

  /** @type {TripModel} */
  #tripModel = null;

  constructor(headerContainer, filtersContainer, tripModel) {
    this.#headerContainer = headerContainer;
    this.#filterContainer = filtersContainer;
    this.#tripModel = tripModel;
  }

  init() {

    this.#events = sortEvents(this.#tripModel.events, SortType.DAY);

    if (this.#events.length !== 0) {
      this.#tripInfo = new TripInfoView(this.#events);
      render(this.#headerContainer, this.#tripInfo, RenderPosition.AFTERBEGIN);
    }
    this.#filters = new FilterView(this.#tripModel.filters, this.#tripModel.filterType);
    render(this.#filterContainer, this.#filters);
  }
}
