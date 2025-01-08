import AbstractView from '../framework/view/abstract-view';

const createSortItemTemplate = (sortItems, activeFilter) => sortItems.map(({ type, count }) => {

  const checkStatus = type === activeFilter ? 'checked' : '';
  const disableStatus = count === 0 ? 'disabled' : '';

  return (`
    <div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden"
        type="radio" name="trip-sort" value="sort-${type}" ${checkStatus} ${disableStatus}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
    </div>`
  );
}).join('');

const createSortTemplate = (sortItems, sortType) => (`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortItemTemplate(sortItems, sortType)}
  </form>`
);

export default class SortView extends AbstractView {
  #sortItems = [];
  #activeSortType = '';
  #onSortClickHandler = null;

  constructor(sortItems, sortType) {
    super();
    this.#sortItems = sortItems;
    this.#activeSortType = sortType;

    this.createEventListener(this.element, 'click', this.#sortClickHandler);
  }

  get template() {
    return createSortTemplate(this.#sortItems, this.#activeSortType);
  }

  setOnSortClickHandler = (callback) => {
    this.#onSortClickHandler = callback;
  };

  #sortClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    this.#onSortClickHandler?.(evt.target.textContent);
  };
}

