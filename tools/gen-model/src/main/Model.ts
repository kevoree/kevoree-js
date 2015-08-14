export class Port {
  name: string;
  schema: any;
}

export class Param {
  name: string;
  type: string;
  default: any;
  fragmentDependant: boolean;
  optional: boolean;
}

export class DeployUnit {
  name: string;
  version: string;
}

export class Service {
  name: string;
  className: string;
}

export class Model {
  type: string;
  namespace: string;
  name: string;
  version: string;
  description: string;
  deployUnit: DeployUnit;
  inputs: Port[];
  outputs: Port[];
  params: Param[];
  services: Service[];

  constructor() {
    this.deployUnit = new DeployUnit();
    this.inputs = [];
    this.outputs = [];
    this.params = [];
    this.services = [];
  }
}
