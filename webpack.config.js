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
    externals: {
      'pixi.js': 'PIXI',
      'ngraph.graph': 'ngraphGraph',
      'ngraph.path': 'ngraphPath'
    },
    plugins: [
      new CleanWebpackPlugin('dist')
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                'babel-preset-env',
                {
                  // https://github.com/babel/babel-preset-env#targetsuglify
                  'targets': 'uglify'
                }
              ]]
            }
          }
        }
      ]
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /.*\.min.*/,
          sourceMap: true
        })
      ]
    }
  }
}
