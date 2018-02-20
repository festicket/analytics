var path = require('path');
module.exports = {
  entry: {
    index: path.resolve(process.cwd(), 'src/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js'
  }
}
