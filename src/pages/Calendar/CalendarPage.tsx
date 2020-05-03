import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Calendar, DaySummary, Modal, ReminderForm, MonthSelector } from '../../components';
import { useToggler } from '../../hooks/useToggler';
import { AddButton } from '../../components/UI/AddButton';
import { device } from '../../utils/layout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2em;

  @media ${device.desktop} {
    padding: 0px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  max-width: 900px;

  margin: 1em 0px;
`;

const AddReminderContainer = styled.div`
  position: absolute;
  right: 10px;
`;

export const CalendarPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const { setFalse: hideModal, setTrue: showModal, state: isModalShown } = useToggler(false);
  const [selectedDate, setSelectedDate] = useState<null | Date>(null);

  const increaseYear = () => {
    setYear((currentYear) => currentYear + 1);
  };

  const decreaseYear = () => {
    if (year > 0) {
      setYear((currentYear) => currentYear - 1);
    }
  };

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      increaseYear();
    } else {
      setMonth((currentMonth) => currentMonth + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      decreaseYear();
    } else {
      setMonth((currentMonth) => currentMonth - 1);
    }
  };

  return (
    <Container>
      {isModalShown && (
        <Modal hideModal={hideModal}>
          {selectedDate ? (
            <DaySummary date={selectedDate} />
          ) : (
            <ReminderForm onFormSubmitted={hideModal} />
          )}
        </Modal>
      )}
      <HeaderContainer>
        <MonthSelector
          currentMonth={month}
          currentYear={year}
          onIncrease={increaseMonth}
          onDecrease={decreaseMonth}
        />
        <AddReminderContainer data-cy="add-reminder-general">
          <AddButton
            onClick={() => {
              showModal();
              setSelectedDate(null);
            }}
          />
        </AddReminderContainer>
      </HeaderContainer>
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
