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

    dic_image:          { optional: true },
    dic_commitRepo:     { optional: false },
    dic_commitTag:      { optional: true },
    dic_commitMsg:      { optional: true },
    dic_commitAuthor:   { optional: true },
    dic_command:        { optional: true },
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
        var startKevoreeContainer = function (conf, hostConf) {
            this.handler.createContainer(conf, function (err, container) {
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

                        this.log.info(this.toString(), 'Container '+conf.name+' successfully started.');

                        // prepare a script to update container's IP asap
                        this.handler.inspectContainer(container, function (err, infos) {
                            if (err) {
                                throw err;
                            } else {
                                this.submitScript('network '+node.name+'.lan.ip '+infos.NetworkSettings.IPAddress);
                            }
                        }.bind(this));

                        done(err);
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }.bind(this);


        var repo = this.dictionary.getString('commitRepo'),
            tag  = this.dictionary.getString('commitTag', 'latest');
        var containerConf = {
            Image:  repo+'/'+node.name+':'+tag,
            name:   node.name
        };

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

            var found = (function contains(target, images) {
                for (var i=0; i < images.length; i++) {
                    for (var j=0; j < images[i].RepoTags.length; j++) {
                        if (images[i].RepoTags[j].indexOf(target) !== -1) {
                            return true;
                        }
                    }
                }
                return false;
            })(containerConf.Image, imgs);

            if (!found) { containerConf.Image = DEFAULT_IMAGE; }

            switch (node.typeDefinition.name) {
                case this.toString():
                    // Child node is a DockerNode type
                    var image = node.dictionary ? node.dictionary.findValuesByID('image'): null;
                    if (!found && image && image.value && image.value.length > 0) {
                        containerConf.Image = image.value;
                    }

                    var command = node.dictionary ? node.dictionary.findValuesByID('command') : null;
                    if (command && command.value && command.value.length > 0) {
                        containerConf.Cmd = command.value.split(' ');
                    }

                    startKevoreeContainer(containerConf);
                    break;

                case JavascriptNode.prototype.toString():
                    // JavascriptNode
                    tmpModel(this.getKevoreeCore().getDeployModel(), function (err, dirPath, modelPath) {
                        if (err) { done(err); return; }

                        containerConf.Cmd = [ '-n', node.name, '-m', modelPath ];
                        containerConf.Volumes = {};
                        containerConf.Volumes[dirPath] = {};
                        startKevoreeContainer(containerConf, {
                            start: {
                                Binds: [dirPath+':'+dirPath+':rw']
                            }
                        });
                    }.bind(this));
                    break;

                default:
                    //this.log.warn(this.toString(), );
                    done(new Error('Child node type "'+node.typeDefinition.name+'" is not handled. (only '+this.toString()+' and '+JavascriptNode.prototype.toString()+' handled)'));
                    return;
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
