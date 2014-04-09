var Class       = require('pseudoclass'),
    kevoree     = require('kevoree-library').org.kevoree,
    KevScript   = require('kevoree-kevscript');
//    npm         = require('npm');

// helper function to read file content from <input type="file">
function readFile(callback) {
    var fileInput = $('#file-input');
    fileInput.off('change');
    fileInput.on('change', function () {
        $('#modal-error').addClass('hide');
        var file = $(this).get(0).files[0]; // yeah, we do not want multiple file selection
        if ($(this).get(0).files.length > 1) {
            console.warn("You have selected multiple files ("
                +$(this).get(0).files[0].length
                +") so I took the first one in the list ("
                +$(this).get(0).files[0].name
                +")");
        }
        // show loading bar
        $('#model-loading').removeClass('hide');

        var fReader = new FileReader();
        fReader.onload = function (event) {
            callback(event.target.result);
        };
        fReader.readAsText(file);
    });
}

/**
 * Created by leiko on 12/03/14.
 */
var UIBrowserRuntime = Class({
    toString: 'UIBrowserRuntime',

    construct: function (runtime) {
        this.runtime = runtime;

        this.runtime.setUICommand(function (ui, callback) {
            try {
                var data = {
                    headerID:   'header'+parseInt(Math.random()*1000),
                    contentID:  'content'+parseInt(Math.random()*1000),
                    name:       ui.getName()
                };
                $('#tabs-host').append(RuntimeTemplates['tab-header'].render(data));
                $('#tabs-content-host').append(RuntimeTemplates['tab-content'].render(data));

                var rootDiv = document.querySelector('#'+data.contentID);
                rootDiv.createShadowRoot = rootDiv.createShadowRoot || rootDiv.webkitCreateShadowRoot;
                ui.on('nameChanged', function (name) {
                    $('#'+data.headerID+' a').html(name);
                });
                ui.setRoot(rootDiv.createShadowRoot());
                ui.setDestroyCmd(function () {
                    var tabLi = document.querySelector('#'+data.headerID);
                    tabLi.parentNode.removeChild(tabLi);
                    rootDiv.parentNode.removeChild(rootDiv);
                });
                return callback();

            } catch (err) {
                return callback(err);
            }
        });

        $('#platform-node-name').val('node'+parseInt(Math.random()*1000));

        $('#clear-logs').on('click', function () {
            runtime.clearLogs();
        });
    },

    showBootstrapModal: function () {
        var runtime = this.runtime;
        var resolver = this.runtime.getResolver();

        $('#modal').html(RuntimeTemplates['modal-start-menu'].render());
        $('#modal').modal();

        // helper function to parse model and update UI
        function parseModel(model) {
            var nodeList = $('#node-name-list');
            var nodes = model.nodes.iterator();
            while (nodes.hasNext()) {
                nodeList.append(RuntimeTemplates['nodelist-select-option'].render({name: nodes.next().name}));
            }
            setTimeout(function () {
                $('#model-loading').addClass('hide');
                $('#model-loaded').removeClass('hide');

                $('#start-runtime').prop('disabled', false);
                $('#start-runtime').on('click', function () {
                    var nodeName = $('#node-name-list option:selected').attr('value');
                    runtime.setBootstrapModel(model);
                    runtime.start(nodeName);
                    $('#modal').modal('hide');
                });
            }, 1000);
        }

        function backBtnListener() {
            var backBtn = $('#back');
            backBtn.off('click');
            backBtn.on('click', function () {
                $('#modal').html(RuntimeTemplates['modal-start-menu'].render());
                $('#start-model').on('click', startModelListener);
                $('#start-kevscript').on('click', startKevscriptListener);
                $('#start-custom').on('click', startCustomValsListener);
            });
        }

        function startModelListener() {
            $('#modal').html(RuntimeTemplates['modal-start-from-file'].render({type: 'JSON Model'}));
            backBtnListener();

            readFile(function (fileContent) {
                var loader = new kevoree.loader.JSONModelLoader();
                try {
                    var model = loader.loadModelFromString(fileContent).get(0);
                    parseModel(model);

                } catch (err) {
                    $('#modal-error-content').html(err.message);
                    $('#modal-error').removeClass('hide');
                    $('#model-loading').addClass('hide');
                }
            });
        }

        function startKevscriptListener() {
            $('#modal').html(RuntimeTemplates['modal-start-from-file'].render({type: 'KevScript Model'}));
            backBtnListener();

            readFile(function (fileContent) {
                var kevs = new KevScript({
                    resolvers: {
                        npm : resolver
                    }
                });
                kevs.parse(fileContent, function (err, model) {
                    if (err) {
                        $('#modal-error-content').html(err.message);
                        $('#modal-error').removeClass('hide');
                        $('#model-loading').addClass('hide');
                        return;
                    }

                    parseModel(model);
                });
            });
        }

        function startCustomValsListener() {
            $('#modal').html(RuntimeTemplates['modal-start-from-custom-values'].render());
            backBtnListener();

//            npm.load({}, function (err) {
//                if (err) {
//                    throw err;
//                }
//
//                npm.commands.search('/kevoree-group-|kevoree-node-/', true, function (err, modules) {
//                    if (err) {
//                        throw err;
//                    }
//
//                    for (var module in modules) {
//                        if (module.startsWith('kevoree-group-')) {
//                            $('#group-type').append(RuntimeTemplates['select-option'].render({name: module}));
//                        } else if (module.startsWith('kevoree-node-')) {
//                            $('#node-type').append(RuntimeTemplates['select-option'].render({name: module}));
//                        }
//                    }
//
//                    $('#loading-libraries').addClass('hide');
//                    $('#loaded-libraries').removeClass('hide');
//                    $('#start-runtime').prop('disabled', false);
//                    $('#start-runtime').on('click', function () {
//                        var nodeName = $('#node-name').val();
//                        var groupName = $('#group-name').val();
//                        var groupPort = $('#group-port').val();
//                        runtime.start(nodeName, groupName, groupPort);
//                        $('#modal').modal('hide');
//                    });
//                });
//            });

            $('#start-runtime').prop('disabled', false);
            $('#start-runtime').on('click', function () {
                var nodeName = $('#node-name').val();
                var groupName = $('#group-name').val();
                var groupPort = $('#group-port').val();
                runtime.start(nodeName, groupName, groupPort);
                $('#modal').modal('hide');
            });
        }

        $('#start-model').on('click', startModelListener);
        $('#start-kevscript').on('click', startKevscriptListener);
        $('#start-custom').on('click', startCustomValsListener);
    },

    started: function () {

    },

    stopped: function () {

    }
});

module.exports = UIBrowserRuntime;