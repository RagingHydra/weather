"use strict";

const { CronJob } = require('cron');
const { getExternal, composeWeatherURL, generateTestData } = require('../helpers/helpers');
/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = broker => {
	return {
		name: 'weather',
		async started() {
			const weatherFetchJob = new CronJob(`*/10 * * * *`, async () => { //Every 10 minutes
				const weather = TEST ? generateTestData() : await getExternal(composeWeatherURL(__config.londonLatitude, __config.londonLongtitude));

				if (!weather || !weather.current) {
					broker.logger.error(`Can't get valid weather data`);
					return; //Don't broadcast in case of invalid data
				}

				broker.broadcast('weather.update', weather);
			}, null, true);

			weatherFetchJob.start();
		}
	}
}
