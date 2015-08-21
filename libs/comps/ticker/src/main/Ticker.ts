import { Component, Output, Param, DataType, Injectables } from 'kevoree-api';
import { Inject } from 'ts-injector';

@Component({
  desc: 'By default, the ticker will send the current timestamp in milliseconds'
+ ' once every 3000ms. This can be tweaked using the <strong>delay</strong>'
+ ' parameter. You can also change the output to a random number between'
+ ' [0, 100[ by setting the attribute <strong>random</strong> to <strong>true'
+ ' </strong>'})
class Ticker {
  private timerId: any;

  @Param({ defaultValue: 3000, datatype: DataType.INTEGER })
  private delay: number;

  @Param({ defaultValue: false })
  private random: boolean;

  @Output({ type: 'string' })
  private tick: OutputPort;

  @Inject(Injectables.LoggerService)
  private log: KevoreeLogger.Logger;

  @Inject(Injectables.ModelService)
  private modelService: ModelService;

  start(cb: Callback): void {
    this.log.info(`Starting ticker ${this.modelService.getName()}`, 'doing\nsome\ntest');
    this.timerId = setInterval(() => {
      var val: string;
      if (this.random) {
        val = (Math.round(Math.random()*100) + 1)+'';
      } else {
        val = new Date().getTime()+'';
      }
      this.tick.send(val);
    }, this.delay);
    cb();
  }

  stop(cb: Callback): void {
    this.log.warn(`Stopping ticker ${this.modelService.getName()}`);
    clearInterval(this.timerId);
    cb();
  }

  update(cb: Callback): void {
    this.log.debug(`Updating ticker ${this.modelService.getName()}`);
    this.stop(() => {
      this.start(cb);
    });
  }
}

export = Ticker;
