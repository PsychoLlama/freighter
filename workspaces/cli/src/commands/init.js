// @flow
import { spawn } from 'promisify-child-process';
import fs from 'fs-extra';
import path from 'path';

import generatePackageJson from '../templates/package-json';
import generateFlowConfig from '../templates/flowconfig';
import generateGitignore from '../templates/gitignore';
import { command } from './decorator';
import console from '../console';

const git = {
  init: directory => spawn('git', ['init', '--quiet', directory]),
  commit: msg => spawn('git', ['commit', '-m', msg]),
  add: files => spawn('git', ['add', files]),
};

const generateTemplateFiles = (projectName: string) => {
  const files = {
    'package.json': generatePackageJson({ name: projectName }),
    '.flowconfig': generateFlowConfig(),
    '.gitignore': generateGitignore(),
  };

  return Promise.all([
    fs.writeFile('package.json', files['package.json']),
    fs.writeFile('.gitignore', files['.gitignore']),
    fs.writeFile('.flowconfig', files['.flowconfig']),
  ]);
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

  await generateTemplateFiles(directory);

  const installation = spawn('yarn', ['install']);
  installation.stdout.pipe(process.stdout);
  installation.stderr.pipe(process.stderr);
  await installation;

  await git.add('-A');
  await git.commit('Initial commit');
});
