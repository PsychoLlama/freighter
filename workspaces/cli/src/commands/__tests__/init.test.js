// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import { cli } from '../../test-utils';

jest.mock('promisify-child-process');
jest.mock('fs-extra');

const CWD = process.cwd();

describe('freighter init', () => {
  const createPathExistsMock = () => {
    const paths = new Set();

    return {
      implementation: path => paths.has(path),
      setPathExists: (relative: string) => {
        const absolute = path.join(CWD, relative);
        paths.add(absolute);
        paths.add(relative);
      },
    };
  };

  beforeAll(() => {
    jest.spyOn(process, 'chdir');
  });

  beforeEach(() => {
    jest.clearAllMocks();

    const { implementation, setPathExists } = createPathExistsMock();
    fs.pathExists.mockImplementation(implementation);
    fs.pathExists.__setTrueFor = setPathExists;
    process.chdir.mockReturnValue(undefined);
  });

  afterAll(() => {
    process.chdir.restore();
  });

  it('initializes a new git repo', async () => {
    const dir = 'project';
    await cli('init', dir);
    const project = path.join(CWD, dir);

    expect(spawn).toHaveBeenCalledWith('git', ['init', '--quiet', project]);
  });

  it('complains if the project path already exists', async () => {
    const project = 'project-dir';
    fs.pathExists.__setTrueFor(project);
    await cli('init', project);

    expect(spawn).not.toHaveBeenCalled();
  });

  it('changes to the new directory', async () => {
    const project = 'project-dir';
    await cli('init', project);

    const fullPath = path.join(process.cwd(), project);
    expect(process.chdir).toHaveBeenCalledWith(fullPath);
  });
});
