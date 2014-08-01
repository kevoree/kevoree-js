# grunt-kevoree

> Automatically runs kevoree runtime (works like mvn kev:run plugin)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kevoree --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kevoree');
```

## The "kevoree" task

### Overview
In your project's Gruntfile, add a section named `kevoree` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    kevoree: {
        run: {
            options: {
                node: 'node0',                  // [optional] default "node0"
                group: 'sync',                  // [optional] default "sync"
                modulesPath: 'path/to/a/folder' // [optional] default "node_modules/grunt-kevoree"
            },
            kevscript: 'test/kevs/main.kevs'    // path to your KevScript file
        }
    }
});
```

### Options

#### options.node
Type: `String`  
Default value: `'node0'`

A string value that is used to determine the node name of the launched Kevoree runtime platform

#### options.group
Type: `String`  
Default value: `'sync'`

A string value that is used to determine the name of the group that will be attached to the node

#### options.modulesPath
Type: `String`  
Default value: `'.deploy_units'`

A string value that is used to determine the modulesPath variable for Kevoree resolver (where resolved modules are going to be installed)

#### options.gui
Type: `Boolean`  
Default value: `false`

A boolean that indicates whether or not you want to use Kevoree GUI Runtime (default is false which means it uses the command-line kevoree-nodejs-runtime)

### Kevscript

#### kevscript
Type: `String`  
Default value: `none`  **this argument is mandatory, whether from command-line or from Gruntfile.js options**

Path that leads to your KevScript file in order to create the Kevoree model to bootstrap on.  
KevScript file can be specified from the command-line (if provided, it will be used instead of the file given in the Gruntfile.js)  

```sh
grunt kevoree --kevs=/path/to/my/model.kevs
```

### Command-line arguments
#### kevscript
Type: `String`  
Default value: `none` **this argument is mandatory, it has to be given whether from command-line or in Gruntfile.js**

If set, `grunt-kevoree` will use the given filepath to load the KevScript model.  
This argument overrides the given `kevscript` option in **Gruntfile.js**

```sh
grunt kevoree --kevs=/path/to/my/model.kevs
```

#### no-reinstall
Type: `Boolean`
Default value: `true`

If set, `grunt-kevoree` will not delete the old deploy unit for the current module.  

```sh
grunt kevoree --no-reinstall
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(0.0.1)_ First commit
_(0.0.2)_ Update README
