import React from 'react';
import { Element, Group, Row } from '../Row/Row';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Weekdays = () => (
  <Group>
    <Row>
      {weekdays.map((weekday) => (
        <Element role="columnheader" aria-sort="none">
          {weekday}
        </Element>
      ))}
    </Row>
  </Group>
);
