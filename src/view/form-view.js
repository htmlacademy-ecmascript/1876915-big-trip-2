import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { nanoid } from 'nanoid';
import { capitalizeFirstLetter } from '../utils/event';
import { ButtonText, DateFormat, EVENT_MAX_PICE, FormMode, KeyCode, tripDefault } from '../const';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createTypeItemTemplate = (eventType, offers) => offers.keys()
  .reduce((accumulator, type) => {
    const checkStatus = eventType === type ? 'checked' : '';

    return `${accumulator}
      <div class="event__type-item" data-event-type="${type}">
        <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkStatus}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`;
  }, '');

const createTypePickerTemplate = (eventType, offers) => (`
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
        ${createTypeItemTemplate(eventType, offers)}
    </fieldset>
  </div>`
);

const createOfferItemTemplate = (offers, offerIds) => offers.map(({ id, title, price }) => {
  const checkStatus = offerIds.some((offerId) => offerId === id) ? 'checked' : '';

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox"
        name="event-offer-${id}" data-event-offer-id="${id}" ${checkStatus}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`);
}).join('');

const createOffersTemplate = (offers, offerIds, type) => {
  const eventOffers = offers.get(type);
  if (!eventOffers.length) {
    return '';
  }

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferItemTemplate(offers.get(type), offerIds)}
      </div>
    </section>`
  );
};

const createDestinationPickerTemplate = (type, destination, destinations = []) => {
  const [labelId, listId] = [nanoid(), nanoid()];
  const optionString = destinations.values().reduce((accumulator, { name }) => `${accumulator}<option value="${name}"></option>`, '');

  return (`
    <div div class="event__field-group  event__field-group--destination" >
      <label class="event__label  event__type-output" for="event-destination-${labelId}">${type}</label>
      <input class="event__input  event__input--destination" id="event-destination-${labelId}" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-${listId}">
      <datalist id="destination-list-${listId}">
          ${optionString}
      </datalist>
    </div>`
  );
};

const createPicturesTemplate = (pictures = []) => pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');

const createDestinationsTemplate = ({ id, description, pictures } = {}) => {
  const isRenderNeed = id && (pictures.length || description);
  if (!isRenderNeed) {
    return '';
  }

  return (`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ''}
      ${(pictures.length > 0) ? `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPicturesTemplate(pictures)}
        </div>
      </div>` : ''}
    </section>`
  );
};

const createEventTimeTemplate = (dateStart, dateEnd) => {
  const id = nanoid();

  return (`
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From</label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">To</label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateEnd}">
    </div>`
  );
};

const createEventPriceTemplate = (price) => {
  const id = nanoid();

  return (`
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
    </div>`
  );
};

const createRollUpButtonTemplate = (mode) => (mode === FormMode.EDIT) ? (`
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Close event</span>
  </button>`) : '';

const createFormTemplate = (event, destinations, offers, mode) => {
  const {
    id,
    basePrice,
    dateFrom,
    dateTo,
    destinationId,
    offerIds,
    type,
    isDeleting,
    isDisabled,
    isSaving,
  } = event || {};

  const dateEnd = dayjs(dateTo).format(DateFormat.FORM_START);
  const dateStart = dayjs(dateFrom).format(DateFormat.FORM_START);
  const destination = destinations.get(destinationId);

  const submitButtonText = isSaving ? ButtonText.SAVING : ButtonText.SAVE;
  let exitButtonText = ButtonText.CANCEL;
  if (mode === FormMode.EDIT) {
    exitButtonText = isDeleting ? ButtonText.DELETING : ButtonText.DELETE;
  }
  const disableStatus = isDisabled ? 'disabled' : '';

  const typePickerTemplate = createTypePickerTemplate(type, offers);
  const destinationPickerTemplate = createDestinationPickerTemplate(type, destination, destinations);
  const offersTemplate = createOffersTemplate(offers, offerIds, type);
  const destinationsTemplate = createDestinationsTemplate(destination);
  const eventTimeTemplate = createEventTimeTemplate(dateStart, dateEnd);
  const eventPriceTemplate = createEventPriceTemplate(basePrice);
  const rollUpButtonTemplate = createRollUpButtonTemplate(mode);

  return (`
    <li class="trip-events__item" data-event-id = ${id}>
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
            ${typePickerTemplate}
          </div>

          ${destinationPickerTemplate}
          ${eventTimeTemplate}
          ${eventPriceTemplate}

          <button class="event__save-btn  btn  btn--blue" type="submit" ${disableStatus}>${submitButtonText}</button>
          <button class="event__reset-btn" type="reset" ${disableStatus}>${exitButtonText}</button>
          ${rollUpButtonTemplate}
        </header>

        ${(destinationsTemplate || offersTemplate) ? `
          <section class="event__details">
            ${offersTemplate}
            ${destinationsTemplate}
          </section>` : ''}
      </form>
    </li>`
  );
};

