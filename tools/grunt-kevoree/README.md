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
    // all those options are optional because they are the default behavior
    kevoree: {
        options: {
            runtime: 'latest',            // default
            node: 'node0',                // default
            kevscript: 'kevs/main.kevs',  // default
            modulesPath: '.deploy_units', // default
            mergeLocalLibraries: [],      // default
            logLevel: 'debug'             // default
        }
    }
});
```  

> Because each options has a default value, you can just add a `grunt.loadNpmTasks('grunt-kevoree')` without any `kevoree` task configuration in your **Gruntfile.js**, and then do a `grunt kevoree` in a terminal

### Options

#### options.node
Type: `String`  
Default value: `'node0'`

A string value that is used to determine the node name of the launched Kevoree runtime platform

#### options.runtime
Type: `String`  
Default value: `'latest'`

A string value that is used to determine the runtime version (kevoree-nodejs-runtime version)

#### options.kevscript
Type: `String`  
Default value: `'kevs/main.kevs'`

A string value that is used to determine the KevScript model that will be used to bootstrap the platform

#### options.modulesPath
Type: `String`  
Default value: `'.deploy_units'`

A string value that is used to determine the modulesPath variable for Kevoree resolver (where resolved modules are going to be installed)

#### options.mergeLocalLibraries
Type: `String`
Default value: `[]`

An array containing the paths to your local Kevoree libraries that are not yet pushed on npm registry nor Kevoree registry
Ex:

```js
kevoree: {
    options: {
        mergeLocalLibraries: [
            '/path/to/kevoree-comp-ticker'
        ]
    }
}
```

> NB: Merged local libraries has to be "installed" (i.e `npm install` must have been run)

#### options.logLevel
Type: `String`
Default value: `'debug'`

A string value that is used to determine the runtime log level.
Available values are `(all|debug|info|warn|error|quiet)`

### Kevscript

#### kevscript
Type: `String`  
Default value: `none`  **this argument is mandatory, whether from command-line or from Gruntfile.js options**

Path that leads to your KevScript file in order to create the Kevoree model to bootstrap on.  
KevScript file can be specified from the command-line (if provided, it will be used instead of the file given in the Gruntfile.js)  

```sh
grunt kevoree --kevscript=/path/to/my/model.kevs
```

### Command-line arguments
#### node
Type: `String`  
Default value: `node0`

If set, `grunt-kevoree` will use the given node name to start the Kevoree platform.  
This argument overrides the given `node` option in **Gruntfile.js**

```sh
grunt kevoree --node=node1
```

#### kevscript
Type: `String`  
Default value: `kevs/main.kevs`

If set, `grunt-kevoree` will use the given filepath to load the KevScript model.  
This argument overrides the given `kevscript` option in **Gruntfile.js**

```sh
grunt kevoree --kevscript=/path/to/my/model.kevs
```

#### runtime
Type: `String`
Default value: `latest`

If set, `grunt-kevoree` will install the specified `kevoree-nodejs-runtime` version to run the Kevoree platform.
  This argument overrides the given `runtime` option in **Gruntfile.js**

```sh
grunt kevoree --runtime=5.1.0
```

#### no-reinstall
Type: `Boolean`
Default value: `false`

If set, `grunt-kevoree` will not delete the old deploy unit for the current module.  

```sh
grunt kevoree --no-reinstall
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
