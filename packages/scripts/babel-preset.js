module.exports = function() {
  return {
    presets: [
      require('@babel/preset-env'),
      require('@babel/preset-typescript'),
    ],
  };
};
