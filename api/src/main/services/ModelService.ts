export interface ModelService {
  getName(): string;
  getPath(): string;
  getNodeName(): string;
  getCurrentModel(): Object;
  getDeployingModel(): Object;
  getModelInstance(): Object;
  deploy(done: (err?: Error) => void): void;
}
