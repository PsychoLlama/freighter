import { spawn } from 'promisify-child-process';

export default {
  install: () =>
    spawn('yarn', ['install'], {
      stdio: 'inherit',
    }),
};
