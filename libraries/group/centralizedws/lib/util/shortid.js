var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

module.exports = function shortid(length) {
	if (typeof length === 'undefined') {
		length = 5;
	}
  var id = '';
  for( var i=0; i < length; i++ ) {
    id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return id;
};
