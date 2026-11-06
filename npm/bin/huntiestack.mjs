#!/usr/bin/env node

import { spawn } from 'node:child_process';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 20)) {
  console.error(`huntiestack setup needs Node.js 22.20 or later (found v${process.versions.node})`);
  process.exit(1);
}

const args = process.argv.slice(2);
const uninstall = args[0] === 'uninstall';
const skillsArgs = uninstall
  ? ['remove', 'huntie/huntiestack', '-g', ...args.slice(1)]
  : ['add', 'huntie/huntiestack', '--skill', '*', '-g', ...args];
const child = spawn(
  'npx',
  // --package overrides the npm_config_package an outer npx sets.
  ['-y', '--package', 'skills@1', '--', 'skills', ...skillsArgs],
  { stdio: 'inherit' },
);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('exit', (code, signal) => {
  if (signal) {
    process.removeAllListeners(signal);
    process.kill(process.pid, signal);
    return;
  }
  if (code === 0 && !uninstall && !args.some((arg) => arg === '-l' || arg === '--list')) {
    console.log('\nNext: open your agent and run /setup-devroot');
  }
  process.exit(code ?? 1);
});
