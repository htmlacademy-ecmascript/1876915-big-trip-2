import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';
import { SortType, UpdateType } from '../const';
import { sortEvents } from '../utils/sort';
import { remove, render, RenderPosition, replace } from '../framework/render';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;
  #tripInfo = null;
  #filters = null;

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

    if (this.#tripInfo && (this.#tripModel.eventsSize === 0)) {
      remove(this.#tripInfo);
      this.#tripInfo = null;
      return;
    }

    if (this.#tripModel.eventsSize !== 0) {
      const prevComponent = this.#tripInfo;
      this.#tripInfo = new TripInfoView(this.#events, this.#tripModel.destinations);

      if (!prevComponent) {
        render(this.#headerContainer, this.#tripInfo, RenderPosition.AFTERBEGIN);
      } else {
        replace(prevComponent, this.#tripInfo);
        remove(prevComponent);
      }
    }
  };

  #renderFilters = () => {
    const prevComponent = this.#filters;
    this.#filters = new FilterView(this.#tripModel.filters, this.#tripModel.filterType).setOnFilterChangeHandler(this.#onFilterChangeHandler);

    if (!prevComponent) {
      render(this.#filterContainer, this.#filters);
      return;
    }

    replace(prevComponent, this.#filters);
    remove(prevComponent);
  };

  #onModelChangeHandler = (updateType) => {
    if ((updateType === UpdateType.MINOR) || (updateType === UpdateType.MAJOR)) {
      this.init();
    }
  };

  #onFilterChangeHandler = (filterType) => {
    this.#tripModel.updateFilterType(UpdateType.FILTER, filterType);
  };
}
