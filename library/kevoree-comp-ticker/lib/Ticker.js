var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {Ticker}
 */
var Ticker = AbstractComponent.extend({
    toString: 'Ticker',

    dic_random: { optional: true, defaultValue: false },
    dic_period: { optional: true, defaultValue: 3000, datatype: 'long' },

    start: function (done) {
        this.tickId = setInterval(function () {
            var value = new Date().getTime();
            if (this.dictionary.getBoolean('random', false)) {
                value = parseInt(Math.random()*100);
            }
            this.out_tick(value);
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
    out_tick: function () {}
});

module.exports = Ticker;
