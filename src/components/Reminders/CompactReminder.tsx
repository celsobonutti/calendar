import React from 'react';
import { Reminder } from '../../types';
import styled from 'styled-components';

interface ContainerProps {
  color: string;
}

const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.color};
`;

interface CompactReminderProps {
  reminder: Reminder;
}

export const CompactReminder = ({ reminder }: CompactReminderProps) => {
  return (
    <Container color={reminder.color}>
      <p>{reminder.title}</p>
    </Container>
  );
};
