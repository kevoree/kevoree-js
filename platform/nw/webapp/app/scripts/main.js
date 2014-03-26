global.$ = $;
global.document = document;
global.window = window;
global.RuntimeTemplates = RuntimeTemplates;

var BrowserRuntime = require('./lib/engine/BrowserRuntime');

/**
 * Created by leiko on 26/03/14.
 */
$(function () {
    var runtime = new BrowserRuntime();
    console.log('BrowserRuntime created', runtime);
});