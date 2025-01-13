import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { ButtonText, DateFormat, FormType, KeyCode } from '../const';
import { nanoid } from 'nanoid';
import { capitalizeFirstLetter } from '../utils/event';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEventTypeItemTemplate = (eventType, offers) => {
  let list = '';
  for (const type of offers.keys()) {
    const checkStatus = eventType === type ? 'checked' : '';
    list += (`
      <div class="event__type-item" data-event-type="${type}">
        <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checkStatus}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${capitalizeFirstLetter(type)}</label>
      </div>`);
  }

  return list;
};

const createEventTypeListTemplate = (eventType, offers) => (`
  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
        ${createEventTypeItemTemplate(eventType, offers)}
    </fieldset>
  </div>`
);

const createOfferListItemTemplate = (offers, offerIds) => offers.map(({ id, title, price }) => {
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

const createOfferListTemplate = (offers, offerIds) => (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferListItemTemplate(offers, offerIds)}
      </div>
    </section>`
);

const createDestinationListTemplate = (type, destination, destinations = []) => {
  const listId = nanoid();
  let list = '';
  for (const { id, name } of destinations.values()) {
    list += `<option value="${name}" data-destination-id="${id}"></option>`;
  }

  return (`
    <div div class="event__field-group  event__field-group--destination" >
      <label class="event__label  event__type-output" for="event-destination-${destination.id}">${type}</label>
      <input class="event__input  event__input--destination" id="event-destination-${destination.id}" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-${listId}">
      <datalist id="destination-list-${listId}">
          ${list}
      </datalist>
    </div>`
  );
};

const createPicturesTemplate = (pictures = []) => pictures.map(({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`).join('');

const createDestinationTemplate = ({ description, pictures }) => (`
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

const createFormTemplate = (event, destinations, offers, mode) => {
  const {
    id,
    basePrice,
    dateFrom,
    dateTo,
    destinationId,
    offerIds,
    type,
  } = event || {};

  const destination = destinations.get(destinationId);
  const eventOffers = offers.get(type);

  const exitButtonText = mode === FormType.EDIT ? ButtonText.DELETE : ButtonText.CANCEL;
  const submitButtonText = ButtonText.SAVE;
  const eventTypeListTemplate = createEventTypeListTemplate(type, offers);
  const destinationListTemplate = createDestinationListTemplate(type, destination, destinations);

  const offerDetailsListTemplate = (eventOffers.length > 0) ? createOfferListTemplate(offers.get(type), offerIds) : '';
  const destinationTemplate = destinationId && (destination.pictures.length || destination.description) ? createDestinationTemplate(destination) : '';

  const dateStart = dayjs(dateFrom).format(DateFormat.FORM_START);
  const dateEnd = dayjs(dateTo).format(DateFormat.FORM_START);
  const price = (basePrice > 0) ? basePrice : '';

  const eventTimeTemplate = createEventTimeTemplate(dateStart, dateEnd);
  const eventPriceTemplate = createEventPriceTemplate(price);

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
            ${eventTypeListTemplate}
          </div>

          ${destinationListTemplate}
          ${eventTimeTemplate}
          ${eventPriceTemplate}

          <button class="event__save-btn  btn  btn--blue" type="submit">${submitButtonText}</button>
          <button class="event__reset-btn" type="reset">${exitButtonText}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Close event</span>
          </button>
        </header>

        ${(destinationTemplate || offerDetailsListTemplate) ? `
          <section class="event__details">
            ${offerDetailsListTemplate}
            ${destinationTemplate}
          </section>` : ''}
      </form>
    </li>`
  );
};

export default class FormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #destinationNames = [];
  #mode = FormType.EDIT;
  #onFormSubmitCallback = null;
  #onOfferClickCallback = null;

  #destinationInputValue = '';
  #datepicker = null;

  constructor(event, offers, destinations, mode = FormType.EDIT) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#destinationNames = Array.from(destinations.values()).map((item) => item.name);
    this.#mode = mode in FormType ? mode : FormType.EDIT;
    this._setState(event);
    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(this._state, this.#destinations, this.#offers, this.#mode);
  }

  _restoreHandlers = () => {
    this.createEventListener(this.element.firstElementChild, 'keydown', this.#formEnterKeyHandler);
    this.createEventListener(this.element.firstElementChild, 'submit', this.#formSubmitHandler, { isPreventDefault: true });
    this.createEventListener(this.element.firstElementChild, 'click', this.#offerClickHandler);
    this.createEventListener('.event__type-list', 'change', this.#eventTypeChangeHandler);

    this.createEventListener('.event__input--destination', 'input', this.#inputDestinationInputHandler);
    this.createEventListener('.event__input--destination', 'change', this.#inputDestinationChangeHandler);
    this.createEventListener('.event__input--destination', 'focus', this.#inputDestinationFocusHandler);
    this.createEventListener('.event__input--destination', 'blur', this.#inputDestinationBlurHandler);
  };

  removeElement() {
    super.removeElement();
    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  setOnFormSubmitHandler = (callback) => {
    this.#onFormSubmitCallback = callback;
  };

  setOnOfferClickHandler = (callback) => {
    this.#onOfferClickCallback = callback;
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

  #inputDestinationFocusHandler = ({ target }) => {
    this.#destinationInputValue = target.value;
    target.value = '';
  };

  #inputDestinationInputHandler = ({ target }) => {
    target.blur();
  };

  #inputDestinationChangeHandler = ({ target }) => {
    const isUpdateNeed = this.#destinationNames.includes(target.value) && (target.value !== this.#destinationInputValue);
    const option = this.element.querySelector(`option[value="${target.value}"]`);

    if (isUpdateNeed && option) {
      this.updateElement({ destinationId: option.dataset.destinationId });
    }
  };

  #inputDestinationBlurHandler = ({ target }) => {
    if (!this.#destinationNames.includes(target.value)) {
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

  #formEnterKeyHandler = (evt) => {
    if (!evt.target.matches('.event__save-btn') && (evt.key === KeyCode.ENTER)) {
      evt.preventDefault();
    }
  };

  #formSubmitHandler = () => {
    this.#onFormSubmitCallback?.(this._state);
  };

  #setDatepicker() {
    if (this.#mode === FormType.EDIT) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      // this.#datepicker = flatpickr(
      //   this.element.querySelector('.card__date'),
      //   {
      //     dateFormat: 'j F',
      //     defaultDate: this._state.dueDate,
      //     onChange: this.#dueDateChangeHandler, // На событие flatpickr передаём наш колбэк
      //   },
      // );
    }
  }
}

