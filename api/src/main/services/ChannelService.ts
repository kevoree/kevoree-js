export interface DispatchCallback {
	(err: Error, port: string, answer: string): void;
}

export interface ChannelService {
	getInputs(): string[];
	getOutputs(): string[];
	localDispatch(msg: string): void;
	localDispatch(msg: string, callback: DispatchCallback): void;
}
