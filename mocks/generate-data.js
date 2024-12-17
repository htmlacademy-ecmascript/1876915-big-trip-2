import { mix } from '../src/utils';
import { DESTINATIONS } from './destination';
import { OFFERS } from './offer';
import { POINTS } from './point';

const EVENT_QUANTITY = 5;

export const generateTripData = (quantity = EVENT_QUANTITY) => [mix(POINTS, quantity), OFFERS, DESTINATIONS];

