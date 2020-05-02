import React from 'react';
import * as types from 'styled-components/cssprop';
import './index.css';

import { CalendarPage } from './pages/Calendar';
import { ReminderProvider } from './stores/reminders/reminders';

const App = () => {
  return (
    <ReminderProvider>
      <CalendarPage />
    </ReminderProvider>
  );
};

export default App;
