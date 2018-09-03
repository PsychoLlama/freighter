// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../../templates/package-json';
import generateGitignore from '../../templates/gitignore';
import { cli } from '../../test-utils';

jest.mock('promisify-child-process');
jest.mock('../../console');
jest.mock('fs-extra');

const CWD = process.cwd();

describe('freighter init', () => {
  beforeAll(() => {
    jest.spyOn(process, 'chdir');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    process.chdir.mockReturnValue(undefined);
    fs.pathExists.mockResolvedValue(false);
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
    fs.pathExists.mockResolvedValue(true);
    await cli('init', project);

    expect(spawn).not.toHaveBeenCalled();
  });

  it('changes to the new directory', async () => {
    const project = 'project-dir';
    await cli('init', project);

    const fullPath = path.join(process.cwd(), project);
    expect(process.chdir).toHaveBeenCalledWith(fullPath);
  });

  it('generates static files', async () => {
    const name = 'project-dir';
    await cli('init', name);

    const pkg = generatePackageJson({ name });
    const gitignore = generateGitignore();
    expect(fs.writeFile).toHaveBeenCalledWith('package.json', pkg);
    expect(fs.writeFile).toHaveBeenCalledWith('.gitignore', gitignore);
  });

  it('performs an install after generating files', async () => {
    await cli('init', 'project-dir');

    expect(spawn).toHaveBeenCalledWith('yarn', ['install'], {
      stdio: 'inherit',
    });
  });

  it('commits after generating the files', async () => {
    await cli('init', 'project-dir');

    expect(spawn).toHaveBeenCalledWith('git', [
      'commit',
      '-m',
      'Initial commit',
      '--no-verify',
    ]);
  });

  it('creates the workspaces directory', async () => {
    await cli('init', 'new-project');

    expect(fs.mkdir).toHaveBeenCalledWith('workspaces');
  });

  it('installs the flow types', async () => {
    await cli('init', 'new-project');

    expect(spawn).toHaveBeenCalledWith(
      'yarn',
      ['run', '--silent', 'flow-typed', 'install', '--skip'],
      {
        stdio: 'inherit',
      }
    );
  });
});
