import dayjs from 'dayjs';
import { DateFormat } from '../const';
import AbstractView from './abstract-view';

const createTripInfoTemplate = ({ start, middle, end, price }) => {

  const destinationStart = start?.destination.name;
  const destinationEnd = end?.destination.name;
  const destinationMiddle = middle ? middle?.destination.name : '...';
  const dateStart = dayjs(start?.dateFrom).format(DateFormat.INFO_HUMAN);
  const dateEnd = dayjs(end?.dateFrom).format(DateFormat.INFO_HUMAN);

  //!!! Исправить показ месяца начала, если совпадает с месяцем конца маршрута

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationStart} &mdash; ${destinationMiddle} &mdash; ${destinationEnd}</h1>

        <p class="trip-info__dates">${dateStart}&nbsp;&mdash;&nbsp;${dateEnd}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
      </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #tripInfo = null;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }

  get template() {
    return createTripInfoTemplate(this.#tripInfo);
  }
}

