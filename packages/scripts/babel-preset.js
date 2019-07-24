// @flow
module.exports = function() {
  return {
    presets: [
      require('@babel/preset-env'),
      require('@babel/preset-flow'),
      require('@babel/preset-typescript'),
    ],
  };
};
