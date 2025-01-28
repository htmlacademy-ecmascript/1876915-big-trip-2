import { FilterType } from '../const';

const isEventExpired = (event) => new Date(event.dateTo) < new Date();
const isEventFuture = (event) => new Date(event.dateFrom) > new Date();
const isEventPresent = (event) => {
  const currentDate = new Date();
  return (new Date(event.dateFrom) <= currentDate) && (new Date(event.dateTo) >= currentDate);
};

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter(isEventFuture),
  [FilterType.PRESENT]: (events) => events.filter(isEventPresent),
  [FilterType.PAST]: (events) => events.filter(isEventExpired),
};

export const filterEvents = (events, filterType) => (filter[filterType])(events);

export const createFilters = (events) => Object.entries(filter).map(
  ([filterType, filterMethod]) => ({
    type: filterType,
    count: filterMethod(events).length,
  })
);
