// requires all tests in `project/test/src/components/**/index.js`
const tests = require.context('../test', true, /\.test\.js$/)

tests.keys().forEach(tests)

// requires all components in `project/src/components/**/index.js`
const components = require.context('../src', true, /\.js$/)

components.keys().forEach(components)
