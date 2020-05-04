import React from 'react';
import styled from 'styled-components';

import {theme} from '../../utils/theme';

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 200;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100px;
  max-width: 400px;

  padding: 1em;

  background-color: white;
  border-radius: 4px;
`;

const Text = styled.h2`
  font-size: 1em;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const buttonStyle = `
  height: 40px;
  flex-grow: 1;
  font-size: 1em;

  font-weight: bold;
  border: 1px solid #ddd;
`;

const Confirm = styled.button`
  ${buttonStyle}

  margin-left: 20%;

  background-color: ${theme.primaryColor};
  color: white;

  &:hover{
    background-color: ${theme.primaryDarken}
  }
`;

const Cancel = styled.button`
  ${buttonStyle}

  background-color: white;
  color: ${theme.cancelColor};

  &:hover{
    color: ${theme.cancelDarken}
  }
`;

interface ConfirmationProps {
  onConfirm: Function;
  onCancel: Function;
  text: string;
}

export const Confirmation = ({ onConfirm, onCancel, text }: ConfirmationProps) => {
  return (
    <Overlay onClick={() => onCancel()}>
      <Container
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Text>{text}</Text>
        <ButtonContainer>
          <Cancel data-cy="confirmation-cancel" onClick={() => onCancel()}>CANCEL</Cancel>
          <Confirm data-cy="confirmation-confirm" onClick={() => onConfirm()}>CONFIRM</Confirm>
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};
