import { sortEvents } from '../utils/sort';
import { ElementSelectors as E, EventListMessage, EventMode, KeyCode, SortType, UpdateType, UserAction } from '../const';
import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import NoEventsView from '../view/no-events-view';
import NewEventButtonView from '../view/new-event-button-view';
import { filterEvents } from '../utils/filter';
import EventPresenter from './event-presenter';
import { render } from '../framework/render';

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
    this.#newEventButtonContainer = newEventButtonContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#offers = this.#tripModel.offers;
    this.#events = filterEvents(this.#tripModel.events, this.#tripModel.filterType);
    this.#destinations = this.#tripModel.destinations;

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
      presenter.setOnFormSubmitHandler(this.#viewActionHandler);
      presenter.setOnDataChangeHandler(this.#viewActionHandler);

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

  #viewActionHandler = (actionType, updateType, updatedEvent) => {
    console.log(actionType, updateType, updatedEvent);

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#tripModel.updateEvent(updateType, updatedEvent);
        break;
      case UserAction.CREATE_EVENT:
        this.#tripModel.createEvent(updateType, updatedEvent);
        break;
      case UserAction.DELETE_EVENT:
        this.#tripModel.deleteEvent(updateType, updatedEvent);
        break;
    }
  };

  #modelEventHandler = (updateType, updatedEvent) => {
    console.log(updateType, updatedEvent);

    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
        this.#toggleEventMode(updatedEvent.id);
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;

      default:
        return;
    }

    this.#events = filterEvents(this.#tripModel.events, this.#tripModel.filterType);
  };

  #eventChangeHandler = (updatedEvent) => {
    //!!! update model
    // this.#events = updateItem(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent, this.#offers, this.#destinations);
  };

  #formSubmitHandler = (updatedEvent) => {
    this.#viewActionHandler(updatedEvent);
    this.#toggleEventMode(updatedEvent.id);
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

  #eventToggleHandler = ({ target }) => {
    if (target.matches(E.ROLL_UP_BUTTON)) {
      const eventItem = target.closest(E.EVENT_ITEM);
      const eventId = eventItem?.dataset.eventId;
      this.#toggleEventMode(eventId);
    }
  };
}
