import { SortType } from '../const';
import AbstractView from './abstract-view';

const createSortItemTemplate = (activeFilter) => Object.values(SortType).map((value) => {

  const checkStatus = value === activeFilter ? 'checked' : '';

  return (`
    <div class="trip-sort__item  trip-sort__item--${value}">
      <input id="sort-${value}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value}" ${checkStatus}>
        <label class="trip-sort__btn" for="sort-${value}">${value}</label>
    </div>`
  );
}).join('');

const createSortTemplate = (activeFilter) => (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortItemTemplate(activeFilter)}
  </form>`
);

export default class SortView extends AbstractView {
  #activeFilter = '';

  constructor(filter) {
    super();
    this.#activeFilter = filter in SortType ? filter : SortType.PRICE;
  }

  get template() {
    return createSortTemplate(this.#activeFilter);
  }
}

