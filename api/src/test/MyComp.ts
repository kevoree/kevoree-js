import {
  Component, Inject, Input, Output, Param, Services, ModelService
} from '../main/api'

@Component({ desc: 'This component does something' })
export class MyComp {

  @Param({ defaultValue: 9000 })
  private port: number

  @Param({ defaultValue: 'ws.kevoree.org' })
  private host: string

  @Inject(Services.ModelService)
  private modelService: ModelService

  @Inject(Services.LoggerService)
  private logger: Logger

  start(done: (err?: Error) => void): void {
    console.log('MyComp level');
    this.logger.info(`${this.modelService.getName()} started on node ${this.modelService.getNodeName()}`)
    done();
  }

  @Input
  input(msg: string): void {
    console.log('input: '+msg);
  }

  @Input
  input2(msg: string): void {
    console.log('input2: '+msg);
  }

  @Output
  output(msg: string): void {}

  @Output
  output2(msg: string): void {}
}
