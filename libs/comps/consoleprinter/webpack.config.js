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
  entry: path.join(__dirname, 'src', 'main', 'ConsolePrinter.ts'),
  externals: {
    'react': 'var React',
    'kevoree-model': 'var KevoreeModel'
  },
  output: {
    libraryTarget: 'var',
    library: 'ConsolePrinter',
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
