const path = require('path');

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'lazy-ui.min.js',
  },
  module: {
    rules: [
      {
        test: /\.art$/,
        loader: "art-template-loader"
      }
    ]
  },
  resolve: {
    preferRelative: true,
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
};
