// @flow
import { command, exit, isExitCode, enableExit } from '../decorator';

describe('decorator', () => {
  beforeAll(() => {
    jest.spyOn(process, 'exit');
    enableExit(true);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    process.exit.mockImplementation(() => {});
  });

  afterAll(() => {
    process.exit.restore();
  });

  it('exits the process with a special return value', async () => {
    await command(() => exit(1))();

    expect(process.exit).toHaveBeenCalledWith(1);
    expect(isExitCode(exit(1))).toBe(true);
    expect(isExitCode(exit(0))).toBe(true);
    expect(isExitCode(exit(255))).toBe(true);
  });

  it('does not exit if the value is not an exit code', async () => {
    await command(() => 10)();

    expect(process.exit).not.toHaveBeenCalled();
    expect(isExitCode(10)).toBe(false);
  });

  it('survives if the return value is falsy', async () => {
    await command(() => null)();

    expect(process.exit).not.toHaveBeenCalled();
    expect(isExitCode(false)).toBe(false);
    expect(isExitCode(null)).toBe(false);
    expect(isExitCode(undefined)).toBe(false);
  });

  it('works if the exit code is return asynchronously', async () => {
    await command(async () => exit(5))();

    expect(process.exit).toHaveBeenCalledWith(5);
  });
});
