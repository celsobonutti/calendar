# Calendar Challenge
This is a simple calendar, made as a challenge for joining [Jobsity](https://www.jobsity.com/).

You can see it live on calendar.cel.so

## Running locally

First, to be able to see weather forecasts for your reminders, you need to get a [Weatherbit](https://www.weatherbit.io/) API key and set it as the `REACT_APP_WEATHERBIT_KEY` environment variable. You can do it manually or using a .env (as in the .env.sample file.).
Once that's done, run:
```bash
yarn install
yarn start
```
...and it should be running in http://localhost:3000

If you have a problem with the [@bit](https://bit.dev) packages, add bit to your machine's npm registry with `npm config set @bit:registry https://node.bit.dev`.

## Tests

To run tests, simply run `yarn test`.
