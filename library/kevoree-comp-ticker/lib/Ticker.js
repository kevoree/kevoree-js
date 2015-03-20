var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {Ticker}
 */
var Ticker = AbstractComponent.extend({
    toString: 'Ticker',

    dic_random: { optional: true, defaultValue: false },
    dic_period: { optional: true, defaultValue: 3000, datatype: 'long' },

    construct: function () {
        this.value = null;
        this.count = 0;
    },

    start: function (done) {
        clearInterval(this.tickId);
        this.tickId = setInterval(function () {
            this.value = new Date().getTime();
            if (this.dictionary.getBoolean('random', false)) {
                this.value = parseInt(Math.random()*100);
            }
            this.out_tick(this.value);
            this.count++;
        }.bind(this), this.dictionary.getNumber('period', 3000));
        done();
    },

    stop: function (done) {
        clearInterval(this.tickId);
        done();
    },

    update: function (done) {
        this.stop(function () {
            this.start(done);
        }.bind(this));
    },

    /**
     * Output port "tick"
     */
    out_tick: function () {},

    uiController: function () {
        var that = this;
        return ['$scope', '$interval', function ($scope, $interval) {
            $scope.name = that.getName();
            $scope.value = that.value || '<no tick yet>';
            $scope.count = that.count;
            $interval(function () {
                $scope.value = that.value;
                $scope.count = that.count;
            }, 1000);
        }];
    }
});

module.exports = Ticker;
