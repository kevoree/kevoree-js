/*
 * POST json model
 */
var async = require('async');
var kevoree = require('kevoree-library').org.kevoree;

var factory    = new kevoree.impl.DefaultKevoreeFactory(),
  serializer = new kevoree.serializer.JSONModelSerializer(),
  compare    = new kevoree.compare.DefaultModelCompare();

module.exports = function(req, res) {
  req.body.libz = req.body.libz || req.query.libz; // works whether it is a POST or a GET
  if (req.body.libz) {
    try {
      var asyncTasks = [];
      var fullModel = factory.createContainerRoot();
      for (var platform in req.body.libz) {
        (function (libraries, platform) {
          asyncTasks.push(function (taskCb) {
            var handler = require('./merge/'+platform);
            handler(libraries, function (err, model) {
              if (err) return taskCb(err);

              // handler process succeed
              compare.merge(fullModel, model).applyOn(fullModel);
              taskCb();
            });
          });
        })(req.body.libz[platform], platform);
      }

      async.series(asyncTasks, function (err) {
        if (err) return res.jsonp({
          result: -1,
          message: 'Unable to merge models.\nError: '+err.message
        });

        // all async tasks ended successfully
        return res.jsonp({
          result: 1,
          message: 'Model merged successfully',
          model: JSON.parse(serializer.serialize(fullModel))
        });
      });

    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        return res.jsonp({
          result: -1,
          message: 'Unable to merge libraries (handler not found)'
        });
      }
      return res.jsonp({
        result: -1,
        message: 'Something went wrong while merging core libraries (POST /merge). Error: '+err.message
      });
    }

  } else {
    return res.jsonp({
      result: -1,
      message: 'You are supposed to give an array of libraries to load'
    });
  }
};
