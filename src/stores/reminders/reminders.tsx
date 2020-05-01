import React, { useReducer, Dispatch, FunctionComponent } from 'react';

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

const remindersString = localStorage.getItem('reminders') ?? '[]';

const savedReminders = JSON.parse(remindersString) as Reminder[];

const initialState: ReminderState = {
  reminders: savedReminders,
};

interface ContextType {
  reminders: Reminder[];
}

export const ReminderContext = React.createContext<{
  state: ReminderState;
  dispatch: Dispatch<ReminderAction>;
  add: Function;
  remove: Function;
  edit: Function;
}>({
  state: initialState,
  dispatch: () => null,
  add: () => null,
  remove: () => null,
  edit: () => null,
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

  const value = {
    state,
    dispatch,
    add: addReminder,
    remove: removeReminder,
    edit: editReminder,
  };

  return <ReminderContext.Provider value={value}>{children}</ReminderContext.Provider>;
};
