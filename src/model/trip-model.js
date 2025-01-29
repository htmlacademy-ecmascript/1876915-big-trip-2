import Observable from '../framework/observable';
import { createFilters } from '../utils/filter';
import { createSortItems } from '../utils/sort';
import { EventListMessage, FilterType, tripDefault, UpdateType } from '../const';

export default class TripModel extends Observable {
  #eventApiService = null;
  /** @type {Map<Id, TripEvent>} */
  #events = new Map();
  /** @type {Map<EventType, Offer[]>} */
  #offers = new Map();
  /** @type {Map<Id, Destination>} */
  #destinations = new Map();

  #filterType = FilterType.EVERYTHING;
  #error = '';

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

  get errorMessage() {
    return this.#error;
  }

  getDefaultEvent = () => ({
    ...tripDefault,
    type: this.#offers.has(tripDefault.type) ? tripDefault.type : this.#offers.keys()[0],
  });

  async init() {
    try {
      const [rawEvents = [], rawOffers = [], rawDestinations = []] = await this.#eventApiService.getTripData();

      if ((rawOffers.length === 0) || (rawDestinations.length === 0)) {
        throw new Error('Empty offers/destination list');
      }

      this.#events = new Map(rawEvents.map(this.#adaptEventToClient));
      this.#offers = new Map(rawOffers.map(this.#adaptOffersToClient));
      this.#destinations = new Map(rawDestinations.map(this.#adaptDestinationsToClient));
    } catch (error) {
      this.#error = EventListMessage.ERROR;
    } finally {
      this._notify(UpdateType.MAJOR);
    }
  }

  #checkEventExistence = (id) => {
    if (this.#events.has(id)) {
      return;
    }

    throw new Error(`Event with id: ${id} doesn't exist`);
  };

  createEvent = async (updateType, event) => {
    try {
      const response = await this.#eventApiService.createEvent(event);
      const [id, newEvent] = this.#adaptEventToClient(response);
      this.#events.set(id, newEvent);
      this._notify(updateType, newEvent);
    } catch {
      throw new Error('Can\'t crete event');
    }
  };

  updateEvent = async (updateType, event) => {
    try {
      this.#checkEventExistence(event.id);
      const response = await this.#eventApiService.updateEvent(event);
      const [id, newEvent] = this.#adaptEventToClient(response);
      this.#events.set(id, newEvent);
      this._notify(updateType, newEvent);
    } catch {
      throw new Error('Can\'t update event');
    }
  };

  deleteEvent = async (updateType, event) => {
    try {
      this.#checkEventExistence(event.id);
      await this.#eventApiService.deleteEvent(event);
      this.#events.delete(event.id);
      this._notify(updateType, event);
    } catch {
      throw new Error('Can\'t delete event');
    }
  };

  updateFilterType = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType);
  };

  #adaptEventToClient = (event) => ([event.id, {
    id: event.id,
    basePrice: event['base_price'],
    dateFrom: event['date_from'],
    dateTo: event['date_to'],
    destinationId: event.destination,
    isFavorite: event['is_favorite'],
    offerIds: event.offers,
    type: event.type,
  }]);

  #adaptOffersToClient = ({ type, offers }) => [type, offers];
  #adaptDestinationsToClient = (destination) => [destination.id, destination];
}
