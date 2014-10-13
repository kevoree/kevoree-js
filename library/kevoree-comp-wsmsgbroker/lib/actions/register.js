// Created by leiko on 13/10/14 16:04
module.exports = function (server) {
    return function (ws, msg) {
        if (msg.id) {
            server.register(msg.id, ws);
        } else {
            throw new Error('Unable to parse "register" message (msg.id is undefined)');
        }
    };
};