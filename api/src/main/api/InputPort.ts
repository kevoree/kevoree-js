export interface InputPort {
  path: string;
  remote: boolean;

  dispatch(msg: string): void;
}
