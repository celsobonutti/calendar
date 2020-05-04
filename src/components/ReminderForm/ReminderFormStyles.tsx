import styled from 'styled-components/macro';
import DateTime from '@nateradebaugh/react-datetime';
import '@nateradebaugh/react-datetime/scss/styles.scss';

import { theme } from '../../utils/theme';
import { device } from '../../utils/layout';

export const Header = styled.h1`
  font-size: 1.4rem;
`;

export const Form = styled.form`
  display: grid;
  grid-gap: 1em;

  width: 100%;

  grid-template-columns: repeat(1, 1fr);

  @media ${device.tablet} {
    grid-template-columns: repeat(2, min(350px));
  }
`;

export const FieldContainer = styled.div`
  position: relative;

  margin-top: 0.4em;
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const CharacterCount = styled.small`
  position: absolute;
  right: 0;
`;

export const FieldLabel = styled.label`
  margin-bottom: 0.2em;
`;

const inputStyle = `
  height: 1.4em;

  padding: 0.4em;
  font-size: 1em;

  border-radius: 0.2em;
  border: 1px solid #cecece;

  &:focus {
    transition: 0.2s ease-in-out;
    border: 1px solid #888;
  }
`;

export const FieldInput = styled.input`
  ${inputStyle}
`;

export const FieldDateTime = styled(DateTime)`
  ${inputStyle}
`;

export const Error = styled.p`
  margin-top: 0.2em;
  font-size: 1em;
  color: #d74545;
`;

export const SubmitButton = styled.button`
  border: none;
  border-radius: 4px;

  width: 100%;
  height: 30px;
  background-color: ${theme.primaryColor};

  font-size: 1em;
  font-weight: bold;
  color: white;

  @media ${device.tablet} {
    grid-column: 1/3;
  }
`;
