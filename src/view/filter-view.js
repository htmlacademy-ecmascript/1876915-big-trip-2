import AbstractView from '../framework/view/abstract-view';

const createFiltersItemTemplate = (filters, activeFilter) => filters.map(({ type, count }) => {

  const checkStatus = type === activeFilter ? 'checked' : '';
  const disableStatus = count === 0 ? 'disabled' : '';

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" value="${type}" ${checkStatus} ${disableStatus}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}).join('');

const createFiltersTemplate = (filters, activeFilter) => (`
  <form class="trip-filters" action="#" method="get">
    ${createFiltersItemTemplate(filters, activeFilter)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView extends AbstractView {
  #filters = [];
  #activeFilter = '';

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }
}
