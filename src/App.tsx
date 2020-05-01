import React from 'react';
import * as types from 'styled-components/cssprop';

import { Calendar } from './pages/Calendar';
import { ReminderProvider } from './stores/reminders/reminders';

const App = () => {
  return (
    <ReminderProvider>
      <Calendar />
    </ReminderProvider>
  );
};

export default App;
