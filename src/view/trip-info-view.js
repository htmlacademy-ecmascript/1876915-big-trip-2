import dayjs from 'dayjs';
import AbstractView from './abstract-view';
import { DateFormat } from '../const';

const createTripInfoTemplate = (events) => {

  if (events.length === 0) {
    return '';
  }

  let title = `${events[0].destination.name}`;
  let count = 0;

  for (let i = 1; i < events.length; i++, count++) {
    if (events[i]) {
      title += ` &mdash; ${events[i].destination.name}`;

      if (count > 1) {
        title = title.replace(/;.+;/ig, '; ... &mdash;');
        break;
      }
    }
  }

  const firstEventMonth = new Date(events[0].dateFrom).getMonth();
  const lastEventMonth = new Date(events[count].dateFrom).getMonth();
  const format = ((events.length > 1) && (firstEventMonth === lastEventMonth)) ? DateFormat.INFO_SHORT_HUMAN : DateFormat.INFO_HUMAN;

  let date = `${dayjs(events[0].dateFrom).format(format)}`;

  if (count > 0) {
    date += `&nbsp;&mdash;&nbsp;${dayjs(events[count].dateFrom).format(DateFormat.INFO_HUMAN)}`;
  }

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

