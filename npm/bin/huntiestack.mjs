#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { styleText } from 'node:util';

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
    printBox([
      ['huntiestack skills installed 🎉', (text) => styleText('bold', text)],
      ['https://github.com/huntie/huntiestack', (text) => styleText('grey', text)],
      ['', (text) => text],
      ['Next step:', (text) => styleText('bold', text)],
      ['Open your agent and run /setup-devroot', (text) => text.replace('/setup-devroot', styleText('cyan', '/setup-devroot'))],
    ]);
  }
  process.exit(code ?? 1);
});

function printBox(lines) {
  const width = Math.max(...lines.map(([text]) => text.length));
  const border = (text) => styleText('dim', text);
  console.log();
  console.log(border(`╭${'─'.repeat(width + 4)}╮`));
  for (const [text, style] of lines) {
    console.log(`${border('│')}  ${style(text)}${' '.repeat(width - text.length)}  ${border('│')}`);
  }
  console.log(border(`╰${'─'.repeat(width + 4)}╯`));
}
