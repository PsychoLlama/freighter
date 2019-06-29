// @flow
import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import { ExitCode } from 'dispute';
import flow from 'flow-bin';

import { cli } from '../../test-utils';
import { test } from '../run-tests';
import { lint } from '../lint';

jest.mock('promisify-child-process');
jest.mock('@freighter/logger');
jest.mock('../run-tests');
jest.mock('../lint');

describe('run-ci', () => {
  const exitCode = code => new ExitCode(code);

  beforeEach(() => {
    jest.clearAllMocks();
    (test: Function).mockResolvedValue(undefined);
    (lint: Function).mockResolvedValue(undefined);
    (spawn: Function).mockResolvedValue(undefined);
  });

  it('exits successfully if nothing errors', async () => {
    await cli('ci');
  });

  it('exits with an error if linting fails', async () => {
    (lint: Function).mockRejectedValue(new ExitCode(1));
    const result = cli('ci');

    await expect(result).rejects.toMatchObject({ exitCode: 1 });
  });

  it('exits with an error if testing fails', async () => {
    (test: Function).mockRejectedValue(exitCode(1));
    const result = cli('ci');

    await expect(result).rejects.toMatchObject({ exitCode: 1 });
  });

  it('runs flow', async () => {
    await cli('ci');

    expect(spawn).toHaveBeenCalledWith(flow, [], {
      stdio: 'inherit',
    });
  });

  it('exits with failure if flow fails', async () => {
    (spawn: Function).mockRejectedValue({ code: 5 });
    const result = cli('ci');

    await expect(result).rejects.toMatchObject({
      exitCode: expect.any(Number),
    });

    expect(spawn).toHaveBeenCalledWith(flow, [], {
      stdio: 'inherit',
    });
  });

  it('indicates which things failed', async () => {
    (lint: Function).mockRejectedValue(exitCode(1));
    (spawn: Function).mockRejectedValue(exitCode(2));

    await cli('ci').catch(() => {});

    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching(/lint +failed/i)
    );
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching(/tests? +passed/i)
    );
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching(/flow +failed/i)
    );
  });
});
