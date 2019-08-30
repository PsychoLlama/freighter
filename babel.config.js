/* eslint-env node */
const generateConfig = require('./packages/cli/src/templates/babel-config.txt');

module.exports = function(api) {
  const config = generateConfig(api);
  config.presets.push(require('@babel/preset-typescript'));

  return config;
};
