import * as assert from 'assert';
import { Injector, Services, InputPort, OutputPort } from 'kevoree-api';
import { ChannelServiceImpl } from './ChannelServiceImpl';
import LocalChannel = require('../main/LocalChannel');

describe('LocalChannel', () => {
	var injector = new Injector();
	var channel = new LocalChannel();

	it('should dispatch messages locally', (done: MochaDone) => {
    let node0printer = false;
    let node1printer = false;

    let inputs: InputPort[] = [
      {
        path: 'node0:printer<-input',
        remote: false,
        dispatch: (msg: string) => { node0printer = true; }
      },
      {
        path: 'node1:printer<-input',
        remote: true,
        dispatch: (msg: string) => { node1printer = true; }
      }
    ];
    let outputs: OutputPort[] = [
      {
        path: 'node0:ticker->output',
        send: (msg: string) => {}
      }
    ];
    var chanService = new ChannelServiceImpl('node0', inputs, outputs);
		injector.register(Services.Channel, chanService);
		injector.inject(channel);

		var msg = "test";
		channel.onSend(msg);
    while (node0printer && node1printer) {}
    done();
	});
});
