import React, { useState } from 'react';
import styled from 'styled-components';

import { Calendar, Modal, ReminderForm } from '../../components';
import { useToggler } from '../../hooks/useToggler';

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
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { setFalse: hideModal, setTrue: showModal, state: isModalShown } = useToggler(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

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
      {isModalShown && (
        <Modal hideModal={hideModal}>
          <ReminderForm />
        </Modal>
      )}
      <SelectorContainer>
        <div>
          <label htmlFor="year">Year: </label>
          <input
            name="Year"
            value={year}
            onChange={(e) => {
              selectYear(e.target.valueAsNumber);
            }}
            type="number"
          />
        </div>
        <div>
          <label htmlFor="month">Month: </label>
          <input
            name="month"
            value={month}
            onChange={(e) => {
              selectMonth(e.target.valueAsNumber);
            }}
            type="number"
          />
        </div>
      </SelectorContainer>

      <Calendar
        onDayClick={(date) => {
          setSelectedDate(date);
          showModal();
        }}
        year={year}
        month={month}
      />
    </Container>
  );
};
