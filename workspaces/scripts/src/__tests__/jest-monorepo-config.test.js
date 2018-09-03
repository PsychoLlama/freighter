// @flow
import config from '../jest-monorepo-config';

describe('jest-config-monorepo', () => {
  it('works', () => {
    expect(config).toEqual(expect.any(Object));
  });
});
