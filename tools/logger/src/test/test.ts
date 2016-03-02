import { LoggerFactory, LogLevel, Logger } from '../main/kevoree-logger';

describe('LoggerFactory', () => {
	LoggerFactory.setLevel(LogLevel.DEBUG);

	it('node0 log', () => {
		var log = LoggerFactory.createLogger('node0');
		log.debug('lorem ipsum');
		log.info('dolor sit');
		log.warn('amet '+' consec\ntetur');
		log.error('simple error message');
		log.error('New message of the error', new Error('Something'));
	});

	it('comp0 log', () => {
		var log2 = LoggerFactory.createLogger('comp0');
		log2.debug('lorem ipsum');
		log2.info('dolor sit');
		log2.warn('amet '+' consec\ntetur');
		log2.error('simple error message');
		log2.error('New message of the error', new Error('Something'));
	});

	it('comp1 log', () => {
		var log3 = LoggerFactory.createLogger('comp1');
		log3.debug('lorem ipsum');
		log3.info('dolor sit');
		log3.warn('amet '+' consec\ntetur');
		log3.error('simple error message');
		log3.error('New message of the error', new Error('Something'));
	});
});
