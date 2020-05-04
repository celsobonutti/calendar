import React from 'react';
import styled from 'styled-components/macro';
import { format, getDate, isWeekend, isToday } from 'date-fns';

import { useReminderContext } from '../../stores/reminders/reminders';
import { CompactReminder } from './CompactReminder';
import { absoluteFill, device } from '../../utils/layout';
import { theme } from '../../utils/theme';
import { ReminderDot } from './ReminderDot';

interface ContainerProps {
  backgroundColor: string;
  isToday: boolean;
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

  background-color: ${(props) => props.backgroundColor};

  @media (hover: hover) {
    opacity: ${(props) => (props.isToday ? '1' : '0.6')};

    overflow-y: auto;
    overflow-x: hidden;

    &:hover {
      opacity: 1;

      transition: opacity 0.2s ease-in-out;
    }
  }
`;

const Date = styled.p`
  font-size: 1em;
  color: ${(props) => props.color};

  @media ${device.tablet} {
    align-self: flex-start;
    margin-bottom: 0.4em;
  }

  ${Container}:hover & {
    font-weight: bold;
    transition: 0.2s linear;
  }
`;

const Reminders = styled.div.attrs({
  'data-cy': 'date-reminders',
})`
  display: none;

  width: 100%;
  
  @media ${device.tablet} {
    display: block;
  }
`;

interface DayProps {
  day: Date;
  outOfMonth: boolean;
  onClick: Function;
}

export const CalendarDay = ({ day, outOfMonth, onClick }: DayProps) => {
  const { getDateReminders } = useReminderContext();

  const dayReminders = getDateReminders(day);

  const weekend = isWeekend(day);

  const today = isToday(day);

  let color = 'black';

  let backgroundColor = '#F5F5F5';

  if (outOfMonth) {
    color = '#ACACAC';
    backgroundColor = '#DDDDDD';
  } else if (today) {
    color = 'white';
    backgroundColor = theme.primaryColor;
  } else if (weekend) {
    color = '#4169E1';
    backgroundColor = '#DDDDDD';
  }

  return (
    <Ratio>
      <Container
        backgroundColor={backgroundColor}
        isToday={today}
        onClick={() => {
          onClick(day);
        }}
        data-value={format(day, 'yyyy-MM-dd')}
      >
        <Date color={color}>
          <time dateTime={format(day, 'EEEE, MMM do, yyyy')}>{getDate(day)}</time>
        </Date>
        {dayReminders.length > 0 && <ReminderDot backgroundColor={dayReminders[0].color} />}
        <Reminders>
          {dayReminders.map((reminder) => (
            <CompactReminder reminder={reminder} key={reminder.id} />
          ))}
        </Reminders>
      </Container>
    </Ratio>
  );
};
