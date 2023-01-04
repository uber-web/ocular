import {execSync} from 'child_process';

export function execShellCommand(command, args = []) {
  try {
    execSync(`${command} ${args.join(' ')}`, {
      stdio: 'inherit'
    });
  } catch (err) {
    process.exit(err.status);
  }
}
