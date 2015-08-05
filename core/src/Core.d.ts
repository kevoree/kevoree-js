declare interface Core {

  start(name: string): void

  stop(done: Callback): void

  deploy(model: Object, done: Callback): void
}

interface Callback {
  (err?: Error): void
}
