import { Reminder, ReminderCompanion, replaceValues } from '../../types';
import isSameDay from 'date-fns/isSameDay';

export interface ReminderState {
  reminders: Reminder[];
}

export enum Actions {
  Add = 'ADD',
  Remove = 'REMOVE',
  Edit = 'EDIT',
  RemoveDate = 'REMOVE_DATE',
}

export interface AddReminder {
  type: Actions.Add;
  reminder: Reminder;
}

export interface RemoveReminder {
  type: Actions.Remove;
  id: string;
}

export interface EditReminder {
  type: Actions.Edit;
  id: string;
  newValues: ReminderCompanion;
}

export interface RemoveDateReminder {
  type: Actions.RemoveDate;
  date: Date;
}

export type ReminderAction = AddReminder | RemoveReminder | EditReminder | RemoveDateReminder;

export const reminderReducer = (state: ReminderState, action: ReminderAction) => {
  switch (action.type) {
    case Actions.Add: {
      const newReminders = [action.reminder, ...state.reminders];
      localStorage.setItem('reminders', JSON.stringify(newReminders));
      return { ...state, reminders: newReminders };
    }
    case Actions.Remove: {
      const newReminders = state.reminders.filter((reminder) => reminder.id !== action.id);
      localStorage.setItem('reminders', JSON.stringify(newReminders));
      return { ...state, reminders: newReminders };
    }
    case Actions.Edit: {
      const newReminders = state.reminders.reduce((previous: Reminder[], current) => {
        if (current.id === action.id) {
          return [...previous, replaceValues(current, action.newValues)];
        } else {
          return [...previous, current];
        }
      }, []);
      localStorage.setItem('reminders', JSON.stringify(newReminders));
      return { ...state, reminders: newReminders };
    }
    case Actions.RemoveDate: {
      const newReminders = state.reminders.filter(
        (reminder) => !isSameDay(reminder.datetime, action.date)
      );
      localStorage.setItem('reminders', JSON.stringify(newReminders));
      return { ...state, reminders: newReminders };
    }
  }
};
