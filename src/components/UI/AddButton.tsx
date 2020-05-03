import React from 'react';
//@ts-ignore
import Plus from '@bit/feathericons.react-feather.plus';
import styled from 'styled-components';
import { device } from '../../utils/layout';

const Button = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px 8px;
  border: 2px solid black;
  border-radius: 500px;
  background-color: transparent;

  cursor: pointer;

  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Text = styled.p`
  margin-left: 4px;

  font-size: 1.2em;
  font-weight: bold;

  display: none;

  @media ${device.tablet} {
    display: block;
  }
`;


export const AddButton = ({ onClick }: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <Button onClick={onClick}>
      <Plus />
      <Text>Add reminder</Text>
    </Button>
  );
};
