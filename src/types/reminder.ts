export interface Reminder {
  title: string;
  id: string;
  date: Date;
}

export interface ReminderCompanion {
  title?: string;
}

export const replaceValues = (reminder: Reminder, companion: ReminderCompanion): Reminder => {
  return {
    title: companion.title ?? reminder.title,
    date: reminder.date,
    id: reminder.id,
  };
};