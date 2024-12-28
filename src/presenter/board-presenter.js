import { render, replace } from '../render';
import { sortEvents } from '../utils/sort';
import { ElementSelectors as E, EventListMessage, KeyCode, SortType } from '../const';
import SortView from '../view/sort-view';
import FormView from '../view/form-view';
import EventView from '../view/event-view';
import EventListView from '../view/event-list-view';
import EmptyEventListView from '../view/empty-event-list-view';
import EventListItemView from '../view/event-list-item-view';
import NewEventButtonView from '../view/new-event-button-view';
import { filterEvents } from '../utils/filter';

export default class BoardPresenter {
  #boardContainer = null;
  #newEventButtonContainer = null;

  #activeSortType = SortType.PRICE;
  #emptyEventList = null;

  #eventList = new EventListView(EventListItemView);
  #newEventButton = new NewEventButtonView();

  /**
   * @type {TripEvent[]}
   */
  #events = [];
  #destinations = [];
  #offerTypes = [];

  /**
   * @type {TripModel}
   */
  #tripModel = null;

  #eventComponents = new Map();
  #activeComponent = '';

  constructor(boardContainer, newEventButtonContainer, tripModel) {
    this.#boardContainer = boardContainer;
    this.#tripModel = tripModel;
    this.#newEventButtonContainer = newEventButtonContainer;
  }

  init() {
    this.#events = [...this.#tripModel.events];
    this.#destinations = [...this.#tripModel.destinations];
    this.#offerTypes = [...this.#tripModel.offerTypes];
    this.#renderBoard();
    render(this.#newEventButtonContainer, this.#newEventButton);
  }

  #renderBoard = () => {

    const filter = this.#tripModel.filterType;
    const filteredEvents = filterEvents(this.#events, filter);

    if (filteredEvents.length === 0) {
      this.#emptyEventList = new EmptyEventListView(EventListMessage[filter]);
      render(this.#boardContainer, this.#emptyEventList);
      return;
    }

    render(this.#boardContainer, new SortView(this.#tripModel.sortItems, this.#activeSortType));
    render(this.#boardContainer, this.#eventList);
    this.#eventList.setEventToggleHandler(this.#eventToggleHandler);
    this.#eventList.setEscKeyDownHandler(this.#escKeyHandler);

    this.#renderEvents(sortEvents(filteredEvents, this.#activeSortType));
  };

  #renderEvents = (events) => {
    for (const event of events) {
      const eventComponent = new EventView(event);
      const formComponent = new FormView(event, this.#destinations, this.#offerTypes);
      formComponent.setOnFormSubmitHandler(this.#toggleEventForm);
      this.#eventComponents.set(event.id, [eventComponent, formComponent]);
      this.#eventList.add(eventComponent);
    }
  };

  #toggleEventForm = (newEventId = '') => {
    const eventId = this.#activeComponent;
    if (this.#activeComponent) {
      const [eventComponent, formComponent] = this.#eventComponents.get(eventId);
      replace(formComponent, eventComponent);
      this.#activeComponent = '';
    }

    if (newEventId && (eventId !== newEventId)) {
      const [eventComponent, formComponent] = this.#eventComponents.get(newEventId);
      replace(eventComponent, formComponent);
      this.#activeComponent = newEventId;
    }
  };

  #escKeyHandler = (evt) => {
    if ((evt.key === KeyCode.ESC) && (this.#activeComponent)) {
      this.#toggleEventForm();
    }
  };

  #eventToggleHandler = ({ target }) => {
    if (target.matches(E.ROLL_UP_BUTTON)) {
      const eventItem = target.closest(E.EVENT_ITEM);
      const eventId = eventItem?.dataset.eventId;
      this.#toggleEventForm(eventId);
    }
  };
}
