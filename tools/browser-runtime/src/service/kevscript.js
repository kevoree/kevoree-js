import KevScript from 'kevoree-kevscript';

export default class KevScriptService extends KevScript {

  constructor(loggerService, defaultScript) {
    super(loggerService.create('KevScript'));
    this.script = defaultScript;
  }

}
