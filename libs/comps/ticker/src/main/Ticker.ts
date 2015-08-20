import { Component, Output, Param, Async } from 'kevoree-api';
import { Inject } from 'ts-injector';

@Component({ desc: '' })
class Ticker {
  private timerId: any;

  @Param()
  private delay: number = 3000;

  @Param()
  private random: boolean = false;

  @Output({ type: 'string' })
  private tick: OutputPort;

  start(cb: Callback): void {
    this.timerId = setInterval(() => {
      var val: string;
      if (this.random) {
        val = Math.floor(Math.random()*100)+'';
      } else {
        val = new Date().getTime()+'';
      }
      this.tick.send(val);
    }, this.delay);
    cb();
  }

  stop(cb: Callback): void {
    clearInterval(this.timerId);
    cb();
  }

  update(cb: Callback): void {
    this.stop(() => {
      this.start(cb);
    });
  }
}

export = Ticker;
