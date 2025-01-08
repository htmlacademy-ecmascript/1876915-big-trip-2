import { SortType } from '../const';

const sortByDate = (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom);
const sortByPrice = (a, b) => b.basePrice - a.basePrice;
const sortByDuration = (a, b) => {
  const durationA = Math.abs(new Date(a.dateFrom) - new Date(a.dateTo));
  const durationB = Math.abs(new Date(b.dateFrom) - new Date(b.dateTo));
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
