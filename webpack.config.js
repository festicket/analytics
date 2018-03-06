const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(process.cwd(), 'src/index.js'),
    runner: path.resolve(process.cwd(), 'tests/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve(process.cwd(), 'src'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new UglifyJsPlugin()],
};
