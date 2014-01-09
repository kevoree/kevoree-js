var path = require('path');

var jarPATH = 'target';

exports.ROUTE_PREFIX = '/';
exports.JARS_PATH    = jarPATH;
exports.KEV_JAR      = path.resolve(jarPATH, 'tools.editor.server-0.0.1-jar-with-dependencies.jar');
exports.PORT         = 3042;
exports.CLEAR_LIBS   = 1000*60*60; // downloaded libraries will be cleared every hour
