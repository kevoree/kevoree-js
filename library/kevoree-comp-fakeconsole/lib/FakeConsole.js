var AbstractComponent = require('kevoree-entities').AbstractComponent,
    view = require('./../generated-ui/view');

var PROXY = false;

var FakeConsole = AbstractComponent.extend({
    toString: 'FakeConsole',

    dic_proxy: {
        optional: true,
        defaultValue: PROXY,
        datatype: 'boolean'
    },

    start: function (done) {
        this._super(function () {
            this.setUIContent(view({btn: 'Send msg!'}), function (err, root) {
                if (err) {
                    // no KevoreeUI provided by runtime (NodeJS platform obviously)
                    this.log.info(this.toString(), 'FakeConsole setUIContent in NodeJS runtime!');

                } else {
                    // view set successfully
                    var msgInput = root.querySelector('#msg'),
                        sendBtn  = root.querySelector('#send');
                    var sendMsg = function() {
                        if (msgInput.value.length > 0) {
                            // update message list
                            this.addMessageUI('<', msgInput.value);
                            // send it through output port 'sendMsg'
                            this.out_sendMsg(msgInput.value);
                        }
                    }.bind(this);

                    // send message on click event if value.length > 0
                    sendBtn.onclick = sendMsg;

                    // send message on 'enter' key keyup event if value.length > 0
                    msgInput.onkeyup = function (e) {
                        if (e && e.keyCode && e.keyCode == 13) {
                            // 'enter' key pressed
                            sendMsg();
                        }
                    };
                }
            });

            done();
        }.bind(this));
    },

    stop: function (done) {
        this._super(done);
    },

    in_inMsg: function (msg) {
        var proxy = this.dictionary.getBoolean('proxy', PROXY);
        if (proxy) {
            this.out_sendMsg(msg);
        }

        this.addMessageUI('>', msg);
    },

    out_sendMsg: function (msg) {},

    addMessageUI: function(tag, msg) {
        var root = this.getUIRoot();
        if (root == null) {
            // TODO handle no UI version
            this.log.debug(this.toString(), tag+' '+msg);
        } else {
            var msgList = root.querySelector('#msg-list');
            msgList.innerHTML += '<dt>'+(new Date().toTimeString().split(' ')[0])+' '+tag+'</dt><dd>'+msg+'</dd>';
        }
    }
});

module.exports = FakeConsole;