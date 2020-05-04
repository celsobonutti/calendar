import React from 'react';
import styled from 'styled-components';
//@ts-ignore
import Delete from '@bit/feathericons.react-feather.trash-2';

import { theme } from '../../utils/theme';

const DeleteButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.2em 0.4em;

  font-size: 0.8em;
  font-weight: bold;
  color: white;

  background-color: ${theme.cancelColor};

  &:hover {
    background-color: ${theme.cancelDarken};
  }

  &[disabled] {
    cursor: initial;
    background-color: #cecece;
  }
`;

const DeleteText = styled.p`
  margin: 0 4px;
`;

interface DeleteButtonProps {
  disabled: boolean;
  onClick: Function;
}

export const DeleteButton = ({ disabled, onClick }: DeleteButtonProps) => {
  return (
    <DeleteButtonContainer disabled={disabled} onClick={() => onClick()}>
      <Delete />
      <DeleteText>Delete All</DeleteText>
    </DeleteButtonContainer>
  );
};
