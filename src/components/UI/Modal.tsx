import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

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

const Content = styled.div`
  border-radius: 0.3em;
  max-width: 900px;
  z-index: 201;
  
  padding: 1em;

  background-color: white;
`;

interface ModalProps {
  hideModal: Function;
}

export const Modal: FunctionComponent<ModalProps> = ({ children, hideModal }) => {
  return (
    <Overlay onClick={() => hideModal()}>
      <Content onClick={event => {
        event.stopPropagation();
      }}>{children}</Content>
    </Overlay>
  );
};
