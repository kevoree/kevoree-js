var expect = require('chai').expect;
var path = require('path');

var DockerHandler = require('../lib/DockerHandler');

describe('DockerHandler tests', function () {
    var handler = new DockerHandler();
    var kevoreejs_cont = 'kevoreejs_test';
    var otherimg_cont = 'otherimg_test';

    describe('#listImages(callback)', function () {
        it('should list Docker images', function (done) {
            this.timeout(5000);

            handler.listImages(function (err, imgs) {
                expect(err).to.be.a('null');
                expect(imgs).to.be.an('array');
                done();
            });
        });
    });

    describe('#createContainer({name: "kevoreejs_cont", ...}, callback)', function () {
        it('should create a container with kevoree/js image', function (done) {
            this.timeout(10000);

            var containerConf = {
                Image:      'kevoree/js:test_img',
                name:       kevoreejs_cont,
                Memory:     1042*1024*1024,
                CpuShares:  1,
                Cmd:        ['-n', 'roberto', '-g', 'carlos']
            };
            handler.createContainer(containerConf, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });

    describe('#startContainer("kevoreejs_cont", callback)', function () {
        it('should start "kevoreejs_cont" container', function (done) {
            this.timeout(20000);

            handler.startContainer(kevoreejs_cont, function (err) {
                expect(err).to.be.a('null');
                // wait for kevoree-js runtime to download his deploy units and stuff
                done();
            });
        });
    });

    describe('#commitContainer(container, conf, callback)', function () {
        it('should commit previous container images', function (done) {
            this.timeout(10000);

            var commitConf = {
                repo: 'kevoree/js',
                tag: 'test_img',
                m: 'Commit message',
                author: 'Maxime Tricoire <[max.tricoire@gmail.com](mailto:max.tricoire%40gmail.com)>'
            };

            handler.commitContainer(kevoreejs_cont, commitConf, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });

    describe('#stopContainer("kevoreejs_cont", callback)', function () {
        it('should stop "kevoreejs_cont" container', function (done) {
            this.timeout(10000);

            handler.stopContainer(kevoreejs_cont, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });

    describe('#removeContainer("kevoreejs_cont", callback)', function () {
        it('should remove "kevoreejs_cont" container', function (done) {
            this.timeout(10000);

            handler.removeContainer(kevoreejs_cont, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });

    describe('#createContainer({name: "otherimg_cont", ...}, callback)', function () {
        it('should create a container using maxleiko/nodejs image', function (done) {
            this.timeout(10000);

            var containerConf = {
                Image:      'maxleiko/nodejs',
                name:       otherimg_cont,
                Cmd:        ['node', '-v'],
                'AttachStdin': true,
                'AttachStdout': true,
                'AttachStderr': true,
                'Tty': true,
                'OpenStdin': true,
                'StdinOnce': false
            };
            handler.createContainer(containerConf, function (err, container) {
                expect(err).to.be.a('null');
                expect(container).not.to.be.an('undefined');
                expect(container.id).to.be.a('string');
                done();
            });
        });
    });

    describe('#attachContainer("otherimg_cont", conf, callback)', function () {
        it('should attach streams to "otherimg_cont" container', function (done) {
            this.timeout(10000);

            handler.attachContainer(otherimg_cont, {stream: true, stdout: true, stderr: true}, function (err, stream) {
                expect(err).to.be.a('null');
                expect(stream).not.to.be.an('undefined');
                done();
            });
        });
    });

    describe('#inspectContainer("otherimg_cont", callback)', function () {
        it('should retrieve "otherimg_cont" container infos', function (done) {
            this.timeout(10000);

            handler.inspectContainer(otherimg_cont, function (err, infos) {
                expect(err).to.be.a('null');
                expect(infos.Config.Image).to.equal('maxleiko/nodejs');
                expect(infos.Name).to.equal('/'+otherimg_cont);
                done();
            });
        });
    });

    describe('#startContainer("otherimg_cont", callback)', function () {
        it('should start "otherimg_cont" container', function (done) {
            this.timeout(10000);

            handler.startContainer(otherimg_cont, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });

    describe('#removeContainer("otherimg_cont", {force: true} callback)', function () {
        it('should start "otherimg_cont" container', function (done) {
            this.timeout(10000);
            handler.removeContainer(otherimg_cont, {force: true}, function (err) {
                expect(err).to.be.a('null');
                done();
            });
        });
    });
});