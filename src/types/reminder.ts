export interface Reminder {
  title: string;
  id: string;
}

export interface ReminderCompanion {
  title?: string;
}

export const replaceValues = (reminder: Reminder, companion: ReminderCompanion): Reminder => {
  return {
    title: companion.title ?? reminder.title,
    id: reminder.id,
  };
};