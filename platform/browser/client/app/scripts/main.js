'use strict';

var BrowserRuntime = require('../../lib/engine/BrowserRuntime');

$(function () {
    var runtime = new BrowserRuntime();
    console.log('BrowserRuntime created', runtime);
});