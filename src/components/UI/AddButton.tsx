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
  flex-shrink: 0;

  font-size: 1.2em;
  font-weight: bold;

  display: ${(props) => (props.alwaysShowText ? 'block' : 'none')};

  @media ${device.tablet} {
    display: block;
  }
`;

interface ButtonProps {
  alwaysShowText?: boolean;
  dataCy: string;
}

export const AddButton = ({
  onClick,
  alwaysShowText,
  dataCy
}: React.HTMLProps<HTMLButtonElement> & ButtonProps) => {
  return (
    <Button onClick={onClick} data-cy={dataCy}>
      <Plus />
      <Text alwaysShowText={alwaysShowText}>Add reminder</Text>
    </Button>
  );
};
