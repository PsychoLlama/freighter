import { spawn } from 'promisify-child-process';
import logger from '@freighter/logger';
import { ExitCode } from 'dispute';

import { cli } from '../../test-utils';
import { test } from '../run-tests';
import { lint } from '../lint';

jest.mock('promisify-child-process');
jest.mock('@freighter/logger');
jest.mock('../run-tests');
jest.mock('../lint');

describe('run-ci', () => {
  const exitCode = (code: number) => new ExitCode(code);

  beforeEach(() => {
    jest.clearAllMocks();
    (test as any).mockResolvedValue(undefined);
    (lint as any).mockResolvedValue(undefined);
    (spawn as any).mockResolvedValue(undefined);
  });

  it('exits successfully if nothing errors', async () => {
    await cli('ci');
  });

  it('exits with an error if linting fails', async () => {
    (lint as any).mockRejectedValue(new ExitCode(1));
    const result = cli('ci');

    await expect(result).rejects.toMatchObject({ exitCode: 1 });
  });

  it('exits with an error if testing fails', async () => {
    (test as any).mockRejectedValue(exitCode(1));
    const result = cli('ci');

    await expect(result).rejects.toMatchObject({ exitCode: 1 });
  });

  it('indicates which things failed', async () => {
    (lint as any).mockRejectedValue(exitCode(1));
    (spawn as any).mockRejectedValue(exitCode(2));

    await cli('ci').catch(() => {});

    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching(/lint +failed/i)
    );
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringMatching(/tests? +passed/i)
    );
  });
});
