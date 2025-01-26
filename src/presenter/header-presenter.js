import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import { SortType, UpdateType } from '../const';
import { sortEvents } from '../utils/sort';
import { remove, render, RenderPosition, replace } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;
  #tripInfoComponent = null;
  #filtersComponent = null;

  /** @type {TripModel} */
  #tripModel = null;

  constructor(headerContainer, filtersContainer, tripModel) {
    this.#headerContainer = headerContainer;
    this.#filterContainer = filtersContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#onModelChangeHandler);
  }

  get #events() {
    return sortEvents(this.#tripModel.events, SortType.DAY);
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
  }

  #renderTripInfo = () => {

    if (this.#tripModel.eventsSize > 0) {
      const prevComponent = this.#tripInfoComponent;
      this.#tripInfoComponent = new TripInfoView(this.#events, this.#tripModel.offers, this.#tripModel.destinations);

      if (!prevComponent) {
        render(this.#headerContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
      } else {
        replace(prevComponent, this.#tripInfoComponent);
        remove(prevComponent);
      }

      return;
    }

    if (this.#tripInfoComponent) {
      remove(this.#tripInfoComponent);
      this.#tripInfoComponent = null;
    }
  };

  #renderFilters = () => {
    const prevComponent = this.#filtersComponent;
    this.#filtersComponent = new FilterView(this.#tripModel.filters, this.#tripModel.filterType).setOnFilterChangeHandler(this.#onFilterChangeHandler);

    if (!prevComponent) {
      render(this.#filterContainer, this.#filtersComponent);
      return;
    }

    replace(prevComponent, this.#filtersComponent);
    remove(prevComponent);
  };

  #onModelChangeHandler = (updateType) => {
    if (updateType !== UpdateType.PATCH) {
      this.init();
    }
  };

  #onFilterChangeHandler = (filterType) => {
    this.#tripModel.updateFilterType(UpdateType.MAJOR, filterType);
  };
}
