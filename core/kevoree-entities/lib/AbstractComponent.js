var KevoreeEntity = require('./KevoreeEntity'),
    Port          = require('./Port'),
    KevoreeUI     = require('./KevoreeUI');

/**
 * AbstractComponent entity
 *
 * @type {AbstractComponent} extends KevoreeEntity
 */
var AbstractComponent = KevoreeEntity.extend({
    toString: 'AbstractComponent',

    construct: function () {
        this.inputs = {};
        this.ui = new KevoreeUI(this);
    },

    start: function (_super) {
        _super.call(this);
        this.ui.name = this.name; // default ui name is component name
    },

    stop: function () {
        if (this.ui.isReady()) {
            // there is an UI running for this comp
            // remove it
            this.ui.destroy();
        }
    },

    addInternalInputPort: function (port) {
        this.inputs[port.getPath()] = port;
        if (typeof(this[AbstractComponent.IN_PORT+port.getName()]) === 'undefined') {
            throw new Error("Unable to find provided port '"+AbstractComponent.IN_PORT+port.getName()+"' (Function defined in class?)");
        } else port.setInputPortMethodName(AbstractComponent.IN_PORT+port.getName());
    },

    addInternalOutputPort: function (port) {
        this[AbstractComponent.OUT_PORT+port.getName()] = function (msg) {
            port.processSend(msg);
        };
    },

    removeInternalInputPort: function (port) {
        delete this.inputs[port.getPath()];
    },

    removeInternalOutputPort: function (port) {
        this[AbstractComponent.OUT_PORT+port.getName()] = function () {}; // reset function binding to an empty one
    },

    /**
     *
     * @param content
     * @param callback function(err) if 'err' is defined then something went wrong. Using 'this' in this callback refers
     * to the current component instance
     */
    setUIContent: function (content, callback) {
        callback = callback.bind(this) || function () {};
        var self = this;

        if (this.ui.isReady()) {
            this.ui.setContent(content);
            return callback(null, this.ui.getRoot());

        } else {
            this.ui.initialize(this, this.kCore.getUICommand(), function (err) {
                if (err) return callback(err);

                self.ui.setContent(content);
                return callback(null, self.ui.getRoot());
            });
        }
    },

    getUIRoot: function () {
        return this.ui.getRoot();
    }
});

AbstractComponent.IN_PORT = 'in_';
AbstractComponent.OUT_PORT = 'out_';

module.exports = AbstractComponent;