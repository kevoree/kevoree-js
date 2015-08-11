import { ModelService } from 'kevoree-api';

export class ModelServiceImpl implements ModelService {

  private nodeName: string;
  private name: string;
  private path: string;
  private model: any;
  private deployModel: any;

  constructor(nodeName: string, name: string, path: string, model: any) {
    this.nodeName = nodeName;
    this.name = name;
    this.path = path;
    this.model = model;
    this.deployModel = null;
  }

  getNodeName(): string {
    return this.nodeName;
  }

  getName(): string {
    return this.name;
  }

  getPath(): string {
    return this.path;
  }

  getCurrentModel(): any {
    return this.model;
  }

  getDeployingModel(): any {
    return this.deployModel;
  }

  getModelInstance(): any {

  }

  deploy(model: any, done: Callback): void {
    // TODO ask core to deploy
  }
}
