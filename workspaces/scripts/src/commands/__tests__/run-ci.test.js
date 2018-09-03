// @flow
import { spawn } from 'promisify-child-process';
import flow from 'flow-bin';

import { isExitCode, exit } from '../decorator';
import { cli } from '../../test-utils';
import { test } from '../run-tests';
import { lint } from '../lint';

jest.mock('promisify-child-process');
jest.mock('../run-tests');
jest.mock('../lint');

describe('run-ci', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (test: Function).mockResolvedValue(undefined);
    (lint: Function).mockResolvedValue(undefined);
    (spawn: Function).mockResolvedValue(undefined);
  });

  it('exits successfully if nothing errors', async () => {
    const result = await cli('ci');

    expect(isExitCode(result)).toBe(false);
  });

  it('exits with an error if linting fails', async () => {
    (lint: Function).mockResolvedValue(exit(1));
    const result = await cli('ci');

    expect(isExitCode(result)).toBe(true);
    expect(result).toMatchObject({ code: 1 });
  });

  it('exits with an error if testing fails', async () => {
    (test: Function).mockResolvedValue(exit(1));
    const result = await cli('ci');

    expect(isExitCode(result)).toBe(true);
    expect(result).toMatchObject({ code: 1 });
  });

  it('runs flow', async () => {
    await cli('ci');

    expect(spawn).toHaveBeenCalledWith(flow, [], {
      stdio: 'inherit',
    });
  });

  it('exits with failure if flow fails', async () => {
    (spawn: Function).mockRejectedValue({ code: 5 });
    const result = await cli('ci');

    expect(isExitCode(result)).toBe(true);
    expect(spawn).toHaveBeenCalledWith(flow, [], {
      stdio: 'inherit',
    });
  });
});
