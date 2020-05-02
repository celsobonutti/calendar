export interface Reminder {
  title: string;
  id: string;
  datetime: Date;
  color: string;
  city: string;
}

export interface ReminderCompanion {
  title?: string;
  color?: string;
  city?: string;
  datetime?: Date;
}

export const replaceValues = (reminder: Reminder, companion: ReminderCompanion): Reminder => {
  return {
    title: companion.title ?? reminder.title,
    color: companion.color ?? reminder.color,
    datetime: companion.datetime ?? reminder.datetime,
    city: companion.city ?? reminder.city,
    id: reminder.id,
  };
};