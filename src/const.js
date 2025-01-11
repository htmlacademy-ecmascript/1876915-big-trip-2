export const DateFormat = {
  EVENT_DEFAULT: 'YYYY-MM-DD',
  EVENT_HUMAN: 'MMM DD',
  EVENT_START: 'YYYY-MM-DDTHH:mm',
  EVENT_TIME: 'HH:mm',
  FORM_START: 'YY/MM/DD HH:mm',
  INFO_HUMAN: 'DD MMM',
  INFO_SHORT_HUMAN: 'DD',
};

export const EventMode = {
  DEFAULT: false,
  EDIT: true,
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
};

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offers',
};

export const FormType = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const KeyCode = {
  ESC: 'Escape',
  ENTER: 'Enter',
};

export const tripDefault = {
  basePrice: 0,
  destination: null,
  isFavorite: false,
  offers: [],
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
