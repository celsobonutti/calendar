import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';
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

  overflow-y: scroll;

  ${absoluteFill}

  @media (hover: hover) {
    max-height: 80vh;
    width: 100%;
    max-width: 700px;
    border-radius: 0.3em;
    position: relative;
  }
`;

const CloseButton = styled(XCircle)`
  display: block;
  margin-left: auto;
  height: 30px;
  width: 30px;

  border-radius: 50%;

  transition: 0.2s linear;

  &:hover {
    background-color: #f0f0f0;
  }

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
        <CloseButton size={30} onClick={() => hideModal()} />
        {children}
      </Content>
    </Overlay>
  );
};
