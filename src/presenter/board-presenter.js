import { render } from '../render';
import FormView from '../view/form-view';
import EventListView from '../view/event-list-view';
import EventView from '../view/event-view';
import SortView from '../view/sort-view';
import { FormMode } from '../const';

export default class BoardPresenter {
  #board = null;
  #eventList = new EventListView();
  #eventSort = new SortView();

  #events = [];
  #destinations = [];
  #offerTypes = [];

  #tripModel = null;

  constructor(boardContainer, tripModel) {
    this.#board = boardContainer;
    this.#tripModel = tripModel;
  }

  init() {
    this.#events = [...this.#tripModel.events];
    this.#destinations = [...this.#tripModel.destinations];
    this.#offerTypes = [...this.#tripModel.offerTypes];

    render(this.#board, this.#eventSort);
    render(this.#board, this.#eventList);
    render(this.#eventList, new FormView(this.#tripModel.getDefaultEvent(), this.#destinations, this.#offerTypes, FormMode.CREATE));
    render(this.#eventList, new FormView(this.#events[0], this.#destinations, this.#offerTypes, FormMode.EDIT));
    for (let i = 1; i < this.#events.length; i++) {
      render(this.#eventList, new EventView(this.#events[i]));
    }
  }
}
