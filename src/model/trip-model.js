import { createFilters } from '../utils/filter';
import { createSortItems } from '../utils/sort';
import { generateTripData } from '../../mocks/generate-data';
import { FilterType, tripDefault } from '../const';

export default class TripModel {
  #events = [];
  #destinations = new Map();
  #offers = new Map();
  #filterType = FilterType.EVERYTHING;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get filters() {
    return createFilters(this.#events);
  }

  get sortItems() {
    return createSortItems(this.#events);
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

    this.#events = rawEvents;

    rawOffers.forEach(({ type, offers }) => {
      this.#offers.set(type, offers);
    });

    rawDestinations.forEach((destination) => {
      this.#destinations.set(destination.id, destination);
    });
  }
}
