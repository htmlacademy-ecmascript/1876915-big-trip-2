import { createFilters } from '../utils/filter';
import { createSortItems } from '../utils/sort';
import { generateTripData } from '../../mocks/generate-data';
import { FilterType, tripDefault } from '../const';

export default class TripModel {
  #events = [];
  #rawEvents = [];
  #destinations = [];
  #offers = [];
  #filterType = FilterType.EVERYTHING;

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
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

  get offerTypes() {
    return this.#offers.map(({ type }) => type);
  }

  getDefaultEvent = () => {
    const date = new Date().toISOString();
    const type = this.#offers.some((offer) => offer.type === tripDefault.type) ? tripDefault.type : this.#offers[0];

    return {
      ...tripDefault,
      dateFrom: date,
      dateTo: date,
      offers: this.#prepareOffers(type, tripDefault.offers),
      type,
    };
  };

  #prepareOffers = (type, offerIds) => {
    const offers = this.#offers.find((offer) => offer.type === type)?.offers || [];
    return offers.map((offer) => ({ ...offer, isChecked: offerIds.some((offerId) => offerId === offer.id) }));
  };

  init() {
    [this.#rawEvents, this.#offers, this.#destinations] = generateTripData();

    this.#events = this.#rawEvents.map((event) => ({
      ...event,
      destination: this.#destinations.find(({ id }) => id === event.destination),
      offers: this.#prepareOffers(event.type, event.offers),
    }));
  }
}
