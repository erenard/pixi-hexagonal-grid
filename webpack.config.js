const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");

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
    externals: {
      'pixi.js': 'PIXI',
      'ngraph.graph': 'ngraphGraph',
      'ngraph.path': 'ngraphPath'
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    },
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })],
    }
  }
}
