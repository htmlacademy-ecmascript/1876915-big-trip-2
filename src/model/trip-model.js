import Observable from '../framework/observable';
import { createFilters } from '../utils/filter';
import { createSortItems } from '../utils/sort';
import { generateTripData } from '../../mocks/generate-data';
import { FilterType, tripDefault } from '../const';
import { nanoid } from 'nanoid';

export default class TripModel extends Observable {
  #events = new Map();
  #destinations = new Map();
  #offers = new Map();
  #filterType = FilterType.EVERYTHING;

  get events() {
    return Array.from(this.#events.values());
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get filters() {
    return createFilters(this.events);
  }

  get sortItems() {
    return createSortItems(this.events);
  }

  get filterType() {
    return this.#filterType;
  }

  getDefaultEvent = () => {
    const date = new Date().toISOString();
    const type = this.#offers.has(tripDefault.type) ? tripDefault.type : this.#offers.keys()[0];

    return {
      ...tripDefault,
      dateFrom: date,
      dateTo: date,
      offerIds: this.#offers.get(type),
      type,
    };
  };

  init() {
    const [rawEvents, rawOffers, rawDestinations] = generateTripData();

    rawEvents.forEach((event) => {
      this.#events.set(event.id, event);
    });

    rawOffers.forEach(({ type, offers }) => {
      this.#offers.set(type, offers);
    });

    rawDestinations.forEach((destination) => {
      this.#destinations.set(destination.id, destination);
    });
  }

  #checkEventExistence = (id) => {
    if (this.#events.has(id)) {
      return;
    }

    throw new Error(`Event with id: ${id} doesn't exist`);
  };

  createEvent = (updateType, event) => {
    //remove nanoid, when using api
    this.#events.set({ ...event, id: nanoid() });
    this._notify(updateType, event);
  };

  updateEvent = (updateType, event) => {
    this.#checkEventExistence(event.id);
    this.#events.set(event.id, event);
    this._notify(updateType, event);
  };

  deleteEvent = (updateType, event) => {
    this.#checkEventExistence(event.id);
    this.#events.delete(event.id);
    this._notify(updateType);
  };

}
