// Created by leiko on 11/08/14 10:34
var Class = require('pseudoclass');
var Docker = require('dockerode');

var DockerHandler = Class({
    toString: 'DockerHandler',

    /**
     * Construct a DockerHandler object
     * @param [host] default http://localhost
     * @param [port] default 2375
     */
    construct: function (host, port) {
        this.docker = new Docker({
            host: host || 'http://localhost',
            port: port || 2375
        });
    },

    /**
     *
     * @param container
     * @param callback
     */
    getContainer: function (container, callback) {
        if (typeof (container) === 'string') {
            container = this.docker.getContainer(container);
            container.inspect(function (err) {
                if (err) {
                    // container does not exist
                    callback(err);

                } else {
                    callback(null, container);
                }
            }.bind(this));
        } else {
            callback(null, container);
        }
    },

    /**
     * Creates a container without starting it. If a container with the same name already exists
     * then it will not re-create it. Otherwise, it will try to pull the image for that container first,
     * then create it.
     * @param containerConf
     * @param callback
     */
    createContainer: function (containerConf, callback) {
        var container = this.docker.getContainer(containerConf.name);
        container.inspect(function (err) {
            if (err) {
                // container does not exist
                this.docker.pull(containerConf.Image, function (err, stream) {
                    if (err) {
                        callback(err);
                    } else {
                        var data = '';
                        stream.on('data', function (chunk) {
                            data += chunk;
                        });
                        stream.on('end', function () {
                            this.docker.createContainer(containerConf, callback);
                        }.bind(this));
                    }
                }.bind(this));

            } else {
                // container is already created
                callback(null, container);
            }
        }.bind(this));
    },

    /**
     * Runs Docker command attach over a given container using given configuration options.
     * @param container (string|Container object)
     * @param conf options object
     * @param callback function (err, stream, container)
     */
    attachContainer: function (container, conf, callback) {
        this.getContainer(container, function (err, container) {
            if (err) {
                callback(err);
                return;
            }

            container.attach(conf, function (err, stream) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, stream, container);
                }
            });
        });
    },

    /**
     * Inspects a container whether from name or from a Container object (retrieved by createContainer(...))
     * @param container (string|Container object)
     * @param callback
     */
    inspectContainer: function (container, callback) {
        if (typeof (container) === 'string') {
            container = this.docker.getContainer(container);
        }
        container.inspect(callback);
    },

    /**
     * Starts a container whether from name or from a Container object (retrieved by createContainer(...))
     * @param container (string|Container object)
     * @param callback
     */
    startContainer: function (container, callback) {
        this.getContainer(container, function (err, container) {
            if (err) {
                callback(err);
                return;
            }

            container.start(function (err, data) {
                if (err && err.statusCode !== 304) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        });
    },

    /**
     * Stops a container whether from name or from a Container object (retrieved by createContainer(...))
     * @param container (string|Container object)
     * @param callback
     */
    stopContainer: function (container, callback) {
        this.getContainer(container, function (err, container) {
            if (err) {
                callback(err);
                return;
            }

            container.stop(function (err, data) {
                if (err && err.statusCode !== 304) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        });
    },

    /**
     * Removes a container whether from name or from a Container object (retrieved by createContainer(...))
     * @param container (string|Container object)
     * @param [removeConf] Object containing container removing options
     * @param callback
     */
    removeContainer: function (container, removeConf, callback) {
        if (typeof (callback) === 'undefined') {
            callback = removeConf;
            removeConf = {};
        }

        this.getContainer(container, function (err, container) {
            if (err) {
                callback(err);
                return;
            }

            container.defaultOptions.remove = removeConf;
            container.remove(callback);
        });
    },

    /**
     * Commit given container to Docker host images
     * @param container
     * @param conf
     * @param callback
     */
    commitContainer: function (container, conf, callback) {
        this.getContainer(container, function (err, container) {
            if (err) {
                callback(err);
                return;
            }

            container.commit(conf, callback);
        });
    },

    /**
     * List current Docker host images
     * @param callback
     */
    listImages: function (callback) {
        // simple proxy
        this.docker.listImages(callback);
    }
});

module.exports = DockerHandler;