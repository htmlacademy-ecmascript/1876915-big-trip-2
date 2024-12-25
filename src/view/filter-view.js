import { FilterType } from '../const';
import AbstractView from './abstract-view';

const createFiltersItemTemplate = (activeFilter) => Object.values(FilterType).map((value) => {

  const checkStatus = value === activeFilter ? 'checked' : '';

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${checkStatus}>
      <label class="trip-filters__filter-label" for="filter-everything">${value}</label>
    </div>`
  );
}).join('');

const createFiltersTemplate = (activeFilter) => (`
  <form class="trip-filters" action="#" method="get">
    ${createFiltersItemTemplate(activeFilter)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #activeFilter = '';

  constructor(filter) {
    super();
    this.#activeFilter = filter in FilterType ? filter : FilterType.EVERYTHING;
  }

  get template() {
    return createFiltersTemplate(this.#activeFilter);
  }
}
