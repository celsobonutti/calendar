import React from 'react';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { v4 as UUID } from 'uuid';

import { ColorButton } from '../UI/ColorButton';
import { Reminder } from '../../types';
import { useReminderContext } from '../../stores/reminders/reminders';
import {
  Header,
  Form,
  FieldContainer,
  FieldLabel,
  Error,
  FieldDateTime,
  FieldInput,
  SubmitButton,
} from './ReminderFormStyles';

interface ReminderFormProps {
  reminder?: Reminder;
  onFormSubmitted: Function;
}

type FormData = {
  title: string;
  city: string;
  datetime: Date;
  color: string;
};

export const ReminderForm = ({ reminder, onFormSubmitted }: ReminderFormProps) => {
  const { register, handleSubmit, watch, control, errors, reset } = useForm<FormData>();
  const { addReminder, editReminder } = useReminderContext();

  const onSubmit = handleSubmit((formData: FormData) => {
    if (!reminder) {
      addReminder({
        city: formData.city,
        color: formData.color,
        datetime: formData.datetime,
        title: formData.title,
        id: UUID(),
      });
    } else {
      editReminder(reminder.id, {
        city: formData.city,
        color: formData.color,
        datetime: formData.datetime,
        title: formData.title,
      });
    }

    reset();

    onFormSubmitted();
  });

  return (
    <>
      <Header>{reminder ? 'Edit reminder' : 'Create reminder'}</Header>
      <Form onSubmit={onSubmit}>
        <FieldContainer>
          <FieldLabel htmlFor="title">Title: </FieldLabel>
          <FieldInput
            name="title"
            type="text"
            maxLength={30}
            placeholder="My reminder..."
            defaultValue={reminder?.title}
            ref={register({
              required: 'Field required.',
              maxLength: { message: 'Maximum of 30 characters.', value: 30 },
            })}
          />
          <Error>
            <ErrorMessage name="title" errors={errors} />
          </Error>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel htmlFor="city">City: </FieldLabel>
          <FieldInput
            name="city"
            type="text"
            defaultValue={reminder?.city}
            ref={register({ required: 'Field required.' })}
          />
          <Error>
            <ErrorMessage name="city" errors={errors} />
          </Error>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Date/Time: </FieldLabel>
          <Controller
            as={FieldDateTime}
            name="datetime"
            value={(watch('datetime'), '')}
            defaultValue={reminder?.datetime ?? null}
            control={control}
            rules={{
              required: 'Field required.',
            }}
          />
          <Error>
            <ErrorMessage name="datetime" errors={errors} />
          </Error>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel htmlFor="color">Color: </FieldLabel>
          <Controller
            as={ColorButton}
            name="color"
            value={watch('color')}
            defaultValue={reminder?.color ?? '#FFFFFF'}
            control={control}
            rules={{
              required: 'Field required.',
              pattern: { value: /#[0-Fa-f]{0,6}/, message: 'Must be a valid HEX color value.' },
            }}
          />
          <Error>
            <ErrorMessage name="color" errors={errors} />
          </Error>
        </FieldContainer>
        <SubmitButton type="submit">{reminder ? 'Save Reminder' : 'Create Reminder'}</SubmitButton>
      </Form>
    </>
  );
};
