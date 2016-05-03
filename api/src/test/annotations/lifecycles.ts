import 'reflect-metadata';
import {
    Component, Channel, OnStart, OnStop, OnUpdate, OnMessage, MetaData,
    LifecycleMeta, Callback
} from '../../main/kevoree-api';
import * as Assert from 'assert';

describe('Lifecycle annotations', () => {
  describe('synchronous methods', () => {
    @Component({ version: 1 })
    class MyComp {
        @OnStart()
        start() {}

        @OnStop()
        stop() {}

        @OnUpdate()
        update() {}

        @OnMessage()
        onMessage(msg: string) {}
    }

    it('@OnStart()', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_START, MyComp.prototype);
        Assert.equal(meta.name, 'start');
        Assert.equal(meta.async, false);
    });

    it('@OnStop()', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_STOP, MyComp.prototype);
        Assert.equal(meta.name, 'stop');
        Assert.equal(meta.async, false);
    });

    it('@OnUpdate()', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_UPDATE, MyComp.prototype);
        Assert.equal(meta.name, 'update');
        Assert.equal(meta.async, false);
    });

    it('@OnMessage()', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_MESSAGE, MyComp.prototype);
        Assert.equal(meta.name, 'onMessage');
    });
  });

  describe('asynchronous methods', () => {
    @Component({ version: 1 })
    class AsyncComp {
        @OnStart(true)
        start(cb: Callback) {
            cb();
        }

        @OnStop(true)
        stop(cb: Callback) {
            cb();
        }

        @OnUpdate(true)
        update(cb: Callback) {
            cb();
        }
    }

    it('@OnStart(true)', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_START, AsyncComp.prototype);
        Assert.equal(meta.name, 'start');
        Assert.equal(meta.async, true);
    });

    it('@OnStop(true)', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_STOP, AsyncComp.prototype);
        Assert.equal(meta.name, 'stop');
        Assert.equal(meta.async, true);
    });

    it('@OnUpdate(true)', () => {
        var meta: LifecycleMeta = Reflect.getMetadata(MetaData.ON_UPDATE, AsyncComp.prototype);
        Assert.equal(meta.name, 'update');
        Assert.equal(meta.async, true);
    });
  });

  describe('error on wrong signature', () => {
    it('@OnStart(true) without callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStart(true)
              start() {}
          }
      });
    });

    it('@OnStop(true) without callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStop(true)
              stop() {}
          }
      });
    });

    it('@OnUpdate(true) without callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnUpdate(true)
              update() {}
          }
      });
    });

    it('@OnStart() with callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStart()
              start(cb: Callback) {}
          }
      });
    });

    it('@OnStop() with callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStop()
              stop(cb: Callback) {}
          }
      });
    });

    it('@OnUpdate() with callback must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnUpdate()
              update(cb: Callback) {}
          }
      });
    });

    it('@OnMessage() with wrong signature must throw error', () => {
      Assert.throws(() => {
          @Channel({ version: 1 })
          class WrongChan {
              @OnMessage()
              onMessage(msg: number) {}
          }
      });
    });
  });

  describe('error on duplicate', () => {
    it('@OnStart() duplicate must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStart()
              start() {}

              @OnStart()
              start2() {}
          }
      });
    });

    it('@OnStop() duplicate must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnStop()
              stop() {}

              @OnStop()
              stop2() {}
          }
      });
    });

    it('@OnUpdate() duplicate must throw error', () => {
      Assert.throws(() => {
          @Component({ version: 1 })
          class WrongComp {
              @OnUpdate()
              update() {}

              @OnUpdate()
              update2() {}
          }OnStop
      });
    });

    it('@OnMessage() duplicate must throw error', () => {
      Assert.throws(() => {
          @Channel({ version: 1 })
          class WrongChan {
              @OnMessage()
              onMessage() {}

              @OnMessage()
              onMessage1() {}
          }
      });
    });
  });
});
