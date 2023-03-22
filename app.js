global.TEST = process.env.TEST || true;
global.__config = require('./config');

const { ServiceBroker, Errors: { MoleculerError } } = require('moleculer');

const broker = new ServiceBroker({
	logger: true,
	tracing: true,
	tracking: {
		enabled: true,
		shutdownTimeout: 25 * 1000
	},
	metrics: {
		enabled: true,
		reporter: [
			{
				type: 'Prometheus',
				options: {
					port: 3030,
					path: '/metrics'
				}
			}
		]
	},
	errorHandler(err) {
		broker.logger.error(err);
		if (err instanceof MoleculerError) {
			throw err
		}
		throw new MoleculerError('Internal server error', 500);
	}
})

broker.loadServices();

broker.start().catch(err => {
	console.error(err);
	process.exit(1);
});
