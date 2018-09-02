// @flow
import fs from 'fs-extra';
import path from 'path';

import { cli } from '../test-utils';

jest.mock('fs-extra');

describe('freighter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('creates the directory when provided', async () => {
      const dirname = 'some-directory';
      await cli('init', dirname);

      const directory = path.join(process.cwd(), dirname);
      expect(fs.mkdir).toHaveBeenCalledWith(directory);
    });

    it('uses the current directory when none is given', async () => {
      await cli('init');

      expect(fs.mkdir).not.toHaveBeenCalled();
    });
  });
});
