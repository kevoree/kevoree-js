export interface DeployCallback {
  (err: Error, update: boolean): void;
}
