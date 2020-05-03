import React from 'react';
//@ts-ignore
import Plus from '@bit/feathericons.react-feather.plus';
import styled from 'styled-components/macro';
import { device } from '../../utils/layout';

const Button = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px 4px;
  border: 2px solid black;
  border-radius: 500px;
  background-color: transparent;

  cursor: pointer;

  transition: 0.2s ease-in-out;

  margin-left: auto;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface TextProps {
  alwaysShowText?: boolean;
}

const Text = styled.p<TextProps>`
  margin-left: 4px;

  font-size: 1.2em;
  font-weight: bold;

  display: ${(props) => (props.alwaysShowText ? 'block' : 'none')};

  @media ${device.tablet} {
    display: block;
  }
`;

export const AddButton = ({
  onClick,
  alwaysShowText,
}: React.HTMLProps<HTMLButtonElement> & TextProps) => {
  return (
    <Button onClick={onClick}>
      <Plus />
      <Text alwaysShowText={alwaysShowText}>Add reminder</Text>
    </Button>
  );
};
