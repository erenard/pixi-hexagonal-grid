const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env, argv) {
  return {
    entry: {
      'main': './application'
    },
    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      modules: [
        '.',
        'node_modules'
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
        }
      ]
    },
    devtool: 'source-map',
    devServer: {
      compress: false,
      port: 9000
    }
  }
}
