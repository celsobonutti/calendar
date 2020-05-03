import React from 'react';
import { Reminder } from '../../types';
import styled from 'styled-components/macro';

interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  margin-bottom: 0.2em;
 
  border-radius: 2px;
  padding: 0.2em;

  width: 100%;
  background-color: ${(props) => props.color};
`;

const Text = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface CompactReminderProps {
  reminder: Reminder;
}

export const CompactReminder = ({ reminder }: CompactReminderProps) => {
  return (
    <Container color={reminder.color}>
      <Text>{reminder.title}</Text>
    </Container>
  );
};
