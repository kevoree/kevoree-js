var JavascriptNode = require('kevoree-node-javascript');
var DockerHandler = require('./DockerHandler');
var tmpModel = require('./tmp-model');
var kevoree = require('kevoree-library').org.kevoree;
var fs = require('fs');

var DEFAULT_IMAGE = 'kevoree/js';

/**
 * Kevoree group
 * @type {DockerNode}
 */
var DockerNode = JavascriptNode.extend({
    toString: 'DockerNode',

    dic_image:          { },
    dic_commitTag:      { },
    dic_commitMsg:      { },
    dic_commitAuthor:   { },
    dic_cmd:            { },
    dic_authUsername:   { },
    dic_authPassword:   { },
    dic_authEmail:      { },
    dic_commitRepo:     { optional: false },
    dic_pushOnDestroy:  { defaultValue: false, datatype: 'boolean' },
    dic_pushRegistry:   { defaultValue: 'https://index.docker.io/v1/' },
    dic_cpuShares:      { optional: false, defaultValue: 0, datatype: 'number' },
    dic_memory:         { optional: false, defaultValue: 512, datatype: 'number' },

    construct: function () {
        this.handler = new DockerHandler();
    },

    /**
     *
     * @param node
     * @param done
     */
    startSubNode: function (node, done) {
        var containerConf = {}, hostConf = {};

        /**
         *
         * @type {function(this:DockerNode)}
         */
        var startKevoreeContainer = function () {
            this.handler.createContainer(containerConf, function (err, container) {
                if (err)      { done(err); return; }
                if (hostConf) { container.defaultOptions = hostConf; }

                // attach output
                this.handler.attachContainer(container, {stream: true, stdout: true, stderr: true}, function (err, stream) {
                    if (err) { done(err); return; }

                    stream.on('end', function () {
                        // If we reach this points, it is almost sure that the target container is stopped
                        // we can update the model
                        this.submitScript('stop '+node.name);
                    }.bind(this));

                    // demux data to proper output
                    var header = null;

                    stream.on('readable', function() {
                        header = header || stream.read(8);
                        while(header !== null) {
                            var type = header.readUInt8(0);
                            var payload = stream.read(header.readUInt32BE(4));
                            if (payload === null) break;
                            if(type == 2) {
                                process.stderr.write(node.name+' > '+payload);
                            } else {
                                process.stdout.write(node.name+' > '+payload);
                            }
                            header = stream.read(8);
                        }
                    });

                    // start container
                    this.handler.startContainer(container, function (err) {
                        if (err) { done(err); return; }

                        // prepare a script to update container's IP asap
                        this.handler.inspectContainer(container, function (err, infos) {
                            if (err) {
                                throw err;
                            } else {
                                this.submitScript('network '+node.name+'.lan.ip '+infos.NetworkSettings.IPAddress);
                                this.log.info(this.toString(), 'Container '+containerConf.name+' successfully started at '+infos.NetworkSettings.IPAddress);
                            }
                        }.bind(this));

                        done(err);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this);

        /**
         *
         * @type {function(this:DockerNode)}
         */
        var configureDockerNode = function () {
            var command = node.dictionary ? node.dictionary.findValuesByID('cmd') : null;
            if (command && command.value && command.value.length > 0) {
                containerConf.Cmd = command.value.split(' ');
            }

            startKevoreeContainer();
        }.bind(this);

        /**
         *
         * @type {function(this:DockerNode)}
         */
        var configureJavascriptNode = function () {
            tmpModel(this.getKevoreeCore().getDeployModel(), function (err, dirPath, modelPath) {
                if (err) { done(err); return; }

                containerConf.Cmd = [ '-n', node.name, '-m', modelPath ];
                containerConf.Volumes = {};
                containerConf.Volumes[dirPath] = {};
                hostConf.start = hostConf.start || {};
                hostConf.start.Binds = [dirPath+':'+dirPath+':rw'];
                startKevoreeContainer();
            }.bind(this));
        }.bind(this);


        var repo = this.dictionary.getString('commitRepo'),
            tag  = this.dictionary.getString('commitTag', 'latest');

        containerConf.Image = repo+'/'+node.name+':'+tag;
        containerConf.name = node.name;

        var memory    = node.dictionary ? node.dictionary.findValuesByID('memory') : null,
            cpuShares = node.dictionary ? node.dictionary.findValuesByID('cpuShares') : null;

        if (memory && memory.value && memory.value.length > 0) {
            var mem = parseInt(memory.value, 10);
            if (!isNaN(mem)) {
                containerConf.Memory = mem;
            } else {
                containerConf.Memory = 512;
            }
            // memory has to be defined in MB
            containerConf.Memory = containerConf.Memory*1024*1024;
        }

        if (cpuShares && cpuShares.value && cpuShares.value.length > 0) {
            var shares = parseInt(cpuShares.value, 10);
            if (!isNaN(mem)) {
                containerConf.CpuShares = shares;
            } else {
                containerConf.CpuShares = 0;
            }
        }

        this.handler.listImages(function (err, imgs) {
            if (err) { done(err); return; }

            var foundLocally = (function contains(target, images) {
                for (var i=0; i < images.length; i++) {
                    for (var j=0; j < images[i].RepoTags.length; j++) {
                        if (images[i].RepoTags[j].indexOf(target) !== -1) {
                            return true;
                        }
                    }
                }
                return false;
            })(containerConf.Image, imgs);

            if (foundLocally) {
                // image is available locally: use it
                switch (node.typeDefinition.name) {
                    case this.toString():
                        configureDockerNode();
                        break;

                    case JavascriptNode.prototype.toString():
                        configureJavascriptNode();
                        break;

                    default:
                        done(new Error('DockerNode: Child node type "'+node.typeDefinition.name+'" is not handled. (only '+this.toString()+' and '+JavascriptNode.prototype.toString()+' handled)'));
                        return;
                }

            } else {
                // image is not available locally
                this.log.info(this.toString(), 'Looking for '+repo+'/'+node.name+' on remote Docker registry...');
                this.handler.searchImages({ term: repo+'/'+node.name }, function (err, images) {
                    if (err) { done(err); return; }

                    if (images.length > 0) {
                        // available remotely
                        this.handler.pull(containerConf.Image, function (err) {
                            if (err) { done(err); return; }

                            switch (node.typeDefinition.name) {
                                case this.toString():
                                    configureDockerNode();
                                    break;

                                case JavascriptNode.prototype.toString():
                                    configureJavascriptNode();
                                    break;

                                default:
                                    done(new Error('DockerNode: Child node type "'+node.typeDefinition.name+'" is not handled. (only '+this.toString()+' and '+JavascriptNode.prototype.toString()+' handled)'));
                                    return;
                            }
                        }.bind(this));

                    } else {
                        // unavailable remotely
                        switch (node.typeDefinition.name) {
                            case this.toString():
                                var image = node.dictionary ? node.dictionary.findValuesByID('image') : null;
                                if (image && image.value && image.value.length > 0) {
                                    containerConf.Image = image.value;
                                    configureDockerNode();
                                } else {
                                    done(new Error('DockerNode: unable to start a DockerNode if no image is set AND no commitRepo/childNode.name:commitTag image exists'));
                                }
                                break;

                            case JavascriptNode.prototype.toString():
                                containerConf.Image = DEFAULT_IMAGE;
                                configureJavascriptNode();
                                break;

                            default:
                                done(new Error('DockerNode: Child node type "'+node.typeDefinition.name+'" is not handled. (only '+this.toString()+' and '+JavascriptNode.prototype.toString()+' handled)'));
                                return;
                        }
                    }
                }.bind(this));
            }
        }.bind(this));
    },

    /**
     *
     * @param node
     * @param done
     */
    stopSubNode: function (node, done) {
        var repo    = this.dictionary.getString('commitRepo'),
            tag     = this.dictionary.getString('commitTag', 'latest'),
            msg     = this.dictionary.getString('commitMsg'),
            author  = this.dictionary.getString('commitAuthor');

        this.handler.stopContainer(node.name, function (err) {
            if (err) { done(err); return; }

            this.log.info(this.toString(), 'Container "'+node.name+'" successfully stopped');

            var conf = {
                repo: repo+'/'+node.name,
                tag: tag,
                m: msg,
                author: author
            };

            this.handler.commitContainer(node.name, conf, function (err) {
                if (err) {
                    this.log.warn(this.toString(), 'Unable to commit container "'+node.name+'"');
                } else {
                    this.log.info(this.toString(), 'Successfully commit container "'+node.name+'" to "'+conf.repo+':'+conf.tag+'"');
                    var pushOnDestroy = this.dictionary.getBoolean('pushOnDestroy', false);
                    if (pushOnDestroy) {
                        var auth = {
                            username: this.dictionary.getString('authUsername'),
                            password: this.dictionary.getString('authPassword'), // FIXME protect password in kevoree model...
                            email: this.dictionary.getString('authEmail'),
                            serveraddress: this.dictionary.getString('pushRegistry', "https://index.docker.io/v1/")
                        };

                        var image = this.handler.getImage(conf.repo);
                        if (image && image.name === conf.repo) {
                            console.log('repo: '+conf.repo);
                            console.log('image: '+image.name);
                            image.push(function (err, stream) {
                                if (err) {
                                    done(err);
                                } else {
                                    stream.on('end', function () {
                                        this.log.info(this.toString(), 'Image '+conf.repo+' successfully pushed to '+auth.serveraddress);
                                    }.bind(this));
                                }
                            }.bind(this), auth);
                        } else {
                            done(new Error('DockerNode: unable to push unknown image '+conf.repo));
                        }
                    }
                }
                done(err);
            }.bind(this));
        }.bind(this));
    },

    /**
     *
     * @param node
     * @param done
     */
    removeSubNode: function (node, done) {
        this.handler.removeContainer(node.name, function (err) {
            if (err) { done(err); return; }

            this.log.info(this.toString(), 'Container "'+node.name+'" successfully removed.');
            done();
        }.bind(this));
    }
});

module.exports = DockerNode;
