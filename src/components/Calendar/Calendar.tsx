import React from 'react';
import { eachDayOfInterval } from 'date-fns';
import { endOfMonth } from 'date-fns/fp';

import { Week, Weekdays } from '../../components';
import styled from 'styled-components';

const Table = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 1500px;
`;

const days = eachDayOfInterval({
  start: new Date(2020, 4, 1),
  end: new Date(),
});

const subDays = days.slice(0, 7);

interface CalendarProps {
  year: number;
  month: number;
}

export const Calendar = ({ year, month }: CalendarProps) => {
  const date = new Date(year, month);

  const days = eachDayOfInterval({
    start: date,
    end: endOfMonth(date),
  });

  return (
    <Table role="table" aria-label="Calendar">
      <Weekdays />
      
    </Table>
  );
};
