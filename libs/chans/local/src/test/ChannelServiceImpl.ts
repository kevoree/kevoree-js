import { ChannelService, DispatchCallback } from 'kevoree-api';

export class ChannelServiceImpl implements ChannelService {
	dispatched: string[];
	inputs: string[];
	outputs: string[];

	constructor() {
		this.dispatched = [];
		this.inputs = [
			'nodes[node0]/components[printer0]/inputs[input]',
			'nodes[node0]/components[printer1]/inputs[input]'
		];
		this.outputs = [
			'nodes[node1]/components[ticker0]/inputs[input]',
			'nodes[node1]/components[ticker1]/inputs[input]'
		];
	}

	getInputs(): string[] {
		return this.inputs;
	}

	getOutputs(): string[] {
		return this.outputs;
	}

	localDispatch(msg: string, callback?: DispatchCallback) {
		this.inputs.forEach(input => {
			console.log(`should dispatch message to ${input}`);
			if (callback) {
				callback(null, input, 'no answer');
			}
		});
		this.dispatched.push(msg);
	}
}
