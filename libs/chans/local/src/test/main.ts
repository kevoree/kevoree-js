import * as assert from 'assert';
import { Injector, Services } from 'kevoree-api';
import { ChannelServiceImpl } from './ChannelServiceImpl';
import LocalChannel = require('../main/LocalChannel');

describe('LocalChannel', () => {
	var injector = new Injector();
	var channel = new LocalChannel();
	var chanService = new ChannelServiceImpl();

	before(() => {
		injector.register(Services.Channel, chanService);
		injector.inject(channel);
	});

	it('should dispatch messages locally', (done: MochaDone) => {
		var msg = "test";
		channel.onSend(msg, (err: Error, port: string, answer: string) => {
			if (err) {
				done(err);
			} else {
				assert.strictEqual(chanService.dispatched[0], msg, 'should be equal');
				done();
			}
		});
	});
});
