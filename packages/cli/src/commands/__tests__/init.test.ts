import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../../templates/package-json';
import generateFlowConfig from '../../templates/flowconfig';
import { cli } from '../../test-utils';

const MOCK_LATEST_VERSION = '1.2.3';

jest.mock('latest-version', () => () => MOCK_LATEST_VERSION);
jest.mock('promisify-child-process');
jest.mock('@freighter/logger');
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
    const projectName = 'project-dir';
    await cli('init', projectName);

    const pkg = generatePackageJson({
      versions: {
        freighterScripts: MOCK_LATEST_VERSION,
        eslintConfig: MOCK_LATEST_VERSION,
      },
      projectName,
    });

    const flowconfig = generateFlowConfig({ name: projectName });
    expect(fs.writeFile).toHaveBeenCalledWith('package.json', pkg);
    expect(fs.writeFile).toHaveBeenCalledWith('.flowconfig', flowconfig);
  });

  it('uses the latest freighter versions', async () => {
    await cli('init', 'new-project');

    const [, contents] = fs.writeFile.mock.calls.find(
      ([filename]) => filename === 'package.json'
    );

    const { devDependencies: deps } = JSON.parse(contents);
    expect(deps).toMatchObject({
      'eslint-config-freighter-repo': MOCK_LATEST_VERSION,
      '@freighter/scripts': MOCK_LATEST_VERSION,
    });
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

  it('creates the packages directory', async () => {
    await cli('init', 'new-project');

    expect(fs.mkdir).toHaveBeenCalledWith('packages');
  });

  it('installs the flow types', async () => {
    await cli('init', 'new-project');

    expect(spawn).toHaveBeenCalledWith(
      'yarn',
      [
        'run',
        '--silent',
        'flow-typed',
        'install',
        expect.stringMatching('jest'),
      ],
      {
        stdio: 'inherit',
      }
    );
  });
});
