import { useState, useEffect } from 'react';
import { isBefore, isToday, differenceInCalendarDays } from 'date-fns';
import { Error } from '../components/ReminderForm/ReminderFormStyles';

export enum WeatherStatus {
  Loading = 'LOADING',
  Data = 'DATA',
  Error = 'ERROR',
}

interface WeatherData {
  icon: any;
  description: string;
}

interface Data {
  status: WeatherStatus.Data;
  data: WeatherData;
}

type Errors = 'not_found' | 'out_of_range';

interface Error {
  status: WeatherStatus.Error;
  error: Errors;
}

interface Loading {
  status: WeatherStatus.Loading;
}

type Weather = Data | Error | Loading;

export const useWeatherForecast = (date: Date, city: string) => {
  const [status, setStatus] = useState<Weather>({ status: WeatherStatus.Loading });

  useEffect(() => {
    const abortController = new AbortController();

    if (status.status === WeatherStatus.Loading) {
      const difference = differenceInCalendarDays(date, new Date());

      if (difference > 15 || (!isToday(date) && isBefore(date, new Date()))) {
        setStatus({
          status: WeatherStatus.Error,
          error: 'out_of_range',
        });
      } else {
        fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=${difference + 1}&key=${
            process.env.REACT_APP_WEATHERBIT_KEY
          }`,
          {
            method: 'GET',
            signal: abortController.signal,
          }
        )
          .then((data) => {
            if (data.status === 200 || data.status === 304) {
              return data.json();
            } else {
              throw Error;
            }
          })
          .then((data) => {
            const weatherData = data.data;
            const dayWeather = weatherData[weatherData?.length - 1]?.weather;
            setStatus((current) => ({
              status: WeatherStatus.Data,
              data: {
                description: dayWeather.description,
                icon: dayWeather.icon,
              },
            }));
          })
          .catch((_e) => {
            setStatus({
              status: WeatherStatus.Error,
              error: 'not_found',
            });
          });
      }
    }

    return function cancelCall() {
      abortController.abort();
    };
  }, [status, date, city]);

  return status;
};
