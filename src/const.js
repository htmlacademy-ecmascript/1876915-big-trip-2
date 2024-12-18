export const EventStates = {
  PREVENT_DEFAULT: true,
  EVENT_DEFAULT: false,
};

export const FormMode = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const DateFormat = {
  EVENT_DEFAULT: 'YYYY-MM-DD',
  EVENT_HUMAN: 'MMM DD',
  EVENT_START: 'YYYY-MM-DDTHH:mm',
  EVENT_TIME: 'HH:mm',
  FORM_START: 'YY/MM/DD HH:mm'
};

export const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

export const TripDefault = {
  PRICE: 0,
  TYPE: 'flight',
  DESTINATION: null,
  IS_FAVORITE: false,
  OFFERS: [],
};
