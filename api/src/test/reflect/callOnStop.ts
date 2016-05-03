import { ReflectUtils, OnStop, Callback } from '../../main/kevoree-api';

describe('ReflectUtils.callOnStop', () => {
  const errorMsg = 'On purpose';

  it('sync', done => {
    class MyComp {
      @OnStop()
      stop() {}
    }

    const c = new MyComp();
    ReflectUtils.callOnStop(c, done);
  });

  it('sync with error', done => {
    class MyComp {
      @OnStop()
      stop() {
        throw new Error(errorMsg);
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStop(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('async', done => {
    class MyComp {
      @OnStop(true)
      stop(done: Callback) {
        done();
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStop(c, done);
  });

  it('async with error', done => {
    class MyComp {
      @OnStop(true)
      stop(done: Callback) {
        done(new Error(errorMsg));
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStop(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('no @OnStop', done => {
    class MyComp {}

    const c = new MyComp();
    ReflectUtils.callOnStop(c, done);
  });
});
