const path = require('path')

const cwd = process.cwd();

module.exports = {
  entry: path.resolve(cwd, 'src', 'index.tsx'),
  output: {
    path: path.resolve(cwd, 'lib'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    modules: [
      path.resolve(cwd, 'src'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader'
      },
    ]
  }
}