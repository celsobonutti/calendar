import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
//@ts-ignore
import XCircle from '@bit/feathericons.react-feather.x-circle';
import { absoluteFill } from '../../utils/layout';

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
  padding: 1em;

  background-color: white;

  ${absoluteFill}

  @media (hover: hover) {
    max-width: 900px;
    border-radius: 0.3em;
    position: relative;
  }
`;

const CloseButton = styled(XCircle)`
  position: absolute;

  right: 10px;
  top: 10px;

  cursor: pointer;
`;

interface ModalProps {
  hideModal: Function;
}

export const Modal: FunctionComponent<ModalProps> = ({ children, hideModal }) => {
  return (
    <Overlay onClick={() => hideModal()}>
      <Content
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <CloseButton onClick={() => hideModal()} />
        {children}
      </Content>
    </Overlay>
  );
};
