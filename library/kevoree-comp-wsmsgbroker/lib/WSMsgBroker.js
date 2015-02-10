var AbstractComponent = require('kevoree-entities').AbstractComponent;
var WSBroker = require('wsmsgbroker');
var chalk = require('chalk');

/**
 * Kevoree component
 * @type {WSMsgBroker}
 */
var WSMsgBroker = AbstractComponent.extend({
    toString: 'WSMsgBroker',

    dic_port: { optional: false, datatype: 'number' },
    dic_path: { },

    /**
     * this method will be called by the Kevoree platform when your component has to start
     * @param {Function} done
     */
    start: function (done) {
        var port = this.dictionary.getNumber('port');
        if (port) {
            var path = this.dictionary.getString('path', '');

            // create a new WSMsgBroker server
            this.server = new WSBroker.Server(port, path);
            this.log.info(this.toString(), '"'+this.getName()+'" listen on 0.0.0.0:'+port+path);

            // register some event listeners on it
            this.server.on('error', function (err) {
                this.log.error(this.toString(), '"'+this.getName()+'" broker error: '+err.message);
            }.bind(this));

            this.server.on('warn', function (err) {
                this.log.warn(this.toString(), '"'+this.getName()+'" broker warning: '+err.message);
            }.bind(this));

            this.server.on('registered', function (id) {
                this.log.info(this.toString(), '"'+this.getName()+'" '+chalk.green('+')+' '+id);
            }.bind(this));

            this.server.on('unregistered', function (id) {
                this.log.info(this.toString(), '"'+this.getName()+'" '+chalk.yellow('-')+' '+id);
            }.bind(this));

            done();

        } else {
            done(new Error('You must set a value to "'+this.getName()+'.port"'));
        }
    },

    /**
     * this method will be called by the Kevoree platform when your component has to stop
     * @param {Function} done
     */
    stop: function (done) {
        if (this.server != null) {
            this.server.close();
        }
        done();
    },

    update: function (done) {
        this.stop(function () {
            this.start(done);
        }.bind(this));
    }
});

module.exports = WSMsgBroker;
