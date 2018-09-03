// @flow
import { spawn } from 'promisify-child-process';

import { cli } from '../../test-utils';
import { ESLINT_BIN } from '../lint';

jest.mock('promisify-child-process');

describe('lint', () => {
  beforeAll(() => {
    jest.spyOn(process, 'exit');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (spawn: Function).mockResolvedValue({});
    process.exit.mockReturnValue(undefined);
  });

  afterAll(() => {
    process.exit.restore();
  });

  it('spawns ESLint', async () => {
    await cli('lint');

    expect(spawn).toHaveBeenCalledWith(
      ESLINT_BIN,
      ['workspaces/*/src/**/*.js'],
      {
        stdio: 'inherit',
      }
    );
  });

  it('exits if the process fails', async () => {
    (spawn: Function).mockRejectedValue({ code: 25 });
    await cli('lint');

    expect(process.exit).toHaveBeenCalledWith(25);
  });

  it('accepts additional file globs', async () => {
    const glob1 = 'things/1';
    const glob2 = 'things/2';
    await cli('lint', glob1, glob2);

    expect(spawn).toHaveBeenCalledWith(
      ESLINT_BIN,
      [expect.any(String), glob1, glob2],
      expect.anything()
    );
  });

  it('fixes on demand', async () => {
    await cli('lint', 'glob', '--fix');

    expect(spawn).toHaveBeenCalledWith(
      ESLINT_BIN,
      [expect.any(String), 'glob', '--fix'],
      expect.anything()
    );
  });
});
