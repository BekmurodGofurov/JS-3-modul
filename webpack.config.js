const path = require('path');

module.exports = {
  mode: "development",
  entry: './js/script',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watch: true,
  devtool: 'source-map',
  module: {}
};