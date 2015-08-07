import {
  Component, Input, Output, Param, ModelService, LoggerService
} from '../main/kevoree-api'
import { Inject } from 'ts-injector'

@Component({ desc: 'This component does something' })
export class MyComp {

  @Param({ defaultValue: 9000 })
  private port: number

  @Param({ defaultValue: 'ws.kevoree.org' })
  private host: string

  @Inject('ModelService')
  private modelService: ModelService

  @Inject('LoggerService')
  private logger: LoggerService

  start(done: (err?: Error) => void): void {
    this.logger.info(`${this.modelService.getName()} started on node ${this.modelService.getNodeName()}`)
    done();
  }

  @Input()
  input(msg: string): void {
    console.log('input: '+msg);
  }

  @Input()
  input2(msg: string): void {
    console.log('input2: '+msg);
  }

  @Output()
  output(msg: string): void {}

  @Output()
  output2(msg: string): void {}
}
