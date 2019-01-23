const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env, argv) {
  return {
    entry: './src/index.js',
    output: {
      filename: 'pixi-hexagonal-grid.js',
      path: path.join(__dirname, 'dist'),
      library: 'pixiHexagonalGrid',
      libraryTarget: 'umd'
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ]
    },
    externals: ['pixi.js'],
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
