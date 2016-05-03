import {
  ReflectUtils, OnStart, OnStop, OnUpdate, Callback
} from '../../main/kevoree-api';

describe('ReflectUtils.callOnUpdate', () => {
  const errorMsg = 'On purpose';

  it('sync', done => {
    class MyComp {
      @OnUpdate()
      update() {}
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, done);
  });

  it('sync with error', done => {
    class MyComp {
      @OnUpdate()
      update() {
        throw new Error(errorMsg);
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('async', done => {
    class MyComp {
      @OnUpdate(true)
      update(done: Callback) {
        done();
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, done);
  });

  it('async with error', done => {
    class MyComp {
      @OnUpdate(true)
      update(done: Callback) {
        done(new Error(errorMsg));
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, err => {
      if (err.message === errorMsg) {
        done();
      }
    });
  });

  it('no @OnUpdate', done => {
    class MyComp {}

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, done);
  });

  it('classic sync update', done => {
    class MyComp {
      @OnStart()
      start() {}

      @OnStop()
      stop() {}

      @OnUpdate()
      update() {
        this.stop();
        this.start();
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, done);
  });

  it('classic async update', done => {
    class MyComp {
      @OnStart(true)
      start(done: Callback) {
        done();
      }

      @OnStop()
      stop() {}

      @OnUpdate(true)
      update(done: Callback) {
        this.stop();
        this.start(done);
      }
    }

    const c = new MyComp();
    ReflectUtils.callOnUpdate(c, done);
  });
});
