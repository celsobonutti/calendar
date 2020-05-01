import React from 'react';

import { Reminder } from '../types/index';

const remindersString = localStorage.getItem('reminders') ?? '[]';

const reminders = JSON.parse(remindersString) as Reminder[];

interface ReminderState {
  reminders: Reminder[];
}

const initialState: ReminderState = {
  reminders,
};

enum Actions {
  Add,
  Remove,
  Edit,
}

interface AddReminder {
  type: Actions.Add;
  reminder: Reminder;
}

interface RemoveReminder {
  type: Actions.Remove;
  id: number;
}

interface EditReminder {
  type: Actions.Edit;
  id: number;
  reminder: Reminder;
}

type ReminderAction = AddReminder | RemoveReminder | EditReminder;

const reducer = (state: ReminderState, action: ReminderAction) => {
  switch (action.type) {
    case Actions.Add: {
      const reminders = [action.reminder, ...state.reminders];
      localStorage.setItem('reminders', JSON.stringify(reminders));
      return { ...state, reminders };
    }
    case Actions.Remove: {
      const reminders = state.reminders.filter((reminder) => reminder.id != action.id);
      localStorage.setItem('reminders', JSON.stringify(reminders));
      return { ...state, reminders };
    }
    case Actions.Edit: {
      const reminders = state.reminders.reduce((previous: Reminder[], current) => {
        if (current.id == action.id) {
          let editedItem = {
            current,
            ...action.reminder,
          };
          return [...previous, editedItem];
        } else {
          return [...previous, current];
        }
      }, []);
    }
  }
};

const ReminderContext = React.createContext([]);

export const ReminderProvider = () => {};
