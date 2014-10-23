// Created by leiko on 13/10/14 16:04

module.exports = function (server) {
    return function (ws, msg) {
        if (msg.dest && msg.message) {
            if (typeof msg.dest === 'object' && msg.dest instanceof Array) {
                // msg.dest is an array of IDs
                msg.dest.forEach(function (id) {
                    server.send(id, msg.message);
                });

            } else if (Object.prototype.toString.call(msg.dest) === '[object String]') {
                // msg.dest is a String
                server.send(msg.dest, msg.message);

            } else {
                throw new Error('Unable to parse "send" message (msg.dest must be an array of string IDs or a string)');
            }
        } else {
            throw new Error('Unable to parse "send" message (msg.dest or msg.message are undefined)');
        }
    };
};