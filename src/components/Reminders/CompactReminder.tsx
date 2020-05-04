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
  text-overflow: ellipsis;

  width: 100%;
  background-color: ${(props) => props.color};
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  margin: 0.4em;
`;

const Time = styled.small`
  font-weight: bold;
  font-size: 0.6em;

  margin: 0.4em;
  margin-bottom: 0;
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
