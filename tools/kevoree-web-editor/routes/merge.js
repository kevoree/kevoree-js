/*
 * POST json model
 */
var async = require('async');
var kevoree = require('kevoree-library').org.kevoree;

var factory    = new kevoree.impl.DefaultKevoreeFactory(),
    serializer = new kevoree.serializer.JSONModelSerializer(),
    compare    = new kevoree.compare.DefaultModelCompare();

module.exports = function(req, res) {
  if (req.xhr) {
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

                console.log('');
                // handler process succeed
                compare.merge(fullModel, model).applyOn(fullModel);
                taskCb();
              });
            });
          })(req.body.libz[platform], platform);
        }
        
        async.series(asyncTasks, function (err) {
          if (err) return res.json({
            result: -1,
            message: 'Unable to merge models.\nError: '+err.message
          });
          
          // all async tasks ended successfully
          return res.json({
            result: 1,
            message: 'Model merged successfully',
            model: JSON.parse(serializer.serialize(fullModel))
          });
        });

      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          return res.json({
            result: -1,
            message: 'Unable to merge libraries (handler not found)'
          });
        }
        return res.json({
          result: -1,
          message: 'Something went wrong while merging core libraries (POST /merge). Error: '+err.message
        });
      }

    } else {
      return res.json({
        result: -1,
        message: 'You are supposed to give an array of libraries to load'
      });
    }

  } else {
    return res.json({
      result: -1,
      message: 'Request must be an XHR'
    });
  }
};