# Weather
This is a weather evaluation system. It receives data from openweathermap API fron London, and outputs text evaluation to console, based on current temperature.

## Usage
Start the project with `npm run start` command.

## Services
- **weather**: Service that fetches data from openweathermap every 10 minutes using cron.
Note that it will use mock data if TEST env variable is set to true. API key for openweathermap should be defined in `config.js` in project root. 
If proper data is received or mocked the service broadcasts `weather.update` event with weather data.
- **evaluation**: Service that listens to `weather.update` event and outputs it's evaluation using Moleculer logger. It will log "Hot" if current temperature is above 30, "Cold" if it's below 10, and "Good" if it's between 10 and 30.

## Tests
This project uses **Jest** for it's tests. Evaluation service tests spy on Moleculer logger output. 
They check if output is Cold if temperature is 5, Hot if 31, Good if 20 and that logger logs an error in case of incorrect data.
  
Use `npm test` script to run the tests.

## NPM scripts

- `npm run start`: Start app. Use `TEST = false` env variable to tell weather service to fetch data from openweathermap API
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
