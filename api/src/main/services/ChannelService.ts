import { InputPort } from '../api/InputPort';
import { OutputPort } from '../api/OutputPort';

export interface ChannelService {

  /**
   * This is the list of ports that should receive messages
   * @returns array of connected input port paths
   */
	getInputs(): InputPort[];

  /**
   * This is the list of ports that should receive messages
   * and that are on another node
   * @returns array of connected input port
   */
  getRemoteInputs(): InputPort[];

  /**
   * This is the list of ports that should receive messages
   * and that are on the same node as the channel
   * @returns array of connected input port
   */
  getLocalInputs(): InputPort[];

  /**
   * This is the list of ports that will ask for message sendings
   * @returns array of connected output port
   */
	getOutputs(): OutputPort[];

  /**
   *
   */
	dispatch(msg: string): void;
}
