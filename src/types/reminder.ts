export interface Reminder {
  title: string;
  id: string;
  date: Date;
  color: string;
  city: string;
}

export interface ReminderCompanion {
  title?: string;
  color?: string;
  city?: string;
  date?: Date;
}

export const replaceValues = (reminder: Reminder, companion: ReminderCompanion): Reminder => {
  return {
    title: companion.title ?? reminder.title,
    color: companion.color ?? reminder.color,
    date: companion.date ?? reminder.date,
    city: companion.city ?? reminder.city,
    id: reminder.id,
  };
};