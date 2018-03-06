const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? 'source-map' : 'inline-source-map',
  entry: {
    index: path.resolve(process.cwd(), 'src/index.js'),
    runner: path.resolve(process.cwd(), 'test/index.js'),
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
  plugins: [new UglifyJsPlugin({ sourceMap: !isProd })],
};
