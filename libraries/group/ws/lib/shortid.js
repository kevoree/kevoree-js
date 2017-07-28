'use strict';

var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function () {
  var id = '';
  for( var i=0; i < 5; i++ ) {
    id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return id;
};
