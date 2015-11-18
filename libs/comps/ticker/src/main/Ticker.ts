import {
    Component, Output, IntParam, BooleanParam, Injectables, ModelService,
    ContextService, Callback, OutputPort
} from 'kevoree-api';
import { Inject } from 'ts-injector';
import { Logger } from 'kevoree-logger';

@Component({
  description: 'By default, the ticker will send the current timestamp in '
+ ' milliseconds once every 3000ms. This can be tweaked using the '
+ ' <strong>delay</strong> parameter. You can also change the output to a '
+ ' random number between [0, 100[ by setting the attribute <strong>random'
+ '</strong> to <strong>true</strong>'})
class Ticker {
  private timerId: any;

  @IntParam({ default: 3000 })
  private delay: number;

  @BooleanParam({ default: false })
  private random: boolean;

  @Output({ type: 'string' })
  private tick: OutputPort;

  @Inject(Injectables.LoggerService)
  private log: Logger;

  @Inject(Injectables.ModelService)
  private modelService: ModelService;

  @Inject(Injectables.ContextService)
  private context: ContextService;

  start(): void {
    this.log.info('Starting');
    this.timerId = setInterval(() => {
      var val: string;
      if (this.random) {
        val = (Math.round(Math.random()*100) + 1)+'';
      } else {
        val = new Date().getTime()+'';
      }
      this.tick.send(val);
    }, this.delay);
  }

  stop(): void {
    this.log.info('Stopping');
    clearInterval(this.timerId);
  }

  update(): void {
    this.log.info('Updating');
    this.stop();
    this.start();
  }
}

export = Ticker;
