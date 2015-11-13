import { OutputPort, Callback } from 'kevoree-api';

export class OutputPortImpl implements OutputPort {

    send(msg: string, cb?: Callback): void {
        // TODO
        console.log(`>>> ${msg}`);
    }
}
