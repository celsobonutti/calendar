import React from 'react';
import styled from 'styled-components';

import { Reminder } from '../../types';

const Container = styled.div`
  border: 1px solid black;
`;

interface DayProps {
  day: Date;
}

export const Day = ({day}: DayProps) => {

  return <Container></Container>;
};
