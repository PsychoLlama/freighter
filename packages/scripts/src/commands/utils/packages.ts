import fs from 'fs-extra';
import path from 'path';

// List every workspace when given a path to the repo.
export const listPackages = async (repoPath: string): Promise<string[]> => {
  // List everything in the packages directory.
  const packagesDir = path.join(repoPath, 'packages');
  const packages = await fs.readdir(packagesDir);

  // See which ones have a package.json.
  const pkgJsonQueries = await Promise.all(
    packages.map(async workspace => {
      const workspacePath = path.join(packagesDir, workspace);
      const pkgJsonPath = path.join(workspacePath, 'package.json');

      return {
        isWorkspace: await fs.pathExists(pkgJsonPath),
        workspacePath,
      };
    })
  );

  // Filter out false positives and
  // return only the workspace path.
  return pkgJsonQueries
    .filter(result => result.isWorkspace)
    .map(result => result.workspacePath);
};

export const hasPackages = async (repoPath: string) => {
  const packages = await listPackages(repoPath);

  return packages.length > 0;
};
