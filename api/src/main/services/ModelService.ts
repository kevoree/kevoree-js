export interface Callback {
  (err?: Error): void
}

export interface ModelService {
  getName(): string
  getPath(): string
  getNodeName(): string
  getCurrentModel(): Object
  getDeployingModel(): Object
  getModelInstance(): Object
  deploy(model: Object, done: Callback): void
}
