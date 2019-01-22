const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env, argv) {
  return {
    entry: {
      'pixi-hexagonal-grid': './src/pixi-hexa'
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist')
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist')
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: 'babel-loader'
        }
      ]
    },
    devtool: 'source-map'
  }
}
