import { render, RenderPosition } from '../render';
import FilterView from '../view/filter-view';
import NewEventButtonView from '../view/new-event-button-view';
import TripInfoView from '../view/trip-info-view';

export default class HeaderPresenter {
  #headerContainer = null;
  #filterContainer = null;
  #filter = new FilterView();
  #tripInfo = new TripInfoView();
  #newEventButton = new NewEventButtonView();

  #tripModel = null;

  constructor(headerContainer, filtersContainer, tripModel) {
    this.#headerContainer = headerContainer;
    this.#filterContainer = filtersContainer;
    this.#tripModel = tripModel;
  }

  init() {
    render(this.#headerContainer, this.#tripInfo, RenderPosition.AFTERBEGIN);
    render(this.#filterContainer, this.#filter);
    render(this.#headerContainer, this.#newEventButton);
  }
}
