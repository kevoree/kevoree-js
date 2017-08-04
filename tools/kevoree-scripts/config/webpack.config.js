'use strict';

const webpack = require('webpack');
const paths = require('./paths');
const pkg = require(paths.appPackageJson);

let babelrc = { presets: ['env'] };
try {
  babelrc = require(paths.appBabelrc);
} catch (ignore) {/* noop */}

const config = {
  bail: true,
  // devtool: 'source-map',
  entry: paths.appBrowserEntry,
  output: {
    path: paths.appBrowser,
    filename: pkg.name + '.js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: babelrc
      },
    ]
  },
  plugins: [],
  externals: {
    'kevoree-library': 'KevoreeLibrary',
    'kevoree-module-loader': 'KevoreeModuleLoader'
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  performance: {
    hints: false,
  },
};

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: config.devtool && (config.devtool.indexOf('sourcemap') >= 0 || config.devtool.indexOf('source-map') >= 0)
  })
);

module.exports = config;
