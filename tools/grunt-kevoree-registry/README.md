# grunt-kevoree-registry

> Grunt plugin that handles POST of Kevoree models to registry.kevoree.org using kevoree-registry-client

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-kevoree-registry --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-kevoree-registry');
```

## The "kevoree_registry" task

### Overview
In your project's Gruntfile, add a section named `kevoree_registry` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  kevoree_registry: {
    options: {
      type: 'json'
    },
    src: ['path/to/a/kevoree/model.json', 'path/to/another/one.json']
  },
});
```

### Options

#### options.type
Type: `String`
Default value: `'json'`

A string value that is used to tell the encoding type of the model you want to push.  
Available types ('json', 'xmi', 'trace')

### TODOs
 - Handle type for each specified file
 - Enable registry url specification (needs kevoree-registry-client rework)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_1.0.0_ First release
