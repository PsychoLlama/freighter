// @flow
import { spawn } from 'promisify-child-process';

import { CONFIG_FILE, JEST_PATH } from '../run-tests';
import { cli } from '../../test-utils';

jest.mock('promisify-child-process');

describe('test', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (spawn: Function).mockResolvedValue({
      stderr: null,
      stdout: null,
    });
  });

  it('spawns jest', async () => {
    await cli('test');

    expect(spawn).toHaveBeenCalledWith(
      JEST_PATH,
      ['--no-cache', '--color', '--config', CONFIG_FILE],
      {
        stdio: 'inherit',
      }
    );
  });

  it('enables watch mode when instructed', async () => {
    await cli('test', '--watch');

    expect(spawn).toHaveBeenCalledWith(
      JEST_PATH,
      [
        '--watch',
        '--collectCoverage=false',
        '--no-cache',
        '--color',
        '--config',
        CONFIG_FILE,
      ],
      {
        stdio: 'inherit',
      }
    );
  });

  it('forwards the exit code', async () => {
    (spawn: Function).mockRejectedValue({ code: 15 });
    const result = await cli('test');

    expect(result).toMatchObject({
      code: 15,
    });
  });
});
