module.exports = function(kevoree, logger) {

  function FakeComp() {
    kevoree.createComponent(this);
  }

  kevoree.registerNode('FakeComp', FakeComp);

  FakeComp.prototype.start = function() {
    logger.info('comp start');
  };

  FakeComp.prototype.stop = function() {
    logger.info('comp stop');
  };
};
