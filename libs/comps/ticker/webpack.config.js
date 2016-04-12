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
  entry: {
    main: ['./src/main/Ticker.ts'],
    test: './src/test/browser.tsx'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'kevoree-model': 'KevoreeModel'
  },
  output: {
    libraryTarget: 'var',
    library: 'Ticker',
    path: path.join(__dirname, 'built', 'browser'),
    filename: '[name]-bundle.js'
  }
};
