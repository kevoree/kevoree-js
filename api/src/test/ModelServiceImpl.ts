import { ModelService } from '../main/services/ModelService'

export class ModelServiceImpl implements ModelService {
  private nodeName: string
  private instanceName: string
  private model: any
  private deployingModel: any

  constructor(nodeName: string, instanceName: string, model: Object, deployingModel: Object) {
    this.nodeName = nodeName;
    this.instanceName = instanceName;
    this.model = model;
    this.deployingModel = deployingModel;
  }

  getName(): string {
    return this.instanceName
  }

  getPath(): string {
    return `nodes[${this.nodeName}]/components[${this.instanceName}]`
  }

  getNodeName(): string {
    return this.nodeName
  }

  getCurrentModel(): Object {
    return this.model
  }

  getDeployingModel(): Object {
    return this.deployingModel
  }

  getModelInstance(): Object {
    return (this.deployingModel || this.model).findByPath(this.getPath())
  }

  deploy(done: (err?: Error) => void): void {
    // todo
  }
}
