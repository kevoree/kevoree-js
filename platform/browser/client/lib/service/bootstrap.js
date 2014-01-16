module.exports = function (nodeName, callback) {
  $.ajax({
    type: 'POST',
    url: 'bootstrap',
    data: { nodename: nodeName },
    success: function (res) {
      callback(null, res);
    },
    error: function (err) {
      callback(err);
    }
  });
}