import React, { useContext } from 'react';
import styled from 'styled-components';
import { format, getDate } from 'date-fns';

import { ReminderContext } from '../../stores/reminders/reminders';
import { CompactReminder } from '../Reminders/CompactReminder';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  border: 1px solid black;
`;

interface DayProps {
  day: Date;
}

export const Day = ({ day }: DayProps) => {
  const { getDateReminders } = useContext(ReminderContext);

  const dayReminders = getDateReminders(day);

  return (
    <Container>
      <time dateTime={format(day, 'yyyy-MM-dd')}>{getDate(day)}</time>
      {dayReminders.map((reminder) => (
        <CompactReminder reminder={reminder} />
      ))}
    </Container>
  );
};
