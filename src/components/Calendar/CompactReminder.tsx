import React from 'react';
import styled from 'styled-components/macro';
import format from 'date-fns/format';

import { Reminder } from '../../types';
interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  margin-bottom: 0.2em;
  border-radius: 2px;

  overflow: hidden;
  white-space: nowrap;

  background-color: ${(props) => props.color};
`;

const Time = styled.p`
  font-weight: bold;
  font-size: 0.6em;

  margin: 0.4em;
  margin-bottom: 0;
`;

const Text = styled.p`
  font-size: 0.8rem;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  margin: 0.4em;
  margin-top: 0;
`;

interface CompactReminderProps {
  reminder: Reminder;
}

export const CompactReminder = ({ reminder }: CompactReminderProps) => {
  return (
    <Container color={reminder.color}>
      <Time>{format(reminder.datetime, 'hh:mm a')}</Time>
      <Text>{reminder.title}</Text>
    </Container>
  );
};
