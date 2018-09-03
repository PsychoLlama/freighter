// @flow
import { spawn } from 'promisify-child-process';

import { CONFIG_FILE, JEST_PATH } from '../run-tests';
import { cli } from '../../test-utils';

jest.mock('promisify-child-process');

describe('test', () => {
  beforeAll(() => {
    jest.spyOn(process, 'exit');
  });

  beforeEach(() => {
    jest.clearAllMocks();

    process.exit.mockReturnValue(undefined);
    (spawn: Function).mockResolvedValue({
      stderr: null,
      stdout: null,
    });
  });

  afterAll(() => {
    process.exit.restore();
  });

  it('spawns jest', async () => {
    await cli('test');

    expect(spawn).toHaveBeenCalledWith(
      JEST_PATH,
      ['--color', '--config', CONFIG_FILE],
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
    await cli('test');

    expect(process.exit).toHaveBeenCalledWith(15);
  });
});
