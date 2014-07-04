exports.serverTest = {
    setUp: function(done) {
        // setup here
        done();
    },
    bootstrap: function (test) {
        test.expect(1);
        test.equal(1, 1, 'cool');
        test.done();
    }
};