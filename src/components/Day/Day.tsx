import React from 'react';
import styled from 'styled-components';

import { Reminder } from '../../types';

const Container = styled.div`
  border: 1px solid black;
`;
interface DayProps {
  reminders?: Reminder[];
}

export const Day = (props: DayProps) => {
  return <Container></Container>;
};
