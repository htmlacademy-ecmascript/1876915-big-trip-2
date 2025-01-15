import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import { DateFormat } from '../const';
import { getDuration } from '../utils/event';

const createOfferListTemplate = (offers) => (
  `${offers.map(({ title, price }) => (`
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`)).join('')}`
);

const createEventTemplate = (event, offerList, destinations) => {
  const {
    id,
    basePrice,
    destinationId,
    dateFrom,
    dateTo,
    isFavorite,
    offerIds,
    type,
  } = event || {};

  const offers = offerList.get(type).filter((offer) => offerIds.includes(offer.id));
  const date = dayjs(dateFrom).format(DateFormat.EVENT_DEFAULT);
  const dateHuman = dayjs(dateFrom).format(DateFormat.EVENT_HUMAN);

  const [start, end, duration] = getDuration(dateFrom, dateTo);
  const dateStart = start.format(DateFormat.EVENT_START);
  const dateEnd = end.format(DateFormat.EVENT_START);
  const timeStart = start.format(DateFormat.EVENT_TIME);
  const timeEnd = end.format(DateFormat.EVENT_TIME);

  const eventTitle = `${type} ${destinations.get(destinationId).name}`;
  const eventClass = isFavorite ? 'event__favorite-btn--active' : '';

  return (`
    <li class="trip-events__item" data-event-id = ${id}>
      <div class="event">
        <time class="event__date" datetime="${date}">${dateHuman}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        ${(offers.length > 0) ? `
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${createOfferListTemplate(offers)}
          </ul>` : ''}
        <button class="event__favorite-btn ${eventClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventView extends AbstractView {
  #event = null;
  #offers = null;
  #destinations = null;

  constructor(event, offers, destinations) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destinations);
  }

  setOnFavoriteClickHandler = (callback) => {
    this.createEventListener('.event__favorite-btn', 'click', callback);
  };
}
