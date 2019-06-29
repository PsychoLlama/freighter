// @flow
import { spawn } from 'promisify-child-process';

import { hasPackages } from '../utils/packages';
import { CONFIG, JEST_PATH } from '../run-tests';
import { cli } from '../../test-utils';

jest.mock('promisify-child-process');
jest.mock('@freighter/logger');
jest.mock('../utils/packages');

describe('test', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (hasPackages: Function).mockResolvedValue(true);
    (spawn: Function).mockResolvedValue({
      stderr: null,
      stdout: null,
    });
  });

  it('spawns jest', async () => {
    await cli('test');

    expect(spawn).toHaveBeenCalledWith(JEST_PATH, ['--color'], CONFIG);
  });

  it('enables watch mode when instructed', async () => {
    await cli('test', '--watch');

    expect(spawn).toHaveBeenCalledWith(
      JEST_PATH,
      ['--watch', '--collectCoverage=false', '--color'],
      CONFIG
    );
  });

  it('forwards the exit code', async () => {
    (spawn: Function).mockRejectedValue({ code: 15 });
    const result = cli('test');

    await expect(result).rejects.toMatchObject({
      exitCode: 15,
    });
  });

  it('skips the tests if no packages exist', async () => {
    (hasPackages: Function).mockResolvedValue(false);
    await cli('test');

    expect(spawn).not.toHaveBeenCalled();
  });
});
