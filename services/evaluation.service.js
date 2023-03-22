"use strict";

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = broker => {
	return {
		name: 'evaluation',
		events: {
			async 'weather.update'(params) {
				const { current: { temp } } = params;

				if (!temp) {
					broker.logger.error(`Evaluator didn't receive current temperature inside weather data`);
					return;
				}

				//Temperature evaluation
				if (temp > 30) {
					broker.logger.info('Hot');
				} else if (temp < 10) {
					broker.logger.info('Cold');
				} else {
					broker.logger.info('Good');
				}
			}
		}
	}
}
