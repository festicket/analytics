var path = require('path');
module.exports = {
  entry: {
    index: path.resolve(process.cwd(), 'src/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve(process.cwd(), 'src'),
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
