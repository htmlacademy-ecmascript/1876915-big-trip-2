import { sortEvents } from '../utils/sort';
import { ElementSelectors as E, EventListMessage, EventMode, FilterType, FormMode, KeyCode, SortType, UiBlockerTimeLimit, UpdateType, UserAction } from '../const';
import SortView from '../view/sort-view';
import EventListView from '../view/event-list-view';
import NoEventsView from '../view/no-events-view';
import NewEventButtonView from '../view/new-event-button-view';
import { filterEvents } from '../utils/filter';
import EventPresenter from './event-presenter';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

export default class BoardPresenter {
  #boardContainer = null;
  #newEventButtonContainer = null;

  #eventListComponent = null;
  #newEventButtonComponent = new NewEventButtonView();
  #sortComponent = null;
  #noEventsComponent = null;

  /** @type {TripEvent[]} */
  #events = [];

  /** @type {TripModel} */
  #tripModel = null;

  #activeSortType = SortType.PRICE;
  #eventPresenters = new Map();
  #activeEventId = '';
  #newEventPresenter = null;

  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: UiBlockerTimeLimit.LOWER_LIMIT,
    upperLimit: UiBlockerTimeLimit.UPPER_LIMIT
  });

  constructor(boardContainer, newEventButtonContainer, tripModel) {
    this.#boardContainer = boardContainer;
    this.#newEventButtonContainer = newEventButtonContainer;
    this.#tripModel = tripModel;
    this.#tripModel.addObserver(this.#onModelChangeHandler);
  }

  get #offers() {
    return this.#tripModel.offers;
  }

  get #destinations() {
    return this.#tripModel.destinations;
  }

  get #sortedEvents() {
    return sortEvents(this.#events, this.#activeSortType);
  }

  init() {
    this.#newEventButtonComponent.setOnClickHandler(this.#newEventHandler);
    render(this.#newEventButtonContainer, this.#newEventButtonComponent);

    this.#renderBoard();
  }

  #renderBoard = () => {

    const message = this.#getNoEventMessage();
    if (message) {
      this.#renderNoEvents(message);
      return;
    }

    this.#newEventButtonComponent.enable();
    this.#renderSort();
    this.#renderEventList();
    this.#renderEvents();
  };

  #renderNoEvents = (message) => {
    this.#noEventsComponent = new NoEventsView(message);
    render(this.#boardContainer, this.#noEventsComponent);
  };

  #getNoEventMessage() {
    if (this.#isLoading) {
      this.#isLoading = '';
      return EventListMessage.LOADING;
    }

    if (this.#tripModel.error) {
      return this.#tripModel.error;
    }

    return (this.#events.length === 0) ? EventListMessage[this.#tripModel.filterType] : '';
  }

  #renderEventList = () => {
    remove(this.#noEventsComponent);
    this.#eventListComponent = new EventListView()
      .setEventToggleHandler(this.#eventToggleHandler)
      .setEscKeyDownHandler(this.#escKeyHandler);
    render(this.#boardContainer, this.#eventListComponent);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#tripModel.sortItems, this.#activeSortType).setOnSortClickHandler(this.#sortChangeHandler);
    render(this.#boardContainer, this.#sortComponent);
  };

  #sortChangeHandler = (sortType) => {
    if ((sortType === this.#activeSortType) || !(Object.values(SortType).includes(sortType))) {
      return;
    }

    this.#activeSortType = sortType;
    this.#updateEventList();
  };

  #createEventPresenter = (event, mode = FormMode.EDIT) => new EventPresenter(this.#eventListComponent.element, () => this.#events.length)
    .init(event, this.#offers, this.#destinations, mode)
    .setViewActionHandler(this.#viewActionHandler);

  #renderEvents = () => this.#sortedEvents.forEach((event) => {
    const presenter = this.#createEventPresenter(event);
    this.#eventPresenters.set(event.id, presenter);
  });

  #newEventHandler = () => {
    this.#toggleEventMode();
    this.#activeSortType = SortType.DAY;
    this.#tripModel.updateFilterType(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventButtonComponent.disable();
    if (this.#events.length === 0) {
      this.#renderEventList();
    }
    this.#newEventPresenter = this.#createEventPresenter(this.#tripModel.getDefaultEvent(), FormMode.CREATE);
  };

  #updateEventList = () => {
    this.#destroyEventPresenters();
    if (this.#sortedEvents.length) {
      this.#renderEvents();
    } else {
      this.#renderBoard();
    }
  };

  #updateBoard = () => {
    this.#activeSortType = SortType.DAY;
    this.#destroyBoard();
    this.#renderBoard();
  };

  #destroyEventPresenters = () => {
    this.#destroyNewEventPresenter();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
    this.#activeEventId = '';
  };

  #destroyBoard = () => {
    remove(this.#sortComponent);
    remove(this.#eventListComponent);
    remove(this.#noEventsComponent);
    this.#destroyEventPresenters();
  };

  #destroyNewEventPresenter = () => {
    if (this.#newEventPresenter) {
      this.#newEventButtonComponent.enable();
      this.#newEventPresenter.destroy();
      this.#newEventPresenter = null;
    }
  };

  #deleteEvent = async (updateType, updatedEvent) => {
    if (updatedEvent.id) {
      await this.#tripModel.deleteEvent(updateType, updatedEvent);
      return;
    }

    this.#destroyNewEventPresenter();
    if (this.#events.length === 0) {
      this.#renderNoEvents();
    }
  };

  #viewActionHandler = async (actionType, updateType, updatedEvent) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        try {
          await this.#tripModel.updateEvent(updateType, updatedEvent);
        } catch {
          this.#eventPresenters.get(updatedEvent.id).abort();
        }
        break;

      case UserAction.CREATE_EVENT:
        try {
          await this.#tripModel.createEvent(updateType, updatedEvent);
        } catch {
          this.#newEventPresenter.abort();
        }
        break;

      case UserAction.DELETE_EVENT:
        try {
          await this.#deleteEvent(updateType, updatedEvent);
        } catch {
          this.#eventPresenters.get(updatedEvent.id)?.abort();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #onModelChangeHandler = (updateType, payload) => {
    this.#events = filterEvents(this.#tripModel.events, this.#tripModel.filterType);

    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(payload.id).init(payload);
        break;

      case UpdateType.MINOR:
        this.#updateEventList();
        break;

      case UpdateType.MAJOR:
        this.#updateBoard();
        break;
    }
  };

  #toggleEventMode = (newEventId = '') => {
    this.#destroyNewEventPresenter();

    const eventId = this.#activeEventId;
    if (this.#activeEventId) {
      this.#eventPresenters.get(eventId).toggleEventView(EventMode.DEFAULT);
      this.#activeEventId = '';
    }

    if (newEventId && (eventId !== newEventId)) {
      this.#eventPresenters.get(newEventId).toggleEventView(EventMode.FORM);
      this.#activeEventId = newEventId;
    }
  };

  #escKeyHandler = (evt) => {
    if ((evt.key === KeyCode.ESC) && (this.#activeEventId || this.#newEventPresenter)) {
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
