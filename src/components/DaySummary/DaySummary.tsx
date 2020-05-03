import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';

import { useReminderContext } from '../../stores/reminders/reminders';
import { Reminder } from '../../types';
import { ReminderForm } from '../ReminderForm/ReminderForm';
import { ReminderCard } from './Reminder';
import { AddButton } from '../UI/AddButton';

const Container = styled.div`
  padding: 1em 0px;
`;

interface DaySummaryProps {
  date: Date;
}

const H3 = styled.h3`
  margin-bottom: 0.5em;
`;

const CancelButton = styled.button`
  margin-top: 0.2em;

  width: 100%;
  height: 30px;
  background-color: white;

  border: none;

  cursor: pointer;

  font-size: 1em;
  color: #ec5163;
`;

const AddReminderButton = styled(AddButton)`
  margin-left: automatic;
`;

export const DaySummary = ({ date }: DaySummaryProps) => {
  const { getDateReminders, removeReminder } = useReminderContext();
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  if (isAddingNew) {
    return (
      <Container>
        <ReminderForm startingDate={date} onFormSubmitted={() => setIsAddingNew(false)} />
        <CancelButton onClick={() => setIsAddingNew(false)}>Cancel</CancelButton>
      </Container>
    );
  }

  if (editingReminder) {
    return (
      <Container>
        <ReminderForm reminder={editingReminder} onFormSubmitted={() => setEditingReminder(null)} />
        <CancelButton onClick={() => setEditingReminder(null)}>Cancel</CancelButton>
      </Container>
    );
  }

  const reminders = getDateReminders(date);

  let content;

  if (reminders.length === 0) {
    content = <H3>There are no appointments for this day.</H3>;
  } else {
    content = (
      <>
        <H3>These are your appointments:</H3>
        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onClickEdit={() => {
              setEditingReminder(reminder);
            }}
            onClickDelete={() => {
              removeReminder(reminder.id);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <Container>
      <h1>{format(date, 'EEEE, MMM do, yyyy')}</h1>
      {content}
      <AddReminderButton alwaysShowText onClick={() => setIsAddingNew(true)} />
    </Container>
  );
};
