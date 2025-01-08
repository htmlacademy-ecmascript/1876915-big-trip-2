import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getDuration = (timeStart, timeEnd) => {
  const [start, end] = [dayjs(timeStart), dayjs(timeEnd)];
  const { days, hours, minutes } = dayjs.duration(end.diff(start)).$d;

  return [start, end, `${days ? `${days}D`.padStart(3, '0') : ''} ${hours ? `${hours}H`.padStart(3, '0') : ''} ${minutes ? `${minutes}M`.padStart(3, '0') : ''}`];
};

export const capitalizeFirstLetter = (string) => string?.replace(/^./i, (char) => char.toUpperCase());
