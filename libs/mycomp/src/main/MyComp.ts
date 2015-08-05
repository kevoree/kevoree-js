import {
  Component, Inject, Services, Param, Input, Output, ModelService, Callback
}  from 'kevoree-api'

@Component({desc: 'MyComp description is cool'})
class MyComp {

  @Inject(Services.ModelService)
  private modelService: ModelService

  @Inject(Services.LoggerService)
  private logger: Logger

  @Param({ defaultValue: 42 })
  private port: number

  @Param()
  private host: string

  /**
   * Called when this component starts
   * @param {Callback} done callback to call when you are done starting
   */
  start(done: Callback): void {
    this.logger.info(`${this.modelService.getName()} started`)
    done();
  }

  @Input
  input(msg: string): void {
    this.logger.info(`${this.modelService.getName()} incoming message: ${msg}`)
  }
}

export = MyComp