process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
  config.set({
    basePath: '..',
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'chai'],

    files: [
      { pattern: 'test/**/*.test.js', watched: false }
    ],

    preprocessors: {
      'test/**/*.test.js': [ 'webpack' ]
    },

    plugins: ['karma-chrome-launcher', 'karma-webpack', 'karma-mocha', 'karma-chai'],

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress']
  })
}
