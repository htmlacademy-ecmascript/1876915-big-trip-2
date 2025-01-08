import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view';
import { DateFormat, TripTitleQuantity } from '../const';

const createTripTittle = (events, lastEvent, length) => {
  if (length > TripTitleQuantity.MAX) {
    return `${events[0].destination.name} &mdash; ... &mdash; ${lastEvent.destination.name}`;
  }

  return events.map(({ destination: { name } }) => name).join(' &mdash; ');
};

const createTripDate = (events, lastEvent, length) => {
  const firstEventMonth = new Date(events[0].dateFrom).getMonth();
  const lastEventMonth = new Date(lastEvent.dateFrom).getMonth();
  const format = ((length > TripTitleQuantity.MIN) && (firstEventMonth === lastEventMonth)) ? DateFormat.INFO_SHORT_HUMAN : DateFormat.INFO_HUMAN;

  let date = `${dayjs(events[0].dateFrom).format(format)}`;

  if (length > TripTitleQuantity.MIN) {
    date += `&nbsp;&mdash;&nbsp;${dayjs(lastEvent.dateFrom).format(DateFormat.INFO_HUMAN)}`;
  }

  return date;
};

const createTripInfoTemplate = (events) => {
  const length = events.length;

  if (length === 0) {
    return '';
  }

  const lastEvent = events[length - 1];

  const title = createTripTittle(events, lastEvent, length);
  const date = createTripDate(events, lastEvent, length);
  const price = events.reduce((accumulator, { basePrice }) => accumulator + basePrice, 0);

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
  #events = null;

  constructor(events) {
    super();
    this.#events = events;
  }

  get template() {
    return createTripInfoTemplate(this.#events);
  }
}

