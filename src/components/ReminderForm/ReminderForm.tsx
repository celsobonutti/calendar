import React, { useContext } from 'react';
import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { v4 as UUID } from 'uuid';
import DateTime from '@nateradebaugh/react-datetime';
import '@nateradebaugh/react-datetime/scss/styles.scss';

import { ColorButton } from '../UI/ColorButton';
import { Reminder } from '../../types';
import { ReminderContext } from '../../stores/reminders/reminders';

const Header = styled.h1`
  font-size: 1.4rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;

  width: 100%;
`;

const FieldContainer = styled.div`
  padding-top: 1em;
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const FieldLabel = styled.label`
  margin-bottom: 0.2em;
`;

const FieldInput = styled.input`
  height: 1.4em;

  padding: 0.4em;
  font-size: 1em;

  border-radius: 0.2em;
  border: 1px solid #cecece;

  &:focus {
    transition: 0.2s ease-in-out;
    border: 1px solid #888;
  }
`;

const FieldDateTime = styled(DateTime)`
  height: 1.4em;

  padding: 0.4em;
  font-size: 1em;

  border-radius: 0.2em;
  border: 1px solid #cecece;

  &:focus {
    transition: 0.2s ease-in-out;
    border: 1px solid #888;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1/3;

  border: none;
  border-radius: 4px;

  width: 100%;
  height: 30px;
  background-color: #1e90ff;

  font-size: 1em;
  font-weight: bold;
  color: white;
`;

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
          <ErrorMessage name="title" errors={errors} />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel htmlFor="city">City: </FieldLabel>
          <FieldInput
            name="city"
            type="text"
            defaultValue={reminder?.city}
            ref={register({ required: 'Field required.' })}
          />
          <ErrorMessage name="city" errors={errors} />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Date/Time: </FieldLabel>
          <Controller
            as={FieldDateTime}
            name="datetime"
            value={(watch('datetime'), '')}
            control={control}
            rules={{
              required: 'Field required.',
            }}
          />
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
          <ErrorMessage name="color" errors={errors} />
        </FieldContainer>
        <SubmitButton type="submit">{reminder ? 'Save Reminder' : 'Create Reminder'}</SubmitButton>
      </Form>
    </>
  );
};
