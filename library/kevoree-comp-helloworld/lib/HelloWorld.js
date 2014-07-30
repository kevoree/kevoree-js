var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {HelloWorldComponent}
 */
var HelloWorldComponent = AbstractComponent.extend({
    toString: 'HelloWorldComponent',

    construct: function () {
        this.id = null;
    },

    /**
     * Component start
     */
    start: function () {
        this._super();

        this.id = setInterval(function () {
            // send a message through output port 'sendText' every 2 seconds
            this.out_sendText('hello world '+(new Date()));
        }.bind(this), 2000);

        this.setUIContent('<p>Hello world</p>', function (err) {
            if (err) {
                this.log.info(this.toString(), 'Hello world!');
            }
        });
    },

    /**
     * Component stop
     */
    stop: function () {
        this._super();
        clearInterval(this.id);
        this.id = null;
    },

    // define an output port called "sendText" (this will be bind later with a function to send your messages through it)
    // to prevent platform from exploding if there is no channel bind to output port, you should give an empty function
    // that does nothing, just keep away from troubles =)
    out_sendText: function () {},

    // print messages to std output when received from input port 'fake'
    in_fake: function (msg) {
        this.log.info(this.toString(), "Message received: "+ msg);
    }
});

module.exports = HelloWorldComponent;