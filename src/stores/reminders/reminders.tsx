import React, { useReducer, Dispatch, FunctionComponent } from 'react';
import { isSameDay, isBefore } from 'date-fns';

import { Reminder, ReminderCompanion } from '../../types/index';

import {
  Actions,
  AddReminder,
  EditReminder,
  ReminderAction,
  reminderReducer,
  ReminderState,
  RemoveReminder,
} from './reducers';
import { parseISO } from 'date-fns';

type StringifiedReminder = {
  id: string;
  city: string;
  title: string;
  datetime: string;
  color: string;
};

const remindersString = localStorage.getItem('reminders') ?? '[]';

const parsedReminders = JSON.parse(remindersString) as StringifiedReminder[];

const savedReminders: Reminder[] = parsedReminders.map((reminder) => ({
  ...reminder,
  datetime: parseISO(reminder.datetime),
}));

const initialState: ReminderState = {
  reminders: savedReminders,
};

console.log(savedReminders);

export const ReminderContext = React.createContext<{
  state: ReminderState;
  dispatch: Dispatch<ReminderAction>;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  editReminder: (id: string, newValues: ReminderCompanion) => void;
  getDateReminders: (datetime: Date) => Reminder[];
}>({
  state: initialState,
  dispatch: () => null,
  addReminder: () => null,
  removeReminder: () => null,
  editReminder: () => null,
  getDateReminders: () => [],
});

export const ReminderProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reminderReducer, initialState);

  const addReminder = (reminder: Reminder) => {
    const action: AddReminder = {
      type: Actions.Add,
      reminder,
    };

    dispatch(action);
  };

  const removeReminder = (id: string) => {
    const action: RemoveReminder = {
      type: Actions.Remove,
      id,
    };

    dispatch(action);
  };

  const editReminder = (id: string, newValues: ReminderCompanion) => {
    const action: EditReminder = {
      type: Actions.Edit,
      id,
      newValues,
    };

    dispatch(action);
  };

  const getDateReminders = (datetime: Date) => {
    return state.reminders
      .filter((reminder) => isSameDay(reminder.datetime, datetime))
      .sort((firstElement, secondElement) => {
        if (isBefore(firstElement.datetime, secondElement.datetime)) {
          return -1;
        } else {
          return 1;
        }
      });
  };

  const value = {
    state,
    dispatch,
    addReminder,
    removeReminder,
    editReminder,
    getDateReminders,
  };

  return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>;
};
