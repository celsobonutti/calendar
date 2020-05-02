import React, { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 2em;
`;

export const CalendarPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const selectMonth = (value: number) => {
    if (value > 12) {
      setMonth(1);
    } else if (value < 0) {
      setMonth(12);
    } else {
      setMonth(value);
    }
  };

  const selectYear = (value: number) => {
    setYear(value);
  };

  return (
    <Container>
      <SelectorContainer>
        <div>
          <label>Year: </label>
          <input
            value={year}
            onChange={(e) => {
              selectYear(e.target.valueAsNumber);
            }}
            type="number"
          />
        </div>
        <div>
          <label>Month: </label>
          <input
            value={month}
            onChange={(e) => {
              selectMonth(e.target.valueAsNumber);
            }}
            type="number"
          />
        </div>
      </SelectorContainer>

      <Calendar year={year} month={month} />
    </Container>
  );
};
