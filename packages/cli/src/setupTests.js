// @flow
global.__VERSIONS__ = new Proxy({}, { get: (_, key) => key });
