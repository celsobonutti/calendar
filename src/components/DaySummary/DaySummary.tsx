import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { format } from 'date-fns';
//@ts-ignore
import Delete from '@bit/feathericons.react-feather.trash-2';

import { useReminderContext } from '../../stores/reminders/reminders';
import { Reminder } from '../../types';
import { ReminderForm } from '../ReminderForm/ReminderForm';
import { ReminderCard } from './Reminder';
import { AddButton } from '../UI/AddButton';
import { Confirmation } from '../UI/Confirmation';
import { useToggler } from '../../hooks/useToggler';
import { theme } from '../../utils/theme';

const Container = styled.div`
`;

interface DaySummaryProps {
  date: Date;
}

const H3 = styled.h3`
  margin: 1em 0;
  font-weight: normal;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 3em;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.2em 0.4em;

  font-size: 0.8em;
  font-weight: bold;
  color: white;

  background-color: ${theme.cancelColor};

  &:hover {
    background-color: ${theme.cancelDarken};
  }

  &[disabled] {
    cursor: initial;
    background-color: #cecece;
  }
`;

export const DaySummary = ({ date }: DaySummaryProps) => {
  const { getDateReminders, removeReminder, deleteAllDayReminders } = useReminderContext();
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [deletingReminder, setDeletingReminder] = useState<Reminder | null>(null);
  const {
    state: isDeletingAll,
    setTrue: showDeletingConfirmation,
    setFalse: hideDeletingConfirmation,
  } = useToggler(false);
  const { state: isAddingNew, setTrue: showCreationForm, setFalse: hideCreationForm } = useToggler(
    false
  );

  if (isAddingNew) {
    return (
      <Container>
        <ReminderForm startingDate={date} onFormSubmitted={hideCreationForm} />
        <CancelButton onClick={hideCreationForm}>Cancel</CancelButton>
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

  let content =
    reminders.length === 0
      ? 'There are no appointments for this day.'
      : 'These are your appointments:';

  return (
    <Container>
      {deletingReminder && (
        <Confirmation
          onConfirm={() => {
            removeReminder(deletingReminder.id);
            setDeletingReminder(null);
          }}
          onCancel={() => setDeletingReminder(null)}
          text={`You are going to delete ${deletingReminder.title}. Are you sure?`}
        />
      )}
      {isDeletingAll && (
        <Confirmation
          onConfirm={() => {
            deleteAllDayReminders(date);
            hideDeletingConfirmation();
          }}
          onCancel={hideDeletingConfirmation}
          text="You are going to delete every reminder for this day. Are you sure?"
        />
      )}
      <h1>{format(date, 'EEEE, MMM do, yyyy')}</h1>
      <H3>{content}</H3>
      <div data-cy="day-reminders">
        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            reminder={reminder}
            onClickEdit={() => {
              setEditingReminder(reminder);
            }}
            onClickDelete={() => {
              setDeletingReminder(reminder);
            }}
          />
        ))}
      </div>
      <ButtonContainer>
        <DeleteButton disabled={reminders.length === 0} onClick={showDeletingConfirmation}>
          <Delete />
          Delete All
        </DeleteButton>
        <AddButton alwaysShowText dataCy="add-reminder" onClick={showCreationForm} />
      </ButtonContainer>
    </Container>
  );
};
