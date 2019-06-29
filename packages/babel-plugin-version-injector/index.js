const { devDependencies } = require('../../package');
const { name } = require('./package');

// Freighter itself uses freighter. It's the model from which the framework is
// built. Because of that, the library versions of the root package.json have
// to be kept in sync with the generated package.json. That's tedious.
//
// This babel plugin automates the process by exposing a special
// `__VERSIONS__` global at compile time, making it possible to dynamically
// inject the library versions from freighter's monorepo package.
module.exports = function({ types }) {
  return {
    name,
    visitor: {
      MemberExpression(path) {
        const { object, property } = path.node;
        if (object.name !== '__VERSIONS__') return;

        // Work with both bracket and dot syntax.
        const libraryName = property.name || property.value;

        if (!(libraryName in devDependencies)) {
          throw path.buildCodeFrameError(
            `'${libraryName}' doesn't exist in freighter's package.`
          );
        }

        const version = devDependencies[libraryName];
        path.replaceWith(types.stringLiteral(version));
      },
    },
  };
};
