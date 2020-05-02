import React from 'react';

import { Weekdays } from '../../components';
import styled from 'styled-components';
import { CalendarGrid } from '../UI/UI';
import { getDaysForMonth } from '../../utils/getDaysForMonth';
import { Day } from '../Day/Day';
import { getMonth } from 'date-fns';

const Table = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #eee;
  overflow: hidden;

  border-radius: 0.3em;
  width: 100%;
  max-width: 800px;
`;

interface CalendarProps {
  year: number;
  month: number;
}

export const Calendar = ({ year, month }: CalendarProps) => {
  const days = getDaysForMonth({ year, month });

  return (
    <Table role="table" aria-label="Calendar">
      <Weekdays />
      <CalendarGrid>
        {days.map((day) => {
          let outOfMonth = getMonth(day) !== (month-1);
          return <Day day={day} key={day.toString()} outOfMonth={outOfMonth} />;
        })}
      </CalendarGrid>
    </Table>
  );
};
