var path = require('path');

var HOST = 'runjs.kevoree.org';

/**
 * Created by leiko on 12/03/14.
 */
module.exports = {
    port: 9040,

    // properties for server-side Kevoree NodeJS Platform
    serverPlatform: {
        nodeName:   'server-node',
        serverHost: HOST,
        groupName:  'sync',
        groupHost:  HOST,
        groupPort:  80,
        groupPath:  'sharedGroup',
        chanHost:   HOST,
        chanPort:   80,
        chanPath:   'sharedChan'
    },

    paths: {
        serverNodeDir: path.resolve(__dirname, 'server-node'),
        publicInstall: path.resolve(__dirname, '..', 'client', 'dist', 'node_modules'),
        npmInstallDir: function (uuid) {
            return path.resolve(__dirname, 'client-nodes', uuid, 'node_modules');
        },
        modulePath: function (npmInstallDir, name) {
            return path.resolve(npmInstallDir, name)
        },
        browserModulePath: function (publicInstall, name) {
            return path.resolve(publicInstall, name);
        },
        moduleZip: function (browserModulesPath, name, version) {
            return browserModulesPath + path.sep + name + '@' + version + '.zip';
        },
        downloadLink: function (name, version) {
            return '/node_modules/' + name + '/' + name + '@' + version + '.zip';
        }
    }
};
