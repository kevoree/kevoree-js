module.exports = function (model, statements, stmt, opts) {
    var instancePath = [];
    for (var i in stmt.children) {
        instancePath.push(statements[stmt.children[i].type](model, statements, stmt.children[i], opts));
    }

    return {
        raw: instancePath,
        /**
         * 'a.b.c' with expect(2, 4, function (err, one, two, three, four) {
         *   if (err) {
         *     // something went wrong with instancePath.expect parsing
         *   }
         *
         *   // when parsing 'a.b.c' with expect(2, 4, ...) you get:
         *   // one   === null
         *   // two   === 'a'
         *   // three === 'b'
         *   // four  === 'c'
         * }
         * @param min minimum expected values in instancePath (ex: a.b.c with "min" = 4 will return an error in callback)
         * @param max maximum expected values in instancePath (same as minimum but for maximum :D )
         * @param callback function (err, [arg0, arg1, ...])
         * @returns {*}
         */
        expect: function (min, max, callback) {
            if (instancePath.length > max || instancePath.length < min) {
                var err = new Error('InstancePath does not match requirements (path: '+instancePath.join('.')+', length: '+instancePath.length+', min: '+min+', max: '+max+')');
                err.pathLength = instancePath.length;
                err.expectedMin = min;
                err.expectedMax = max;
                return callback(err);
            }

            instancePath.unshift(null); // prepend null error value to params array
            // nullify missing value in path (ex: 'a.b.c' with expect(2, 4, function (err, one, two, three, four) { }
            // will nullify 'one' and shift values so you get two => a, three => b and four => c
            for (var i=instancePath.length-1; i < max; i++) instancePath.unshift(null);
            return callback.apply(null, instancePath);
        },

        toString: function () {
            // remove useless dots
            return instancePath.join('.').replace(/^\.*/g, '');
        }
    };
};