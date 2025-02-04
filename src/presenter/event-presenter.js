import FormView from '../view/form-view';
import EventView from '../view/event-view';
import { EventMode, FormMode, UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition, replace } from '../framework/render';

export default class EventPresenter {
  #eventContainer = null;
  #eventComponent = null;
  #formComponent = null;

  /** @type {TripEvent} */
  #event = null;
  /** @type {Map<EventType, Offer[]>} */
  #offers = null;
  /** @type {Map<Id, Destination>} */
  #destinations = null;

  #formMode = FormMode.EDIT;
  #eventMode = EventMode.DEFAULT;

  #viewActionCallback = null;
  #getEventsQuantity = null;

  constructor(eventContainer, getEventsQuantity) {
    this.#eventContainer = eventContainer;
    this.#getEventsQuantity = getEventsQuantity;
  }

  init(event = this.#event, offers = this.#offers, destinations = this.#destinations, formMode = FormMode.EDIT) {

    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formMode = formMode;
    this.#eventMode = (this.#formMode === FormMode.CREATE) ? EventMode.FORM : EventMode.DEFAULT;


    if ((this.#eventComponent === null) || (this.#formComponent === null)) {

      this.#eventComponent = new EventView(this.#event, this.#offers, this.#destinations)
        .setOnFavoriteClickHandler(this.#favoriteClickHandler);

      this.#formComponent = new FormView(this.#event, this.#offers, this.#destinations, formMode)
        .setOnFormSubmitHandler(this.#formSubmitHandler)
        .setOnFormDeleteHandler(this.#formDeleteHandler);

      const position = (this.#formMode === FormMode.CREATE) ? RenderPosition.AFTERBEGIN : RenderPosition.BEFOREEND;

      render(this.#eventContainer, this.#eventComponent, position);
      return this;
    }


    if (this.#eventMode === EventMode.DEFAULT) {
      this.#eventComponent.updateElement(this.#event);
      return this;
    }

    this.#formComponent.updateElement(this.#event);
    return this;
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  };

  abort = () => {
    if (this.#eventMode === EventMode.DEFAULT) {
      this.#eventComponent?.shake();
      return;
    }

    this.#formComponent?.shake(() => this.#formComponent.reset());
  };

  setViewActionHandler = (callback) => {
    this.#viewActionCallback = callback;
    return this;
  };

  toggleEventView = (direction = EventMode.DEFAULT) => {

    switch (direction) {
      case (EventMode.FORM):
        replace(this.#eventComponent, this.#formComponent);
        break;

      case (EventMode.DEFAULT):
        if (this.#formMode === FormMode.CREATE) {
          this.#formDeleteHandler(this.#event);
        } else {
          this.#formComponent.reset(this.#event);
          replace(this.#formComponent, this.#eventComponent);
        }
        break;
    }

    this.#eventMode = direction;

    return this;
  };

  #formSubmitHandler = (updatedEvent) => {
    const updateType = (this.#formMode === FormMode.CREATE) ? UpdateType.MAJOR : UpdateType.MINOR;
    const action = (this.#formMode === FormMode.CREATE) ? UserAction.CREATE_EVENT : UserAction.UPDATE_EVENT;
    this.#viewActionCallback?.(action, updateType, updatedEvent);
  };

  #formDeleteHandler = (updatedEvent) => {
    const eventsQuantity = this.#getEventsQuantity() - 1;
    const updateType = eventsQuantity ? UpdateType.MINOR : UpdateType.MAJOR;
    this.#viewActionCallback?.(UserAction.DELETE_EVENT, updateType, updatedEvent);
  };

  #favoriteClickHandler = () => {
    this.#viewActionCallback?.(UserAction.UPDATE_EVENT, UpdateType.PATCH,
      { ...this.#event, isFavorite: !this.#event.isFavorite }
    );
  };
}
