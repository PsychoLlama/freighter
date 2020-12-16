import { spawn } from 'promisify-child-process';

import { hasPackages } from '../utils/packages';
import { cli } from '../../test-utils';
import { ESLINT_BIN } from '../lint';

jest.mock('promisify-child-process');
jest.mock('../utils/packages');

describe('lint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (hasPackages as any).mockResolvedValue(true);
    (spawn as any).mockResolvedValue({});
  });

  it('spawns ESLint', async () => {
    await cli('lint');

    expect(spawn).toHaveBeenCalledWith(
      ESLINT_BIN,
      ['packages/*/src/**/*.{js,ts}{x,}'],
      {
        stdio: 'inherit',
      }
    );
  });

  it('exits if the process fails', async () => {
    (spawn as any).mockRejectedValue({ code: 25 });
    const result = cli('lint');

    await expect(result).rejects.toMatchObject({
      exitCode: 25,
    });
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

  it('ignores the packages glob if none exist', async () => {
    (hasPackages as any).mockResolvedValue(false);
    await cli('lint');

    expect(spawn).toHaveBeenCalledWith(ESLINT_BIN, [], expect.anything());
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
