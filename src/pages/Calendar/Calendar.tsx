import React from 'react';
import { Day } from '../../components';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7);
`;

interface Props {}

export const Calendar = () => {
  return <Grid />;
};
