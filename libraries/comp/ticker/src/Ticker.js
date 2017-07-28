const AbstractComponent = require('kevoree-entities/lib/AbstractComponent');

/**
 * Kevoree component
 * @type {Ticker}
 */
module.exports = AbstractComponent.extend({
	toString: 'Ticker',
	tdef_version: 1,

	dic_random: { optional: true, defaultValue: false },
	dic_period: { optional: true, defaultValue: 3000, datatype: 'long' },

	start(done) {
		clearInterval(this.tickId);
		this.tickId = setInterval(() => {
			let value;
			if (this.dictionary.getBoolean('random', false)) {
				value = parseInt(Math.random() * 100, 10);
			} else {
				value = Date.now();
			}
			this.out_tick(value);
		}, this.dictionary.getNumber('period', 3000));
		done();
	},

	stop(done) {
		clearInterval(this.tickId);
		done();
	},

	update(done) {
		this.stop(() => {
			this.start(done);
		});
	},

	/**
	 * Output port "tick"
	 */
	out_tick() {}
});
