import { render, RenderPosition } from '../render';
import FilterView from '../view/filter-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;
  #filter = new FilterView();
  #tripInfo = null;

  #tripModel = null;

  constructor(headerContainer, filtersContainer, tripModel) {
    this.#headerContainer = headerContainer;
    this.#filterContainer = filtersContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#tripInfo = new TripInfoView(this.#tripModel.tripInfo);
    render(this.#headerContainer, this.#tripInfo, RenderPosition.AFTERBEGIN);
    render(this.#filterContainer, this.#filter);
  }
}
