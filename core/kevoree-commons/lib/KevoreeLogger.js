var Class  = require('pseudoclass'),
    colors = require('colors');

var KevoreeLogger = Class({
  toString: 'KevoreeLogger',

  construct: function (tag) {
    this.tag = tag;
  },

  info: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.log(getTime()+'  '+'INFO'.grey+'   '+processTag(tag)+'  '+msg.grey);
  },

  warn: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.warn(getTime()+'  '+'WARN'.grey.yellowBG+'   '+processTag(tag)+'  '+msg.yellow);
  },

  error: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.error(getTime()+'  '+'ERROR'.white.redBG+'  '+processTag(tag)+'  '+msg.red);
  },

  debug: function (tag, msg) {
    if (typeof(msg) == 'undefined') {
      msg = tag;
      tag = this.tag;
    }
    console.log(getTime()+'  '+'DEBUG '.cyan+' '+processTag(tag)+'  '+msg.cyan);
  }
});

var processTag = function processTag(tag) {
  if (tag.length >= 15) {
    tag = tag.substr(0, 14)+'.';
  } else {
    var spaces = '';
    for (var i=0; i < 15 - tag.length; i++) spaces += ' ';
    tag += spaces;
  }

  return (tag+'').magenta;
}

var getTime = function getTime() {
  var time = new Date;
  var hours = (time.getHours().toString().length == 1) ? '0'+time.getHours() : time.getHours();
  var mins = (time.getMinutes().toString().length == 1) ? '0'+time.getMinutes() : time.getMinutes();
  var secs = (time.getSeconds().toString().length == 1) ? '0'+time.getSeconds() : time.getSeconds();
  return (hours+':'+mins+':'+secs).grey;
}

module.exports = KevoreeLogger;