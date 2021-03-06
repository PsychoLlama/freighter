import latestVersion from 'latest-version';
import console from '@freighter/logger';
import fs from 'fs-extra';
import path from 'path';

import yarn from '../utils/yarn';
import git from '../utils/git';

import generatePackageJson from '../templates/package-json';

const templatePath = (filePath: string) =>
  path.join(__dirname, '../templates', filePath);

const templates = {
  babel: templatePath('babel-config.txt'),
  gitignore: templatePath('gitignore'),
  lerna: templatePath('lerna.json'),
};

const generateTemplateFiles = async ({
  projectName,
  versions,
}: {
  projectName: string;
  versions: { eslintConfig: string; freighterScripts: string };
}) => {
  const files: { [pkg: string]: string } = {
    'package.json': generatePackageJson({
      projectName,
      versions,
    }),
  };

  const writes = Object.keys(files).map((fileName) => {
    const contents = files[fileName];
    return fs.writeFile(fileName, contents);
  });

  await Promise.all(writes);
  await Promise.all([
    fs.copy(templates.babel, 'babel.config.js'),
    fs.copy(templates.gitignore, '.gitignore'),
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

async function initializeRepo(
  options: Record<string, unknown>,
  directory: string
) {
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

  await fs.mkdir('packages');
  await generateTemplateFiles({
    versions: await latestVersions,
    projectName: directory,
  });

  await yarn.install();

  await git.add('-A');
  await git.commit('Initial commit');
}

export default {
  description: 'Create a new monorepo',
  command: initializeRepo,
  args: '<project-name>',
};
