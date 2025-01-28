import SortView from '../view/sort-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import NoEventsView from '../view/no-events-view';
import EventListView from '../view/event-list-view';
import EventPresenter from './event-presenter';
import NewEventButtonView from '../view/new-event-button-view';
import { nanoid } from 'nanoid';
import { sortEvents } from '../utils/sort';
import { filterEvents } from '../utils/filter';
import { remove, render } from '../framework/render';
import { ElementSelectors as E, EventListMessage, EventMode, FilterType, FormMode, KeyCode, SortType, UiBlockerTimeLimit, UpdateType, UserAction } from '../const';

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

  #activeSortType = SortType.DAY;
  #eventPresenters = new Map();
  #activeEventId = '';

  #isLoading = true;

  #uiBlocker = new UiBlocker({
    lowerLimit: UiBlockerTimeLimit.LOWER_LIMIT,
    upperLimit: UiBlockerTimeLimit.UPPER_LIMIT
  });

  constructor(newEventButtonContainer, boardContainer, tripModel) {
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

    if (this.#tripModel.errorMessage) {
      return this.#tripModel.errorMessage;
    }

    this.#newEventButtonComponent.enable();
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

  #renderEvents = () => this.#sortedEvents.forEach((event) => this.#eventPresenters.set(event.id, this.#createEventPresenter(event)));

  #newEventHandler = () => {
    this.#toggleEventMode();
    this.#activeSortType = SortType.DAY;
    this.#tripModel.updateFilterType(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventButtonComponent.disable();

    if (this.#events.length === 0) {
      this.#renderEventList();
    }

    const newEvent = this.#tripModel.getDefaultEvent();
    const newEventId = nanoid();
    this.#eventPresenters.set(newEventId, this.#createEventPresenter(newEvent, FormMode.CREATE));
    this.#toggleEventMode(newEventId);
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
    this.#newEventButtonComponent.enable();
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

  #deleteEvent = async (updateType, updatedEvent) => {
    if (updatedEvent.id) {
      await this.#tripModel.deleteEvent(updateType, updatedEvent);
      return;
    }

    this.#updateEventList();
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
          this.#eventPresenters.get(this.#activeEventId).abort();
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
    const eventId = this.#activeEventId;
    if (this.#activeEventId) {
      this.#activeEventId = '';
      this.#eventPresenters.get(eventId).toggleEventView(EventMode.DEFAULT);
    }

    if (newEventId && (eventId !== newEventId)) {
      this.#eventPresenters.get(newEventId).toggleEventView(EventMode.FORM);
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
