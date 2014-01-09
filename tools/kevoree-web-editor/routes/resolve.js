var getJSONModel = require('kevoree-model-sync').getJSONModel;
var kevoree = require('kevoree-library').org.kevoree;

var serializer = new kevoree.serializer.JSONModelSerializer();

module.exports = function (req, res) {
  if (req.xhr) {
    if (req.body.name) {
      var version = undefined;
      if (req.body.version.length > 0) version = req.body.version;
      getJSONModel(req.body.name, version, function (err, model) {
        if (err) return res.json({ result: -1, message: err.message });

        return res.json({
          result: 1,
          message: 'ok',
          model: serializer.serialize(model)
        });
      });
    } else {
      return res.json({
        result: -1,
        message: 'Unable to retrieve "name" and/or "version" parameters from request.'
      });
    }

  } else {
    return res.json({
      result: -1,
      message: 'Request must be an XHR'
    });
  }
}