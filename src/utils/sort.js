import { SortType } from '../const';

const sortByDate = (first, second) => new Date(first.dateFrom) - new Date(second.dateFrom);
const sortByPrice = (first, second) => second.basePrice - first.basePrice;
const sortByDuration = (first, second) => {
  const durationA = Math.abs(new Date(first.dateFrom) - new Date(first.dateTo));
  const durationB = Math.abs(new Date(second.dateFrom) - new Date(second.dateTo));
  return durationB - durationA;
};

const sort = {
  [SortType.DAY]: (events) => events.toSorted(sortByDate),
  [SortType.PRICE]: (events) => events.toSorted(sortByPrice),
  [SortType.TIME]: (events) => events.toSorted(sortByDuration),
  [SortType.EVENT]: () => [],
  [SortType.OFFER]: () => [],
};

export const sortEvents = (events, sortType) => (sort[sortType])(events);

export const createSortItems = (events) => Object.values(SortType).map(
  (type) => ({
    type,
    count: (sort[type])(events).length,
  })
);
