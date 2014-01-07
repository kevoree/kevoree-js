var assert = require("assert");
var WSGroup = require('../kevoree-group-websocket');

describe('Kevoree WSGroup', function () {
    var grp = new WSGroup();

    describe('#startNode()', function () {
        it('should start WebSocketGroup', function () {
            grp.start();
        });
    });
    describe('#updateNode()', function () {
        it('should update WebSocketGroup', function () {
            grp.update();
        });
    });
    describe('#stopNode()', function () {
        it('should stop WebSocketGroup', function () {
            grp.stop();
        });
    });
});

