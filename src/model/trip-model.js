import { generateTripData } from '../../mocks/generate-data';
import { TripDefault } from '../const';

export default class TripModel {
  #events = [];
  #destinations = [];
  #offers = [];

  get events() {
    return this.#events.map((event) => ({
      ...event,
      destination: this.#destinations.find(({ id }) => id === event.destination),
      offers: this.#prepareOffers(event.type, event.offers),
    }));
  }

  get destinations() {
    return this.#destinations;
  }

  get offerTypes() {
    return this.#offers.map(({ type }) => type);
  }

  getDefaultEvent() {
    const date = new Date().toISOString();
    const type = this.#offers.some((offer) => offer.type === TripDefault.TYPE) ? TripDefault.TYPE : this.#offers[0];

    return {
      basePrice: TripDefault.PRICE,
      dateFrom: date,
      dateTo: date,
      destination: TripDefault.DESTINATION,
      isFavorite: TripDefault.IS_FAVORITE,
      offers: this.#prepareOffers(type, TripDefault.OFFERS),
      type,
    };
  }

  #prepareOffers = (type, offerIds) => {
    const offers = this.#offers.find((offer) => offer.type === type)?.offers || [];
    return offers.map((offer) => ({ ...offer, isChecked: offerIds.some((offerId) => offerId === offer.id) }));
  };

  init() {
    [this.#events, this.#offers, this.#destinations] = generateTripData();
  }
}
