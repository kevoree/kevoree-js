declare interface Core {
  start(name: string, cb: Callback): void
  stop(): void
  deploy(model: Object, cb: Callback): void
}

interface Callback {
  (err?: Error): void
}

interface DeployCallback {
  (err: Error, update: boolean): void
}
