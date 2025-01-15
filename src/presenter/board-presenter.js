import { sortEvents } from '../utils/sort';
import { ElementSelectors as E, EventListMessage, EventMode, KeyCode, SortType } from '../const';
import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import NoEventsView from '../view/no-events-view';
import NewEventButtonView from '../view/new-event-button-view';
import { filterEvents } from '../utils/filter';
import EventPresenter from './event-presenter';
import { render } from '../framework/render';
import { updateItem } from '../utils/common';

export default class BoardPresenter {
  #boardContainer = null;
  #newEventButtonContainer = null;

  #eventListComponent = new EventListView();
  #newEventButtonComponent = new NewEventButtonView();

  /** @type {TripEvent[]} */
  #events = [];
  #destinations = null;
  #offers = null;

  /** @type {TripModel} */
  #tripModel = null;

  #activeSortType = SortType.PRICE;
  #eventPresenters = new Map();
  #activeEventId = '';

  constructor(boardContainer, newEventButtonContainer, tripModel) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#newEventButtonContainer = newEventButtonContainer;
  }

  init() {
    this.#events = filterEvents([...this.#tripModel.events], this.#tripModel.filterType);
    this.#destinations = this.#tripModel.destinations;
    this.#offers = this.#tripModel.offers;

    this.#renderBoard();
  }

  #renderBoard = () => {

    render(this.#newEventButtonContainer, this.#newEventButtonComponent);

    if (this.#events.length === 0) {
      render(this.#boardContainer, new NoEventsView(EventListMessage[this.#tripModel.filterType]));
      return;
    }

    this.#renderSort();
    this.#renderEventList();
    this.#renderEvents();
  };

  #renderEventList = () => {
    render(this.#boardContainer, this.#eventListComponent);
    this.#eventListComponent.setEventToggleHandler(this.#eventToggleHandler);
    this.#eventListComponent.setEscKeyDownHandler(this.#escKeyHandler);
  };

  #renderSort = () => {
    const sortComponent = new SortView(this.#tripModel.sortItems, this.#activeSortType);
    sortComponent.setOnSortClickHandler(this.#sortChangeHandler);

    render(this.#boardContainer, sortComponent);
  };

  #renderEvents = () => sortEvents(this.#events, this.#activeSortType)
    .forEach((event) => {
      const presenter = new EventPresenter(this.#eventListComponent.element);
      presenter.init(event, this.#offers, this.#destinations);
      presenter.setOnFormSubmitHandler(this.#formSubmitHandler);
      presenter.setOnDataChangeHandler(this.#eventChangeHandler);

      this.#eventPresenters.set(event.id, presenter);
    });

  #clearEventList = () => {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  };

  #sortChangeHandler = (sortType) => {
    if ((sortType === this.#activeSortType) || !(Object.values(SortType).includes(sortType))) {
      return;
    }

    this.#activeSortType = sortType;
    this.#clearEventList();
    this.#renderEvents();
  };

  #eventChangeHandler = (updatedEvent) => {
    this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
  };

  #toggleEventMode = (newEventId = '') => {
    const eventId = this.#activeEventId;
    if (this.#activeEventId) {
      this.#eventPresenters.get(eventId).toggleEventView(EventMode.DEFAULT);
      this.#activeEventId = '';
    }

    if (newEventId && (eventId !== newEventId)) {
      this.#eventPresenters.get(newEventId).toggleEventView(EventMode.EDIT);
      this.#activeEventId = newEventId;
    }
  };

  #escKeyHandler = (evt) => {
    if ((evt.key === KeyCode.ESC) && (this.#activeEventId)) {
      this.#toggleEventMode();
    }
  };

  #formSubmitHandler = (updatedEvent) => {
    this.#eventChangeHandler(updatedEvent);
    this.#toggleEventMode(updatedEvent.id);
  };

  #eventToggleHandler = ({ target }) => {
    if (target.matches(E.ROLL_UP_BUTTON)) {
      const eventItem = target.closest(E.EVENT_ITEM);
      const eventId = eventItem?.dataset.eventId;
      this.#toggleEventMode(eventId);
    }
  };
}
