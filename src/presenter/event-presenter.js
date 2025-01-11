import { EventMode } from '../const';
import { remove, render, replace } from '../framework/render';
import EventView from '../view/event-view';
import FormView from '../view/form-view';

export default class EventPresenter {
  #eventContainer = null;
  #eventComponent = null;
  #formComponent = null;

  #event = null;
  #onEventChangeCallback = null;
  #onFormSubmitCallback = null;
  #onOfferClickCallback = null;

  constructor(eventContainer) {
    this.#eventContainer = eventContainer;
  }

  init(event, destinations, offerTypes) {

    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevFormComponent = this.#formComponent;

    this.#eventComponent = new EventView(event);
    this.#eventComponent.setOnFavoriteClickHandler(this.#favoriteClickHandler);
    this.#formComponent = new FormView(event, destinations, offerTypes);
    this.#formComponent.setOnFormSubmitHandler(this.#formSubmitHandler);
    this.#formComponent.setOnOfferClickHandler(this.#offerClickHandler);

    if (prevEventComponent === null || prevFormComponent === null) {
      render(this.#eventContainer, this.#eventComponent);
      return;
    }

    if (this.#eventContainer.contains(prevEventComponent.element)) {
      replace(prevEventComponent, this.#eventComponent);
    }
    if (this.#eventContainer.contains(prevFormComponent.element)) {
      replace(prevFormComponent, this.#formComponent);
    }

    remove(prevEventComponent);
    remove(prevFormComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#formComponent);
  }

  setOnDataChangeHandler = (callback) => {
    this.#onEventChangeCallback = callback;
  };

  setOnFormSubmitHandler = (callback) => {
    this.#onFormSubmitCallback = callback;
  };

  setOnOfferClickHandler = (callback) => {
    this.#onOfferClickCallback = callback;
  };

  toggleEventView = (direction = EventMode.DEFAULT) => {
    if (direction === EventMode.DEFAULT) {
      replace(this.#formComponent, this.#eventComponent);
    } else {
      replace(this.#eventComponent, this.#formComponent);
    }
  };

  #formSubmitHandler = (updatedEvent) => {
    this.#onFormSubmitCallback?.(updatedEvent);
  };

  #favoriteClickHandler = () => {
    this.#onEventChangeCallback?.({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };

  #offerClickHandler = (updatedEvent) => {
    this.#onOfferClickCallback?.(updatedEvent);
  };
}
