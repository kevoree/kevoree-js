var path = require('path');
var pkg = require('./package.json');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  entry: path.join(__dirname, 'src', 'main', 'Ticker.ts'),
  externals: {
    'react': 'var React',
    'kevoree-model': 'var KevoreeModel'
  },
  output: {
    libraryTarget: 'var',
    library: 'Ticker',
    path: path.join('built', 'browser'),
    filename: pkg.name+'.js',
    publicPath: ''
  },
  ts: {
    compilerOptions: {
      declaration: false
    }
  }
};
