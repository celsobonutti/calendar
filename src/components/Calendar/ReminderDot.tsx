import styled from "styled-components";
import { device } from "../../utils/layout";

interface ReminderDotProps {
  backgroundColor: string;
}

export const ReminderDot = styled.div<ReminderDotProps>`
  margin-top: auto;
  margin-bottom: auto;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background-color: ${(props) => props.backgroundColor};

  align-self: center;

  @media ${device.tablet} {
    display: none;
  }
`;