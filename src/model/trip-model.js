import Observable from '../framework/observable';
import { createFilters } from '../utils/filter';
import { createSortItems } from '../utils/sort';
import { generateTripData } from '../../mocks/generate-data';
import { FilterType, tripDefault, UpdateType } from '../const';
import { nanoid } from 'nanoid';

export default class TripModel extends Observable {
  #eventApiService = null;
  #events = new Map();
  #destinations = new Map();
  #offers = new Map();
  #filterType = FilterType.EVERYTHING;

  constructor(eventApiService) {
    super();

    this.#eventApiService = eventApiService;
  }

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

  get eventsSize() {
    return this.#events.size;
  }

  getDefaultEvent = () => {
    const date = new Date().toISOString();
    const type = this.#offers.has(tripDefault.type) ? tripDefault.type : this.#offers.keys()[0];

    return {
      ...tripDefault,
      dateFrom: date,
      dateTo: date,
      destinationId: this.#destinations.values().next().value.id,
      type,
    };
  };

  async init() {
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


    try {
      const events = await this.#eventApiService.events;
      this.#events = new Map(events.map(this.#adaptEventToClient));
      console.log("🚀 ~ TripModel ~ init ~ this.#events:", this.#events)
    } catch (err) {
      this.#events = new Map();
    }

    this._notify(UpdateType.INIT);
  }

  #checkEventExistence = (id) => {
    if (this.#events.has(id)) {
      return;
    }

    throw new Error(`Event with id: ${id} doesn't exist`);
  };

  createEvent = (updateType, event) => {
    //!!! remove nanoid, when using api
    const id = nanoid();
    const newEvent = { ...event, id };
    this.#events.set(id, newEvent);
    this._notify(updateType, newEvent);
  };

  updateEvent = (updateType, event) => {
    this.#checkEventExistence(event.id);
    this.#events.set(event.id, event);
    this._notify(updateType, event);
  };

  deleteEvent = (updateType, event) => {
    this.#checkEventExistence(event.id);
    this.#events.delete(event.id);
    this._notify(updateType, event);
  };

  updateFilterType = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType);
  };

  #adaptEventToClient(event) {
    const adaptedEvent = {
      ...event,
      offerIds: event.offers,
      destinationId: event.destination,
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent.offers;
    delete adaptedEvent.destination;
    delete adaptedEvent['is_favorite'];

    return [event.id, adaptedEvent];
  }
}
