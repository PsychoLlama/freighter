// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../templates/package-json';
import generatePrettierConfig from '../templates/prettier';
import generateFlowConfig from '../templates/flowconfig';
import generateEslintConfig from '../templates/eslint';
import generateGitignore from '../templates/gitignore';
import generateJestConfig from '../templates/jest';
import { command } from './decorator';
import console from '../console';

const git = {
  commit: msg => spawn('git', ['commit', '-m', msg, '--no-verify']),
  init: directory => spawn('git', ['init', '--quiet', directory]),
  add: files => spawn('git', ['add', files]),
};

const README_PATH = path.join(__dirname, '../templates/README.md');
const generateTemplateFiles = (projectName: string) => {
  const files = {
    'package.json': generatePackageJson({ name: projectName }),
    '.prettierrc.yml': generatePrettierConfig(),
    '.eslintrc.yml': generateEslintConfig(),
    'jest.config.js': generateJestConfig(),
    '.flowconfig': generateFlowConfig(),
    '.gitignore': generateGitignore(),
  };

  return Promise.all([
    fs.writeFile('.prettierrc.yml', files['.prettierrc.yml']),
    fs.writeFile('jest.config.js', files['jest.config.js']),
    fs.writeFile('.eslintrc.yml', files['.eslintrc.yml']),
    fs.writeFile('package.json', files['package.json']),
    fs.writeFile('.flowconfig', files['.flowconfig']),
    fs.writeFile('.gitignore', files['.gitignore']),
    fs.copy(README_PATH, 'workspaces/README.md'),
  ]);
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

  await git.init(fullDirectoryPath);
  process.chdir(fullDirectoryPath);

  await fs.mkdir('workspaces');
  await generateTemplateFiles(directory);

  await yarn.install();
  await yarn.run('flow-typed', 'install', '--skip');

  await git.add('-A');
  await git.commit('Initial commit');
});
