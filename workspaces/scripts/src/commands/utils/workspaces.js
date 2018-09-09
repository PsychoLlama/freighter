// @flow
import fs from 'fs-extra';
import path from 'path';

// List every workspace when given a path to the repo.
export const listWorkspaces = async (repoPath: string): Promise<string[]> => {
  // List everything in the workspaces directory.
  const workspacesDir = path.join(repoPath, 'workspaces');
  const workspaces = await fs.readdir(workspacesDir);

  // See which ones have a package.json.
  const pkgJsonQueries = await Promise.all(
    workspaces.map(async workspace => {
      const workspacePath = path.join(workspacesDir, workspace);
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

export const hasWorkspaces = async (repoPath: string) => {
  const workspaces = await listWorkspaces(repoPath);

  return Boolean(workspaces.length);
};
