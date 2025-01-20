import { EventMode, FormMode, UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition, replace } from '../framework/render';
import EventView from '../view/event-view';
import FormView from '../view/form-view';

export default class EventPresenter {
  #eventContainer = null;
  #eventComponent = null;
  #formComponent = null;

  /** @type {TripEvent} */
  #event = null;
  /** @type {Offers} */
  #offers = null;
  /** @type {Destination} */
  #destinations = null;

  #formMode = '';

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

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#formComponent;

    //!!! update?
    this.#eventComponent = new EventView(this.#event, this.#offers, this.#destinations).setOnFavoriteClickHandler(this.#favoriteClickHandler);
    this.#formComponent = new FormView(this.#event, this.#offers, this.#destinations, formMode)
      .setOnFormSubmitHandler(this.#formSubmitHandler)
      .setOnFormDeleteHandler(this.#formDeleteHandler);

    if (prevEventComponent === null || prevFormComponent === null) {
      const renderingComponent = (this.#formMode === FormMode.CREATE) ? this.#formComponent : this.#eventComponent;
      const position = (this.#formMode === FormMode.CREATE) ? RenderPosition.AFTERBEGIN : RenderPosition.BEFOREEND;
      render(this.#eventContainer, renderingComponent, position);
      return this;
    }

    if (this.#eventContainer.contains(prevEventComponent.element)) {
      replace(prevEventComponent, this.#eventComponent);
    }
    if (this.#eventContainer.contains(prevFormComponent.element)) {
      replace(prevFormComponent, this.#formComponent);
    }

    remove(prevEventComponent);
    remove(prevFormComponent);

    return this;
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  }

  setViewActionHandler = (callback) => {
    this.#viewActionCallback = callback;
    return this;
  };

  toggleEventView = (direction = EventMode.DEFAULT) => {
    if (direction === EventMode.DEFAULT) {
      this.#formComponent.updateElement(this.#event);
      replace(this.#formComponent, this.#eventComponent);
    } else {
      replace(this.#eventComponent, this.#formComponent);
    }

    return this;
  };

  //!!! Можно сделать пере фильтрацию по модели и, если выпадет из списка, то
  #formSubmitHandler = (updatedEvent) => {
    const updateType = (this.#formMode === FormMode.CREATE) ? UpdateType.MAJOR : UpdateType.MINOR;
    const action = (this.#formMode === FormMode.CREATE) ? UserAction.CREATE_EVENT : UserAction.UPDATE_EVENT;
    this.#viewActionCallback?.(action, updateType, updatedEvent);
  };

  //!!! Если больше нет events, то MINOR, а так PATCH
  #formDeleteHandler = (updatedEvent) => {
    const eventsQuantity = this.#getEventsQuantity() - 1;
    const updateType = eventsQuantity ? UpdateType.MINOR : UpdateType.MAJOR;
    const action = (this.#formMode === FormMode.CREATE) ? UserAction.CANCEL_EVENT : UserAction.DELETE_EVENT;
    this.#viewActionCallback?.(action, updateType, updatedEvent);
  };

  #favoriteClickHandler = () => {
    this.#viewActionCallback?.(UserAction.UPDATE_EVENT, UpdateType.PATCH,
      { ...this.#event, isFavorite: !this.#event.isFavorite }
    );
  };
}
