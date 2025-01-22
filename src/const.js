export const DateFormat = {
  EVENT_DEFAULT: 'YYYY-MM-DD',
  EVENT_HUMAN: 'MMM DD',
  EVENT_START: 'YYYY-MM-DDTHH:mm',
  EVENT_TIME: 'HH:mm',
  FORM_START: 'YY/MM/DD HH:mm',
  INFO_HUMAN: 'DD MMM',
  INFO_SHORT_HUMAN: 'DD',
  FORM_INPUT: 'd/m/y H:i',
};

export const EventMode = {
  DEFAULT: 'default',
  FORM: 'form',
};

export const FormMode = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const EventListMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
  LOADING: 'Loading...'
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offers',
};

export const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export const tripDefault = {
  basePrice: 0,
  isFavorite: false,
  offerIds: [],
  type: 'flight',
};

export const ElementSelectors = {
  ROLL_UP_BUTTON: '.event__rollup-btn',
  EVENT_ITEM: '.trip-events__item',
};

export const ButtonText = {
  CANCEL: 'Cancel',
  CREATE: 'New Event',
  SAVE: 'Save',
  SAVING: 'Saving...',
  DELETE: 'Delete',
  DELETING: 'Deleting...',
};

export const TripTitleQuantity = {
  MIN: 1,
  MAX: 3,
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  CANCEL_EVENT: 'CANCEL_EVENT',
  CREATE_EVENT: 'CREATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  FILTER: 'FILTER',
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
