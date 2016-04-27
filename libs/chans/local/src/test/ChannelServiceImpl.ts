import { ChannelService, InputPort, OutputPort } from 'kevoree-api';

export class ChannelServiceImpl implements ChannelService {

  constructor(private node: string, private inputs: InputPort[], private outputs: OutputPort[]) {}

	getInputs(): InputPort[] {
		return this.inputs;
	}

  getLocalInputs(): InputPort[] {
    return this.inputs.filter(path => !path.remote);
  }

  getRemoteInputs(): InputPort[] {
    return this.inputs.filter(input => input.remote);
  }

	getOutputs(): OutputPort[] {
		return this.outputs;
	}

	dispatch(msg: string) {
		this.inputs.forEach(input => {
      input.dispatch(msg);
    });
	}
}
