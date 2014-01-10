var getJSONModel = require('kevoree-model-sync').getJSONModel;
var kevoree = require('kevoree-library').org.kevoree;

var serializer = new kevoree.serializer.JSONModelSerializer();

module.exports = function (req, res) {
  if (req.query.name) {
    var version = undefined;
    if (req.query.version.length > 0) version = req.query.version;
    getJSONModel(req.query.name, version, function (err, model) {
      if (err) return res.jsonp({ result: -1, message: err.message });

      return res.jsonp({
        result: 1,
        message: 'ok',
        model: serializer.serialize(model)
      });
    });
  } else {
    return res.jsonp({
      result: -1,
      message: 'Unable to retrieve "name" and/or "version" parameters from request.'
    });
  }
}