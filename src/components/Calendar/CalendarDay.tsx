import React, { useContext } from 'react';
import styled from 'styled-components';
import { format, getDate, isWeekend } from 'date-fns';

import { ReminderContext } from '../../stores/reminders/reminders';
import { CompactReminder } from '../Reminders/CompactReminder';
import { absoluteFill, device } from '../../utils/layout';

interface ContainerProps {
  outOfWeek: boolean;
}

const Ratio = styled.div.attrs({
  role: 'gridcell',
})`
  position: relative;
  padding-top: 80%;
`;

const Container = styled.div<ContainerProps>`
  ${absoluteFill}

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;

  padding: 5%;

  cursor: pointer;

  background-color: ${(props) => (props.outOfWeek ? '#DDDDDD' : '#F5F5F5')};

  @media (hover: hover) {
    opacity: 0.6;

    &:hover {
      opacity: 1;

      transition: opacity 0.2s ease-in-out;
    }
  }
`;

const DateContainer = styled.div`
  @media ${device.tablet} {
    align-self: flex-end;
    margin-bottom: 0.4em;
  }
`;

const Date = styled.p`
  font-size: 1em;
  color: ${(props) => props.color};

  ${Container}:hover & {
    font-weight: bold;
    transition: 0.2s linear;
  }
`;

interface DayProps {
  day: Date;
  outOfMonth: boolean;
  onClick: Function;
}

export const CalendarDay = ({ day, outOfMonth, onClick }: DayProps) => {
  const { getDateReminders } = useContext(ReminderContext);

  const dayReminders = getDateReminders(day);

  const weekend = isWeekend(day);

  let color = 'black';

  if (outOfMonth) {
    color = '#ACACAC';
  } else if (weekend) {
    color = '#4169E1';
  }

  return (
    <Ratio>
      <Container
        outOfWeek={weekend || outOfMonth}
        onClick={() => {
          onClick(day);
        }}
      >
        <DateContainer>
          <Date color={color}>
            <time dateTime={format(day, 'EEEE, MMM do, yyyy')}>{getDate(day)}</time>
          </Date>
        </DateContainer>
        {dayReminders.map((reminder) => (
          <CompactReminder reminder={reminder} key={reminder.id} />
        ))}
      </Container>
    </Ratio>
  );
};
