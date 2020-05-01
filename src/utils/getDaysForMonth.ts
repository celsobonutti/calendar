import {
  eachDayOfInterval,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSunday,
  isSaturday,
} from 'date-fns';

interface DaysForMonthArguments {
  year: number;
  month: number;
}

export const getDaysForMonth = ({ year, month }: DaysForMonthArguments) => {
  const initialDate = new Date(year, month-1);

  let firstDay = startOfMonth(initialDate);

  if (!isSunday(firstDay)) {
    firstDay = startOfWeek(firstDay);
  }

  let lastDay = endOfMonth(initialDate);

  if (!isSaturday(lastDay)) {
    lastDay = endOfWeek(lastDay);
  }

  const days = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  return days;
};
