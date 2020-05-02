import React, { useContext } from 'react';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as UUID } from 'uuid';
import DateTime from '@nateradebaugh/react-datetime';
import '@nateradebaugh/react-datetime/scss/styles.scss';

import { ColorButton } from '../UI/ColorButton';
import { Reminder } from '../../types';
import { ReminderContext } from '../../stores/reminders/reminders';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
`;

const FieldLabel = styled.label``;

interface ReminderFormProps {
  reminder?: Reminder;
}

type FormData = {
  title: string;
  city: string;
  datetime: Date;
  color: string;
};

export const ReminderForm = ({ reminder }: ReminderFormProps) => {
  const { register, handleSubmit, watch, control, errors } = useForm<FormData>();
  const { addReminder, editReminder } = useContext(ReminderContext);

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
  });

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FieldLabel htmlFor="title">Title: </FieldLabel>
        <input
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
        <ErrorMessage name="title" errors={errors} />
        <FieldLabel htmlFor="city">City: </FieldLabel>
        <input
          name="city"
          type="text"
          defaultValue={reminder?.city}
          ref={register({ required: 'Field required.' })}
        />
        <ErrorMessage name="city" errors={errors} />
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
        <ErrorMessage name="color" errors={errors} />
        <Controller 
          as={DateTime}
          name="datetime"
          value={(watch('datetime'), '')}
          defaultValue={new Date()}
          control={control}
          rules={{
            required: 'Field required.'
          }}
        />
        <button type="submit">Create Reminder</button>
      </Form>
    </Container>
  );
};
