const baseConfig = require('./karma.conf')

module.exports = (config) => {
  baseConfig(config)
  config.set({
    singleRun: true,
    files: [
      { pattern: 'config/code_coverage.js' }
    ],
    preprocessors: {
      'config/code_coverage.js': [ 'webpack' ]
    },
    reporters: ['progress', 'coverage']
  })
}
