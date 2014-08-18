// Created by leiko on 18/08/14 11:31

/**
 *
 * @param name
 * @param callback
 */
function timeoutHandler(name, callback) {
    var timedOut = false;

    var id = setTimeout(function () {
        // out of time
        timedOut = true;
        callback(new Error('Method '+name+' timed out (10000ms)'));
    }, 10000);

    return function () {
        if (!timedOut) {
            clearTimeout(id);
            callback.apply(callback, arguments);
        }
    };
}

module.exports = timeoutHandler;