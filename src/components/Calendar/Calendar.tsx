import React from 'react';

import { Weekdays } from '../../components';
import styled from 'styled-components';
import { CalendarGrid } from '../UI/UI';
import { getDaysForMonth } from '../../utils/getDaysForMonth';
import { Day } from '../Day/Day';

const Table = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1500px;
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
      <CalendarGrid numberOfRows={4}>
        {days.map((day) => (
          <Day day={day} key={day.toString()} />
        ))}
      </CalendarGrid>
    </Table>
  );
};
