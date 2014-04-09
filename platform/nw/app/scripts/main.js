global.$ = $;
global.document = document;
global.window = window;
global.RuntimeTemplates = RuntimeTemplates;

var BrowserRuntime = require('./lib/engine/BrowserRuntime');
var gui  = require('nw.gui');

/**
 * Created by leiko on 26/03/14.
 */
$(function () {
    var runtime = new BrowserRuntime(gui);
    console.log('BrowserRuntime created', runtime);
});