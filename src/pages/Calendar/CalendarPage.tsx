import React, { useState } from 'react';
import { Calendar } from '../../components/Calendar/Calendar';

export const CalendarPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());


  return (
    <div>
      <p>{year}</p>
      <Calendar year={2020} month={4} />
    </div>
  );
};
