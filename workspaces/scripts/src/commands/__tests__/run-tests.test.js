// @flow
import { spawn } from 'promisify-child-process';

import { hasWorkspaces } from '../utils/workspaces';
import { CONFIG, JEST_PATH } from '../run-tests';
import { cli } from '../../test-utils';

jest.mock('promisify-child-process');
jest.mock('../utils/workspaces');
jest.mock('@freighter/logger');

describe('test', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (hasWorkspaces: Function).mockResolvedValue(true);
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
    const result = await cli('test');

    expect(result).toMatchObject({
      code: 15,
    });
  });

  it('skips the tests if no workspaces exist', async () => {
    (hasWorkspaces: Function).mockResolvedValue(false);
    await cli('test');

    expect(spawn).not.toHaveBeenCalled();
  });
});
