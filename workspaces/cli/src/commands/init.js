// @flow
import { spawn } from 'promisify-child-process';
import latestVersion from 'latest-version';
import console from '@freighter/logger';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../templates/package-json';
import generatePrettierConfig from '../templates/prettier';
import generateFlowConfig from '../templates/flowconfig';
import generateEslintConfig from '../templates/eslint';
import generateGitignore from '../templates/gitignore';
import { command } from './decorator';

const git = {
  commit: msg => spawn('git', ['commit', '-m', msg, '--no-verify']),
  init: directory => spawn('git', ['init', '--quiet', directory]),
  add: files => spawn('git', ['add', files]),
};

const README_PATH = path.join(__dirname, '../templates/README.md');
const generateTemplateFiles = async ({ projectName, freighterVersion }) => {
  const files = {
    '.flowconfig': generateFlowConfig({ name: projectName }),
    '.prettierrc.yml': generatePrettierConfig(),
    '.eslintrc.yml': generateEslintConfig(),
    '.gitignore': generateGitignore(),
    'package.json': generatePackageJson({
      freighterVersion,
      projectName,
    }),
  };

  const writes = Object.keys(files).map(filename => {
    const contents = files[filename];
    return fs.writeFile(filename, contents);
  });

  await Promise.all(writes);
  await fs.copy(README_PATH, 'workspaces/README.md');
};

const yarn = {
  install: () =>
    spawn('yarn', ['install'], {
      stdio: 'inherit',
    }),
  run: (...commands: string[]) =>
    spawn('yarn', ['run', '--silent', ...commands], {
      stdio: 'inherit',
    }),
};

export default command(async (directory: string) => {
  const currentDirectory = process.cwd();
  const fullDirectoryPath = path.join(currentDirectory, directory);
  if (await fs.pathExists(fullDirectoryPath)) {
    const msg =
      'Hold on, that directory already exists.\n' +
      "'freighter init' expects a blank canvas of opportunity.";

    return console.error(msg);
  }

  process.chdir(fullDirectoryPath);
  await git.init(fullDirectoryPath);
  await fs.mkdir('workspaces');

  await generateTemplateFiles({
    freighterVersion: await latestVersion('@freighter/cli'),
    projectName: directory,
  });

  await yarn.install();
  await yarn.run('flow-typed', 'install', 'jest@23.0.0');

  await git.add('-A');
  await git.commit('Initial commit');
});
