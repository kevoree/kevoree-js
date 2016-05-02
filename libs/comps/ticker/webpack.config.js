var path = require('path');

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
    'kevoree-model': 'var KevoreeModel',
    'reflect-metadata': 'var Reflect'
  },
  output: {
    libraryTarget: 'var',
    library: 'Ticker',
    path: path.join('built', 'browser'),
    filename: 'bundle.js',
    publicPath: ''
  },
  ts: {
    compilerOptions: {
      declaration: false
    }
  }
};
