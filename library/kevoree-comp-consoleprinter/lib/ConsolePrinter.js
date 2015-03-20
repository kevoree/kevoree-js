var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
    toString: 'ConsolePrinter',

    construct: function () {
        this.lines = [];
    },

    in_input: function (msg) {
        var line = this.getName() + '>' + msg;
        this.lines.push(line);
        console.log(line);
    },

    uiController: function () {
        var that = this;
        return ['$scope', '$interval', function ($scope, $interval) {
            $scope.name = that.getName();
            $scope.lines = that.lines;

            $interval(function () {
                $scope.lines = that.lines;
            }, 1000);
        }];
    }
});

module.exports = ConsolePrinter;
