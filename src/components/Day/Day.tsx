import React, { useContext } from 'react';
import styled from 'styled-components';
import { format, getDate, isWeekend } from 'date-fns';

import { ReminderContext } from '../../stores/reminders/reminders';
import { CompactReminder } from '../Reminders/CompactReminder';

interface ContainerProps {
  outOfWeek: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;
  height: 8em;

  background-color: ${props => props.outOfWeek ? '#F2F2F2' : 'white'};
`;

const Date = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;

  color: ${(props) => props.color};
`;

interface DayProps {
  day: Date;
  outOfMonth: boolean;
}

export const Day = ({ day, outOfMonth }: DayProps) => {
  const { getDateReminders } = useContext(ReminderContext);

  const dayReminders = getDateReminders(day);

  const weekend = isWeekend(day);

  let color = 'black';

  if (outOfMonth) {
    color = '#ACACAC';
  } else if (weekend) {
    color = 'darkblue';
  }
  
  return (
    <Container outOfWeek={weekend || outOfMonth}>
      <Date color={color}>
        <time dateTime={format(day, 'EEEE, MMM do, yyyy')}>{getDate(day)}</time>
      </Date>
      {dayReminders.map((reminder) => (
        <CompactReminder reminder={reminder} />
      ))}
    </Container>
  );
};
