// @flow
import { spawn } from 'promisify-child-process';
import latestVersion from 'latest-version';
import console from '@freighter/logger';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../templates/package-json';
import generateFlowConfig from '../templates/flowconfig';
import { command } from './decorator';

const git = {
  commit: msg => spawn('git', ['commit', '-m', msg, '--no-verify']),
  init: directory => spawn('git', ['init', '--quiet', directory]),
  add: files => spawn('git', ['add', files]),
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

const templatePath = filePath => path.join(__dirname, '../templates', filePath);

const templates = {
  prettier: templatePath('prettier-config.txt'),
  eslint: templatePath('eslint-config.yml'),
  jest: templatePath('jest-config.txt'),
  gitignore: templatePath('gitignore'),
  readme: templatePath('README.md'),
  lerna: templatePath('lerna.json'),
};

const generateTemplateFiles = async ({ projectName, versions }) => {
  const files = {
    '.flowconfig': generateFlowConfig({ name: projectName }),
    'package.json': generatePackageJson({
      projectName,
      versions,
    }),
  };

  const writes = Object.keys(files).map(filename => {
    const contents = files[filename];
    return fs.writeFile(filename, contents);
  });

  await Promise.all(writes);
  await Promise.all([
    fs.copy(templates.readme, 'workspaces/README.md'),
    fs.copy(templates.prettier, '.prettierrc.js'),
    fs.copy(templates.gitignore, '.gitignore'),
    fs.copy(templates.eslint, '.eslintrc.yml'),
    fs.copy(templates.jest, 'jest.config.js'),
    fs.copy(templates.lerna, 'lerna.json'),
  ]);
};

// Assume the freighter CLI installation is out of date.
// Pull the latest package versions from npm.
const getLatestVersions = async () => {
  const [eslintConfig, freighterScripts] = await Promise.all([
    latestVersion('eslint-config-freighter-repo'),
    latestVersion('@freighter/scripts'),
  ]);

  return { eslintConfig, freighterScripts };
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

  const latestVersions = getLatestVersions();
  await git.init(fullDirectoryPath);
  process.chdir(fullDirectoryPath);

  await fs.mkdir('workspaces');
  await generateTemplateFiles({
    versions: await latestVersions,
    projectName: directory,
  });

  await yarn.install();
  await yarn.run('flow-typed', 'install', 'jest@23.0.0');

  await git.add('-A');
  await git.commit('Initial commit');
});
