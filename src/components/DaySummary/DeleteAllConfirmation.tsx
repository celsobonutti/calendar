import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 50%;
  width: 100%;

  @media (hover: hover) {
    margin: 0;
    max-width: 500px;
  }
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

  background-color: #1E90FF;
  color: white;
`;

const Cancel = styled.button`
  ${buttonStyle}

  background-color: white;
  color: #ED655A;
`;

interface ConfirmationProps {
  onConfirm: Function;
  onCancel: Function;
}

export const Confirmation = ({onConfirm, onCancel} : ConfirmationProps) => {
  return <Container>
    <Text>
      You are going to delete every reminder for this day. Are you sure?
    </Text>
    <ButtonContainer>
      <Cancel onClick={() => onCancel()}>CANCEL</Cancel>
      <Confirm onClick={() => onConfirm()}>CONFIRM</Confirm>
    </ButtonContainer>
  </Container>
}