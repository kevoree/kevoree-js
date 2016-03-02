import {
    Component, Output, Param, Inject, Services, ModelService, ContextService,
    Callback, OutputPort, Min, Start, Stop, Update
} from 'kevoree-api';
import { Logger } from 'kevoree-logger';

@Component({
  version: 1,
  description: 'By default, the ticker will send the current timestamp in '
+ ' milliseconds once every 3000ms. This can be tweaked using the '
+ ' <strong>delay</strong> parameter. You can also change the output to a '
+ ' random number between [0, 100[ by setting the attribute <strong>random'
+ '</strong> to <strong>true</strong>'})
class Ticker {
  private timerId: any;

  @Param
  @Min(0)
  private delay: number = 3000;

  @Param
  private random: boolean = false;

  @Output({ type: 'string' })
  private tick: OutputPort;

  @Inject(Services.Logger)
  private log: Logger;

  @Inject(Services.Model)
  private modelService: ModelService;

  @Inject(Services.Context)
  private context: ContextService;

  @Start()
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

  @Stop()
  stop(): void {
    this.log.info('Stopping');
    clearInterval(this.timerId);
  }

  @Update()
  update(): void {
    this.log.info('Updating');
    this.stop();
    this.start();
  }
}

export = Ticker;
