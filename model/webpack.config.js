var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  resolve: {
    extensions: ['', '.ts']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  entry: path.join(__dirname, 'src', 'main', 'model.ts'),
  output: {
    path: path.join('built', 'browser'),
    filename: pkg.name+'.js',
    publicPath: 'built/browser',
    library: 'KevoreeModel',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  ts: {
    compilerOptions: {
      declaration: false
    }
  }
};
