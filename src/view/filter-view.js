import AbstractView from '../framework/view/abstract-view';

const createFiltersItemTemplate = (filters, activeFilter) => filters.map(({ type, count }) => {

  const checkStatus = type === activeFilter ? 'checked' : '';
  const disableStatus = count === 0 ? 'disabled' : '';

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" data-filter-type="${type}" value="${type}" ${checkStatus} ${disableStatus}>
      <label class="trip-filters__filter-label" for="filter-${type}" data-filter-type="${type}">${type}</label>
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
  #onFilterChangeCallback = null;

  constructor(filters, activeFilter) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
    this.createEventListener(this.element, 'click', this.#onFilterChangeHandler);
    this.createEventListener(this.element, 'submit', this.#onFormSubmitHandler, { isPreventDefault: true });
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#activeFilter);
  }

  setOnFilterChangeHandler = (callback) => {
    this.#onFilterChangeCallback = callback;
    return this;
  };

  #onFilterChangeHandler = ({ target }) => {
    if ((target.tagName !== 'LABEL') && (target.tagName !== 'INPUT')) {
      return;
    }

    if (this.#activeFilter === target.dataset.filterType) {
      return;
    }

    if (target.parentElement.firstElementChild.disabled) {
      return;
    }

    this.#activeFilter = target.dataset.filterType;
    this.#onFilterChangeCallback?.(this.#activeFilter);
  };

  #onFormSubmitHandler = () => {
    let newFilter = this.#activeFilter;

    for (const element of this.element['trip-filter']) {
      if (element.checked) {
        newFilter = element.value;
        break;
      }
    }

    if (newFilter === this.#activeFilter) {
      return;
    }

    this.#activeFilter = newFilter;
    this.#onFilterChangeCallback?.(this.#activeFilter);
  };
}
