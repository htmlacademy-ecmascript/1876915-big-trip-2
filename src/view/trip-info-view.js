import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import { DateFormat, TripTitleQuantity } from '../const';

const createTripTitle = (events, lastEvent, length, destinations) => {
  if (length > TripTitleQuantity.MAX) {
    return `${destinations.get(events[0].destinationId).name} &mdash; ... &mdash; ${destinations.get(lastEvent.destinationId).name}`;
  }

  return events.map(({ destinationId }) => destinations.get(destinationId).name).join(' &mdash; ');
};

const createTripDate = (events, lastEvent, length) => {
  const firstEventMonth = new Date(events[0].dateFrom).getMonth();
  const lastEventMonth = new Date(lastEvent.dateFrom).getMonth();

  const format = ((length > TripTitleQuantity.MIN) && (firstEventMonth === lastEventMonth)) ? DateFormat.INFO_SHORT_HUMAN : DateFormat.INFO_HUMAN;
  const date = `${dayjs(events[0].dateFrom).format(format)}&nbsp;&mdash;&nbsp;${dayjs(lastEvent.dateTo).format(DateFormat.INFO_HUMAN)}`;

  return date;
};

const getOffersPrice = (offers, offerIds) => offers
  .filter((offer) => offerIds.includes(offer.id))
  .reduce((accumulator, { price }) => accumulator + (+price), 0);

const createTripInfoTemplate = (events, offers, destinations) => {
  const length = events.length;

  if (length === 0) {
    return '';
  }

  const lastEvent = events[length - 1];

  const title = createTripTitle(events, lastEvent, length, destinations);
  const date = createTripDate(events, lastEvent, length);
  const price = events.reduce((accumulator, { basePrice, type, offerIds }) => accumulator + (+basePrice) + getOffersPrice(offers.get(type), offerIds), 0);

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

        <p class="trip-info__dates">${date}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #events = [];
  #offers = null;
  #destinations = null;

  constructor(events, offers, destinations) {
    super();
    this.#events = events;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#offers, this.#destinations);
  }
}

