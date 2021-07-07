import { useEffect, useState } from 'react';

import { CurrentTime } from '../../../ui/atoms';

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const getFormattedNumber = (number) => (number < 10 ? `0${number}` : number);

export const Time = () => {
  const [date, setDate] = useState(new Date());
  const dayOfWeek = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' })
    .format(date)
    .slice(0, 2)
    .split('')
    .map((item, i) => (i === 0 ? item.toUpperCase() : item))
    .join('')
    .toString();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <CurrentTime
      currentDay={`${dayOfWeek}, ${day} ${month} ${year}`}
      currentTime={`${getFormattedNumber(date.getHours())}:${getFormattedNumber(date.getMinutes())}:${getFormattedNumber(date.getSeconds())}`}
    />
  );
};
