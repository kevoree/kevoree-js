import {
    Component, Output, Param, Inject, Services, ModelService, ContextService,
    OutputPort, Min, OnStart, OnStop, OnUpdate
} from 'kevoree-api';
import { UIComponent, UIProp, Observer } from 'kevoree-ui';
import { Logger } from 'kevoree-logger';
import { TickerUI } from './TickerUI';

@Component({
  version: 1,
  description: `By default, the ticker will send the current timestamp in \
milliseconds once every 3000ms. This can be tweaked using the \
<strong>delay</strong> parameter. You can also change the output to a random \
number between [0, 100[ by setting the attribute <strong>random</strong> to \
<strong>true</strong>`
})
@UIComponent(TickerUI)
class Ticker {
  private timerId: any;

  @UIProp()
  private onTick: Observer<string>;

  @Min(0)
  @Param()
  private delay: number = 3000;

  @Param()
  private random: boolean = false;

  @Output({ type: 'string' })
  private tick: OutputPort;

  @Inject(Services.Logger)
  private log: Logger;

  @Inject(Services.Model)
  private modelService: ModelService;

  @Inject(Services.Context)
  private context: ContextService;

  @OnStart()
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
      this.onTick.dispatch(val);
    }, this.delay);
  }

  @OnStop()
  stop(): void {
    this.log.info('Stopping');
    clearInterval(this.timerId);
  }

  @OnUpdate()
  update(): void {
    this.log.info('Updating');
    this.stop();
    this.start();
  }
}

export = Ticker;
