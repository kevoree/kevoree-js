describe('JavascriptNode test', function mochaDescribe() {
  let instance;
  const JavascriptNode = KevoreeModuleLoader.require('kevoree-node-javascript', '5.4.0-alpha.5');
  const coreStub = {
    getLogger() {
      return {
        level: 'DEBUG',
        tag: 'StubLogger',
        info: function (tag, msg) {
          console.log('info '+tag+' '+msg);
        },
        debug: function (tag, msg) {
          console.log('debug '+tag+' '+msg);
        },
        warn: function (tag, msg) {
          console.log('warn '+tag+' '+msg);
        },
        error: function (tag, msg) {
          console.log('error '+tag+' '+msg);
        },
        setLevel: function () {},
        setFilter: function () {}
      };
    }
  };
  const elemStub = {
    name: 'node0',
    path: function () {
      return '/nodes['+this.name+']';
    }
  };

  beforeEach('create instance', (done) => {
    instance = new JavascriptNode(coreStub, elemStub, 'node0'); // jshint ignore:line
    instance.__start__(done);
  });

  it('should start the instance', (done) => {
    instance.start(done);
  });
});
