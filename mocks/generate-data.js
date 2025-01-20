import { mix } from '../src/utils/common';
import { getDestinationMocks } from './destination';
import { getOfferMocks } from './offer';
import { getPointMocks } from './point';

const EVENT_QUANTITY = 1;

export const generateTripData = (quantity = EVENT_QUANTITY) => [mix(getPointMocks(), quantity), getOfferMocks(), getDestinationMocks()];

