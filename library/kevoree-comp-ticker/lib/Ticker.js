var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {Ticker}
 */
var Ticker = AbstractComponent.extend({
    toString: 'Ticker',

    dic_random: {
      optional: true,
      defaultValue: false
    },

    dic_period: {
        optional: true,
        defaultValue: 3000,
        datatype: 'long'
    },

    start: function (done) {
        this._super(function () {
            this.tick();
            done();
        }.bind(this));
    },

    stop: function (done) {
        this._super(function () {
            clearInterval(this.tickId);
            done();
        }.bind(this));
    },

    update: function (done) {
        this._super(function () {
            this.stop(function () {
                this.start(done);
            }.bind(this));
        }.bind(this));
    },

    out_tick: function () {},

    tick: function () {
        this.tickId = setInterval(function () {
            var value = new Date().getTime();
            if (this.dictionary.getBoolean('random', false)) {
                value = parseInt(Math.random()*100);
            }
            this.out_tick(value);
        }.bind(this), this.dictionary.getNumber('period', 3000));
    }
});

module.exports = Ticker;
