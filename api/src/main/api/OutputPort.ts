export interface OutputPort {
    path: string;

    send(msg: string): void;
}
