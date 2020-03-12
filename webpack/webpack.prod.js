const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cwd = process.cwd();

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: path.resolve(cwd, 'src', 'components', 'index.tsx'),
  output: {
    library: 'kalendarz',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  externals: {
    "react": "react"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `index.css`
    })
  ]
})