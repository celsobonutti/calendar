import React from 'react';
import { Reminder } from '../../types';
import styled from 'styled-components';
import { format } from 'date-fns';

interface ReminderContainerProps {
  color: string;
}

const ReminderContainer = styled.div<ReminderContainerProps>`
  margin-bottom: 0.5em;

  padding: 0.5em;

  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

interface ReminderProps {
  reminder: Reminder;
  onClick: Function;
}

export const ReminderCard = ({ reminder, onClick }: ReminderProps) => {
  return (
    <ReminderContainer color={reminder.color} onClick={() => onClick()}>
      <h4>{format(reminder.datetime, 'HH:mm')}</h4>
      <p>{reminder.title}</p>
    </ReminderContainer>
  );
};
