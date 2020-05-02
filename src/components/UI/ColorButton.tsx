import React, { useState } from 'react';
import styled from 'styled-components';
import { TwitterPicker } from 'react-color';
import { useToggler } from '../../hooks/useToggler';

interface ButtonProps {
  backgroundColor: string;
}

const Button = styled.button<ButtonProps>`
  width: 40px;
  height: 30px;
  border: 2px solid #ccc;
  border-radius: 4px;

  background-color: ${(props) => props.backgroundColor};
`;

const Container = styled.div``;

const PopOver = styled.div`
  position: absolute;
  z-index: 300;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

interface ColorButtonProps {
  value: string;
  onChange: Function;
}

export const ColorButton = ({ value, onChange }: ColorButtonProps) => {
  const { setFalse: hidePicker, setTrue: showPicker, state: isPickerShown } = useToggler(false);

  return (
    <Container>
      <Button backgroundColor={value} onClick={showPicker} aria-label="Color picker"/>
      {isPickerShown && (
        <PopOver>
          <Cover onClick={hidePicker} />
          <TwitterPicker
            onChange={(event) => {
              onChange(event.hex);
            }}
            color={value}
          />
        </PopOver>
      )}
    </Container>
  );
};
