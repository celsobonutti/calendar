import React from 'react';
import styled from 'styled-components/macro';
//@ts-ignore
import ArrowRight from '@bit/feathericons.react-feather.arrow-right-circle';
//@ts-ignore
import ArrowLeft from '@bit/feathericons.react-feather.arrow-left-circle';
import { theme } from '../../utils/theme';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 150px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrentMonth = styled.div`
  font-size: 1.1em;
`;

const CurrentYear = styled.div`
  font-size: 1.2em;
  color: ${theme.primaryColor};
  font-weight: bold;
`;

const Left = styled(ArrowLeft)`
  cursor: pointer;
  flex-shrink: 0;
`;

const Right = styled(ArrowRight)`
  cursor: pointer;
  flex-shrink: 0;
`;

interface MonthSelectorProps {
  onIncrease: Function;
  onDecrease: Function;
  currentMonth: number;
  currentYear: number;
}

export const MonthSelector = ({
  onIncrease,
  onDecrease,
  currentMonth,
  currentYear,
}: MonthSelectorProps) => (
  <Container>
    <Left onClick={onDecrease} />
    <InformationContainer>
      <CurrentMonth data-month={currentMonth}>{months[currentMonth - 1]}</CurrentMonth>
      <CurrentYear data-year={currentYear}>{currentYear}</CurrentYear>
    </InformationContainer>
    <Right onClick={onIncrease} />
  </Container>
);