export default class FormView extends AbstractStatefulView {
  /** @type {Map<EventType, Offer[]>} */
  #offers = null;
  /** @type {Map<Id, Destination>} */
  #destinations = null;
  #mode = FormMode.EDIT;
  #onFormSubmitCallback = null;
  #onFormDeleteCallback = null;

  #destinationInputValue = '';
  #datePickerFrom = null;
  #datePickerTo = null;
  #saveButton = null;

  constructor(event, offers, destinations, mode = FormMode.EDIT) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#mode = mode;
    this._setState(this.#parseEventToState({ ...event, isFirstLoad: true, }));
    this._restoreHandlers();
    this._setState({ isFirstLoad: false });
  }

  get template() {
    return createFormTemplate(this._state, this.#destinations, this.#offers, this.#mode);
  }

  _restoreHandlers = () => {
    this.createEventListener(this.element.firstElementChild, 'submit', this.#formSubmitHandler, { isPreventDefault: true });
    this.createEventListener(this.element.firstElementChild, 'reset', this.#formResetHandler, { isPreventDefault: true });
    this.createEventListener(this.element.firstElementChild, 'click', this.#offerClickHandler);
    this.createEventListener('.event__type-list', 'change', this.#eventTypeChangeHandler);

    this.createEventListener('.event__input--destination', 'input', this.#destinationInputHandler);
    this.createEventListener('.event__input--destination', 'change', this.#destinationChangeHandler);
    this.createEventListener('.event__input--destination', 'focus', this.#destinationFocusHandler);
    this.createEventListener('.event__input--destination', 'blur', this.#destinationBlurHandler);

    this.createEventListener('.event__input--price', 'input', this.#priceInputHandler);
    this.createEventListener('.event__input--price', 'change', this.#priceChangeHandler);

    this.createEventListener('[name="event-start-time"]', 'keydown', this.#timePickerKeyDownHandler);
    this.createEventListener('[name="event-end-time"]', 'keydown', this.#timePickerKeyDownHandler);

    this.#initDatepicker();
    this.#initSaveButton();
  };

  removeElement() {
    super.removeElement();
    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  reset = (event) => {
    this.updateElement(this.#parseEventToState(event));
  };

  setOnFormSubmitHandler = (callback) => {
    this.#onFormSubmitCallback = callback;
    return this;
  };

  setOnFormDeleteHandler = (callback) => {
    this.#onFormDeleteCallback = callback;
    return this;
  };

  #timePickerKeyDownHandler = (evt) => {
    if (evt.key === KeyCode.DELETE) {
      evt.stopImmediatePropagation();
    }
  };

  #eventTypeChangeHandler = (evt) => {
    const parent = evt.target.closest('.event__type-item');
    if (!parent) {
      return;
    }

    const type = parent.dataset.eventType;
    if (type === this._state.type) {
      return;
    }

    this.updateElement({ offerIds: [], type });
  };

  #priceInputHandler = ({ target }) => {
    target.value = ((+target.value) > EVENT_MAX_PICE) ? EVENT_MAX_PICE : target.value.replace(/^0+|\D+/g, '');
  };

  #priceChangeHandler = ({ target }) => {
    const newPrice = target.value ? target.value : tripDefault.basePrice;
    this._setState({ basePrice: newPrice });
    target.value = newPrice;
  };

  #destinationFocusHandler = ({ target }) => {
    this.#destinationInputValue = target.value;
    target.value = '';
  };

  #destinationInputHandler = ({ target }) => {
    target.blur();
  };

  #destinationChangeHandler = ({ target }) => {
    const name = target.value;
    for (const item of this.#destinations.values()) {
      if ((item.name === name) && (this.#destinationInputValue !== name)) {
        this.updateElement({ destinationId: item.id });
        return;
      }
    }
    target.value = '';
  };

  #destinationBlurHandler = ({ target }) => {
    if (target.value === '') {
      target.value = this.#destinationInputValue;
    }
  };

  #offerClickHandler = ({ target }) => {
    if (!target.matches('.event__offer-checkbox')) {
      return;
    }

    const offersIds = new Set(this._state.offerIds);
    const newOfferId = target.dataset.eventOfferId;

    if (target.checked && newOfferId) {
      offersIds.add(newOfferId);
    } else {
      offersIds.delete(newOfferId);
    }

    this._setState({ offerIds: [...offersIds] });
  };

  #formSubmitHandler = () => {
    this.updateElement({ isSaving: true, isDisabled: true });
    this.#onFormSubmitCallback?.(this.#parseStateToEvent(this._state));
  };

  #formResetHandler = () => {
    this.updateElement({ isDeleting: true, isDisabled: true });
    this.#onFormDeleteCallback?.(this.#parseStateToEvent(this._state));
  };

  #datePickerOpenHandler = () => {
    this.#saveButton.disabled = true;
  };

  #datePickerCloseHandler = () => {
    this.#saveButton.disabled = false;
  };

  #initSaveButton = () => {
    if (this.#saveButton) {
      return;
    }

    this.#saveButton = this.element.querySelector('.event__save-btn');
  };

  #datePickerFromCloseHandler = ([date = this._state.dateTo]) => {
    date = new Date(date).toISOString();
    this.#datePickerTo.set('minDate', date);
    this._setState({ dateFrom: date });

    if (!this.#datePickerTo.input.value) {
      this.#datePickerTo.setDate(date);
      this.#datePickerToCloseHandler([date]);
    }
  };

  #datePickerToCloseHandler = ([date = this._state.dateFrom]) => {
    date = new Date(date).toISOString();
    this._setState({ dateTo: date });
    this.#datePickerFrom.set('maxDate', date);

    if (!this.#datePickerFrom.input.value) {
      this.#datePickerFrom.setDate(date);
      this.#datePickerFromCloseHandler(date);
    }
  };

