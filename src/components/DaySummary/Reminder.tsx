import React from 'react';
import { Reminder } from '../../types';
import styled from 'styled-components/macro';
import { format } from 'date-fns';
//@ts-ignore
import Delete from '@bit/feathericons.react-feather.trash-2';
//@ts-ignore
import Edit from '@bit/feathericons.react-feather.edit';
//@ts-ignore
import Alert from '@bit/feathericons.react-feather.alert-circle';
//@ts-ignore
import Loading from '@bit/folland87.a24ui.loading-spinner';

import { WeatherStatus, useWeatherForecast } from '../../hooks/useWeatherForecast';

interface ReminderContainerProps {
  color: string;
}

const ReminderContainer = styled.div<ReminderContainerProps>`
  display: flex;
  align-items: center;

  margin-bottom: 0.5em;

  padding: 0.5em;

  border-radius: 4px;
  background-color: ${(props) => props.color};
`;

const InformationContainer = styled.div.attrs({
  role: 'group',
})`
  padding-left: 0.5em;
`;

const ButtonGroup = styled.div.attrs({
  role: 'group',
})`
  margin-left: auto;
`;

const buttonStyle = `
  cursor: pointer;

  padding: 4px;

  border-radius: 4px;

  @media (hover: hover) {
    &:hover {
      transition: 0.2s ease-in-out;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const EditButton = styled(Edit).attrs({
  role: 'button',
  'aria-label': 'Edit reminder',
  'data-cy': 'edit-button',
})`
  ${buttonStyle}
`;

const DeleteButton = styled(Delete).attrs({
  role: 'button',
  'aria-label': 'Delete reminder',
  'data-cy': 'delete-button',
})`
  ${buttonStyle}
`;

interface ReminderProps {
  reminder: Reminder;
  onClickEdit: Function;
  onClickDelete: Function;
}

export const ReminderCard = ({ reminder, onClickEdit, onClickDelete }: ReminderProps) => {
  const weather = useWeatherForecast(reminder.datetime, reminder.city);

  let weatherComponent;

  switch (weather.status) {
    case WeatherStatus.Error:
      weatherComponent = <Alert size={30} color="black" />;
      break;
    case WeatherStatus.Loading:
      weatherComponent = <Loading size={30} color="black" />;
      break;
    case WeatherStatus.Data:
      weatherComponent = (
        <img
          src={`https://www.weatherbit.io/static/img/icons/${weather.data.icon}.png`}
          alt={weather.data.description}
          width={30}
          height={30}
        />
      );
  }

  return (
    <ReminderContainer color={reminder.color}>
      {weatherComponent}
      <InformationContainer>
        <h4>
          {format(reminder.datetime, 'HH:mm')} - {reminder.city}
        </h4>
        <p>{reminder.title}</p>
      </InformationContainer>
      <ButtonGroup>
        <EditButton onClick={onClickEdit} />
        <DeleteButton onClick={onClickDelete} />
      </ButtonGroup>
    </ReminderContainer>
  );
};
