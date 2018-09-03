// @flow
import { spawn } from 'promisify-child-process';
import flow from 'flow-bin';

import { command, exit, isExitCode } from './decorator';

import { test } from './run-tests';
import { lint } from './lint';

export default command(async () => {
  const testOutput = await test({ watch: false });
  const lintOutput = await lint({ fix: false });
  let flowOutput = await spawn(flow, [], { stdio: 'inherit' }).catch(error =>
    exit(error.code)
  );

  if (
    isExitCode(lintOutput) ||
    isExitCode(testOutput) ||
    isExitCode(flowOutput)
  ) {
    return exit(1);
  }

  return 12;
});
