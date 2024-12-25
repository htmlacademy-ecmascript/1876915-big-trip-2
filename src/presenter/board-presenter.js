import { render, replace } from '../render';
import FormView from '../view/form-view';
import EventListView from '../view/event-list-view';
import EventListItemView from '../view/event-list-item-view';
import EventView from '../view/event-view';
import SortView from '../view/sort-view';
import NewEventButtonView from '../view/new-event-button-view';
import { ElementSelectors as E, EventListMessage, FilterType, KeyCode, SortType } from '../const';
import EventListMessageView from '../view/event-list-message-view';

export default class BoardPresenter {
  #boardContainer = null;
  #newEventButtonContainer = null;

  #filterType = FilterType.EVERYTHING;
  #sortType = SortType.PRICE;
  #eventListMessage = null;

  #eventList = new EventListView(EventListItemView);
  #eventSort = new SortView(this.#sortType);
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
    this.#renderEventList();
  }

  #renderEventList = () => {
    render(this.#boardContainer, this.#eventSort);
    render(this.#boardContainer, this.#eventList);
    render(this.#newEventButtonContainer, this.#newEventButton);

    for (const event of this.#events) {
      const eventComponent = new EventView(event);
      const formComponent = new FormView(event, this.#destinations, this.#offerTypes);
      formComponent.setOnFormSubmitHandler(this.#toggleEventForm);
      this.#eventComponents.set(event.id, [eventComponent, formComponent]);
      this.#eventList.add(eventComponent);
    }

    this.#eventList.setEventToggleHandler(this.#EventToggleHandler);
    this.#eventList.setEscKeyDownHandler(this.#escKeyHandler);

    if (this.#events.length === 0) {
      this.#eventListMessage = new EventListMessageView(EventListMessage[this.#filterType]);
      render(this.#eventList, this.#eventListMessage);
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

  #EventToggleHandler = ({ target }) => {
    if (target.matches(E.ROLL_UP_BUTTON)) {
      const eventItem = target.closest(E.EVENT_ITEM);
      const eventId = eventItem?.dataset.eventId;
      this.#toggleEventForm(eventId);
    }
  };


}
