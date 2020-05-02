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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;


  position: relative;
  padding: .5em;

  cursor: pointer;

  height: 8em;
  background-color: ${(props) => (props.outOfWeek ? '#DDDDDD' : '#F5F5F5')};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  background-color: white;
  opacity: 0.4;

  &:hover {
    opacity: 0;

    transition: opacity 0.2s ease-in-out;
  }
`;

const DateContainer = styled.div`
  align-self: flex-end;
  margin-bottom: .4em;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background-color: white;
`;

const Date = styled.p`
  font-size: 1em;
  color: ${(props) => props.color};

  ${Container}:hover & {
    font-weight: bold;
    transition: 0.2s linear;
  }
`;

interface DayProps {
  day: Date;
  outOfMonth: boolean;
  onClick: Function;
}

export const Day = ({ day, outOfMonth, onClick }: DayProps) => {
  const { getDateReminders } = useContext(ReminderContext);

  const dayReminders = getDateReminders(day);

  const weekend = isWeekend(day);

  let color = 'black';

  if (outOfMonth) {
    color = '#ACACAC';
  } else if (weekend) {
    color = '#4169E1';
  }

  return (
    <Container
      outOfWeek={weekend || outOfMonth}
      onClick={() => {
        onClick(day);
      }}
    >
      <Overlay />
      <DateContainer>
        <Date color={color}>
          <time dateTime={format(day, 'EEEE, MMM do, yyyy')}>{getDate(day)}</time>
        </Date>
      </DateContainer>
      {dayReminders.map((reminder) => (
        <CompactReminder reminder={reminder} key={reminder.id} />
      ))}
    </Container>
  );
};
