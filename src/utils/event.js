import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getDuration = (timeStart, timeEnd) => {

  const [start, end] = [dayjs(timeStart), dayjs(timeEnd)];
  const { hours, minutes } = dayjs.duration(end.diff(start)).$d;
  const days = end.diff(start, 'day');
  const minutesString = `${minutes}M`.padStart(3, '0');

  if (days) {
    return [start, end, `${`${days}D`.padStart(3, '0')} ${`${hours}H`.padStart(3, '0')} ${minutesString}`];
  }

  return [start, end, `${hours ? `${hours}H`.padStart(3, '0') : ''} ${minutesString}`];
};

export const capitalizeFirstLetter = (string) => string?.replace(/^./i, (char) => char.toUpperCase());
