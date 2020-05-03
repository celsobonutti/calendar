import React from 'react';
import { Reminder } from '../../types';
import styled from 'styled-components';
import { format } from 'date-fns';
//@ts-ignore
import Delete from '@bit/feathericons.react-feather.trash-2';
//@ts-ignore
import Edit from '@bit/feathericons.react-feather.edit';

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
})``;

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
  ariaLabel: 'Edit reminder',
})`
  ${buttonStyle}
`;

const DeleteButton = styled(Delete).attrs({
  role: 'button',
  ariaLabel: 'Delete reminder',
})`
  ${buttonStyle}
`;

interface ReminderProps {
  reminder: Reminder;
  onClickEdit: Function;
  onClickDelete: Function;
}

export const ReminderCard = ({ reminder, onClickEdit, onClickDelete }: ReminderProps) => {
  return (
    <ReminderContainer color={reminder.color}>
      <InformationContainer>
        <h4>{format(reminder.datetime, 'HH:mm')}</h4>
        <p>{reminder.title}</p>
      </InformationContainer>
      <ButtonGroup>
        <EditButton onClick={onClickEdit} />
        <DeleteButton onClick={onClickDelete} />
      </ButtonGroup>
    </ReminderContainer>
  );
};
