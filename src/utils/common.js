import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const mix = (data = [], length = 0) => {
  const mixedData = [];
  while (data.length && length--) {
    const item = Math.round(Math.random() * (data.length - 1));
    mixedData.push(data[item]);
    data.splice(item, 1);
  }

  return mixedData;
};
