import { useState, useEffect } from 'react';
import { isBefore, differenceInCalendarDays } from 'date-fns';

enum Status {
  Loading = 'LOADING',
  Data = 'DATA',
  Error = 'ERROR',
}

interface Data {
  status: Status.Data;
  weather: string;
}

interface Error {
  status: Status.Error;
  error: string;
}

interface Loading {
  status: Status.Loading;
}

type Weather = Data | Error | Loading;

export const useWeatherForecast = (date: Date, city: string) => {
  const [status, setStatus] = useState<Weather>({ status: Status.Loading });

  const difference = differenceInCalendarDays(date, new Date());

  useEffect(() => {
    if (difference > 16 || isBefore(date, new Date())) {
      fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&interval=${difference}&key=${process.env.REACT_APP_WEATHERBIT_KEY}`)
    }
    return;
  }, [status]);
};
