// @flow
Object.defineProperty(global, '__VERSIONS__', {
  value: new Proxy({}, { get: (_, key) => key }),
});