  #getDatePickerConfig = () => ({
    allowInput: false,
    enableTime: true,
    dateFormat: DateFormat.FORM_INPUT,
    minuteIncrement: 1,
    locale: {
      firstDayOfWeek: 1,
    },
    'time_24hr': true,
    onOpen: this.#datePickerOpenHandler,
    onChange: this.#timePickerKeyDownHandler,
  });

  #initDatepicker = () => {

    const [inputFrom, inputTo] = this.element.querySelectorAll('.event__input--time');

    this.#datePickerFrom = flatpickr(
      inputFrom,
      {
        ...this.#getDatePickerConfig(),
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: [this.#datePickerFromCloseHandler, this.#datePickerCloseHandler],
      },
    );

    this.#datePickerTo = flatpickr(
      inputTo,
      {
        ...this.#getDatePickerConfig(),
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: [this.#datePickerToCloseHandler, this.#datePickerCloseHandler],
      },
    );

    if (this._state.isFirstLoad && (this.#mode === FormMode.CREATE)) {
      this.#datePickerTo.clear();
      this.#datePickerFrom.clear();
    }
  };

  #parseEventToState = (event) => ({
    ...event,
    isSaving: false,
    isDeleting: false,
    isDisabled: false,
  });

  #parseStateToEvent = (state) => {
    delete state.isSaving;
    delete state.isDeleting;
    delete state.isDisabled;
    delete state.isFirstLoad;

    return state;
  };
}

