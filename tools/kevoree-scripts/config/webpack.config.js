const webpack = require('webpack');
const paths = require('./paths');
const pkg = require(paths.appPackageJson);

let babelrc;
try {
  babelrc = require(paths.appBabelrc);
} catch (ignore) {
  babelrc = require('./babelrc');
}

const config = {
  bail: true,
  // devtool: 'source-map',
  entry: paths.resolveApp(pkg.kevoree.browser),
  output: {
    path: paths.appBrowser,
    filename: pkg.name + '.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader', options: babelrc },
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

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: config.devtool && (config.devtool.indexOf('sourcemap') >= 0 || config.devtool.indexOf('source-map') >= 0)
    })
  );
}

module.exports = config;
