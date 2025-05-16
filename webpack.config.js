import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default function (env, argv) {
  return {
    entry: {
      'pixi-hexagonal-grid': './src/index.js',
      'pixi-hexagonal-grid.min': './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.join('/home/eric/Sources/pixi-hexagonal-grid', 'dist'),
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
      'pixi.js': 'PIXI'
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
    devtool: 'source-map',
  }
}
