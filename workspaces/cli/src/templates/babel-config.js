/* eslint-env node */
// @flow
module.exports = function(api) {
  api.cache(true);

  return {
    presets: [require('@freighter/scripts/babel-preset')],
  };
};
