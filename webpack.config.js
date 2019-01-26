const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env, argv) {
  return {
    entry: {
      'pixi-hexagonal-grid': './src/index.js',
      'pixi-hexagonal-grid.min': './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      library: 'PixiHexagonalGrid',
      libraryTarget: 'umd'
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ]
    },
    externals: { 'pixi.js': 'PIXI' },
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
    devtool: 'source-map',
    optimization: {
      minimize: false,
      minimizer: [
        new UglifyJsPlugin()
      ]
    }
  }
}
