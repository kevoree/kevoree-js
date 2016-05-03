import { ReflectUtils, OnStart, Callback } from '../../main/kevoree-api';

describe('ReflectUtils.callOnStart', () => {
  const errorMsg = 'On purpose';

  it('sync', done => {
    class MyComp {
      @OnStart()
      start() {}
    }

    const c = new MyComp();
    ReflectUtils.callOnStart(c, done);
  });

  it('sync with error', done => {
    class MyComp {
      @OnStart()
      start() {
        throw new Error(errorMsg);
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStart(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('async', done => {
    class MyComp {
      @OnStart(true)
      start(done: Callback) {
        done();
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStart(c, done);
  });

  it('async with error', done => {
    class MyComp {
      @OnStart(true)
      start(done: Callback) {
        done(new Error(errorMsg));
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnStart(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('no @OnStart', done => {
    class MyComp {}

    const c = new MyComp();
    ReflectUtils.callOnStart(c, done);
  });
});
