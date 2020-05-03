import React from 'react';
import { Element, Group, CalendarGrid } from '../UI/Containers';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HeaderGrid = styled(CalendarGrid)`
  height: 2em;

  background-color: ${theme.primaryColor};
  color: #F0FFFF;
`;

const HeaderLabel = styled.p`
  color: white;
`;

export const Weekdays = () => (
  <Group>
    <HeaderGrid>
      {weekdays.map((weekday) => (
        <Element role="columnheader" aria-sort="none" key={`header-${weekday}`}>
          <HeaderLabel>{weekday}</HeaderLabel>
        </Element>
      ))}
    </HeaderGrid>
  </Group>
);
