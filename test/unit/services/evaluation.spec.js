"use strict";

const { ServiceBroker } = require('moleculer');
const EvaluationService = require('../../../services/evaluation.service');

describe('Test evaluation service', () => {
	//Create broker with custom logger
	const broker = new ServiceBroker({
		logger: {
			type: 'Console',
			error: jest.fn(),
			warn: jest.fn(),
			info: jest.fn(),
			debug: jest.fn(),
			trace: jest.fn(),
		},
	});
	broker.createService(EvaluationService(broker));

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe('Test "weather.update" event handler', () => {

		it('should output Cold to console', async () => {
			const spy = jest.spyOn(broker.logger, 'info');

			broker.broadcast('weather.update', { current: { temp: 9 } });

			// Wait for the event handler to finish executing
			await new Promise((resolve) => setTimeout(resolve, 100));

			expect(spy).toHaveBeenCalledWith('Cold');

			//Restore the original broker.logger.info method
			spy.mockRestore();
		});

		it('should output Hot to console', async () => {
			const spy = jest.spyOn(broker.logger, 'info');

			broker.broadcast('weather.update', { current: { temp: 31 } });

			await new Promise((resolve) => setTimeout(resolve, 100));

			expect(spy).toHaveBeenCalledWith('Hot');

			spy.mockRestore();
		});

		it('should output Good to console', async () => {
			const spy = jest.spyOn(broker.logger, 'info');

			broker.broadcast('weather.update', { current: { temp: 20 } });

			await new Promise((resolve) => setTimeout(resolve, 100));

			expect(spy).toHaveBeenCalledWith('Good');

			spy.mockRestore();
		});

		it('should output error to console', async () => {
			const spy = jest.spyOn(broker.logger, 'error');

			broker.broadcast('weather.update', { current: {} });

			await new Promise((resolve) => setTimeout(resolve, 100));

			expect(spy).toHaveBeenCalledTimes(1);

			spy.mockRestore();
		});

	});
});
