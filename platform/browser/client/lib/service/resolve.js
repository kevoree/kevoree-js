module.exports = function (deployUnit, forceInstall, callback) {
  $.ajax({
    type: 'POST',
    url: 'resolve',
    data: {
      type: deployUnit.type,
      name: deployUnit.name,
      version: deployUnit.version,
      forceInstall: forceInstall
    },
    success: function (res) {
      callback(null, res);
    },
    error: function (err) {
      callback(err);
    }
  });
}