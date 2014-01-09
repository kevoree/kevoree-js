/**
 * Tries to load core libraries if an handler is found
 *
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 8/21/13
 * Time: 10:02 AM
 */

var config = require('../config.js');

module.exports = function (req, res) {
  if (req.xhr) {
    // request is XHR: ok
    if (req.query.platform) {
      // request param found: ok
      try {
        var handler = require('./load/'+req.query.platform);
        handler(function (err, libraries) {
          if (err) {
            // something went wrong while handling load
            return res.json({
              result: -1,
              message: err.message
            });
          }
          
          // core libraries loaded successfully =)
          return res.json({
            result: 1,
            message: 'Ok',
            libraries: libraries
          });
        });
        
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          // unable to find requested handler (meaning that the server does not know how to handle req.query.platform)
          return res.json({
            result: -1,
            message: 'Unable to load libraries for platform "'+req.query.platform+'" (I do not know how to handle this platform)'
          });
        }
        // something went wrong while handling load :/
        return res.json({
          result: -1,
          message: 'Something went wrong while loading core libraries (GET /load). Error: '+err.message
        });
      }
    } else {
      return res.json({
        result: -1,
        message: 'GET /load expects query parameter "platform" to be given'
      });
    }

  } else {
    return res.json({
      result: -1,
      message: 'GET /load only allows XHR requests'
    });
  }
};