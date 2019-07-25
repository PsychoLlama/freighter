import logger, { Console, WARN_PREFIX, ERROR_PREFIX } from '../index';

describe('console', () => {
  const setup = () => {
    const mock = { log: jest.fn(), warn: jest.fn(), error: jest.fn() };
    const console = new Console(mock);

    return { console, mock };
  };

  it('exists', () => {
    expect(Console).toEqual(expect.any(Function));
  });

  it('forwards log messages', () => {
    const { console, mock } = setup();
    const args = ['string', 5, {}];
    console.log(...args);

    expect(mock.log).toHaveBeenCalledWith(...args);
  });

  it('forwards warning messages', () => {
    const { console, mock } = setup();
    const args = ['string', 5, {}];
    console.warn(...args);

    expect(mock.warn).toHaveBeenCalledWith(WARN_PREFIX, ...args);
  });

  it('forwards error messages', () => {
    const { console, mock } = setup();
    const args = ['string', 5, {}];
    console.error(...args);

    expect(mock.error).toHaveBeenCalledWith(ERROR_PREFIX, ...args);
  });

  it('exports a default instance with console configured', () => {
    expect(logger).toBeDefined();
    expect(logger._implementation).toBe(global.console);
  });
});
