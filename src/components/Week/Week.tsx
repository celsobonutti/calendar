import React from 'react';
import { Element, Group, Row } from '../Row/Row';
import { Day } from '../Day/Day';

interface WeekProps {
  days: Date[];
}

export const Week = ({ days }: WeekProps) => {
  return (
    <Group>
      <Row>
        <Element>
          {days.map((day) => (
            <Day day={day} />
          ))}
        </Element>
      </Row>
    </Group>
  );
};