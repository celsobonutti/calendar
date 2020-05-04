import React from 'react';
import getMonth from 'date-fns/getMonth';
import styled from 'styled-components/macro';

import { Weekdays } from '../../components';
import { CalendarGrid } from '../UI/Containers';
import { getDaysForMonth } from '../../utils/getDaysForMonth';
import { CalendarDay } from './CalendarDay';

const Table = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #eee;
  overflow: hidden;

  border-radius: 0.3em;
  max-width: 1000px;
  width: 100%;
`;

interface CalendarProps {
  year: number;
  month: number;
  onDayClick: (arg0: Date) => void; 
}

export const Calendar = ({ year, month, onDayClick }: CalendarProps) => {
  const days = getDaysForMonth({ year, month });

  return (
    <Table role="table" aria-label="Calendar">
      <Weekdays />
      <CalendarGrid>
        {days.map((day) => {
          let outOfMonth = getMonth(day) !== (month-1);
          return <CalendarDay day={day} key={day.toString()} outOfMonth={outOfMonth} onClick={onDayClick} />;
        })}
      </CalendarGrid>
    </Table>
  );
};
