import { Callback } from '../Callback';

export interface OutputPort {
    
    send(msg: string): void;

    send(msg: string, cb: Callback): void;
}
