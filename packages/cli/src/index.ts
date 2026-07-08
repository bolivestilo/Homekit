#!/usr/bin/env node
/**
 * homekit-cli — Control your Apple Home from the command line.
 *
 * https://homekit.builders
 * https://github.com/bolivestilo/Homekit
 */

import { Command } from 'commander';
import { registerAuth } from './commands/auth.js';
import { registerList } from './commands/list.js';
import { registerGet } from './commands/get.js';
import { registerSet } from './commands/set.js';
import { registerScene } from './commands/scene.js';
import { registerAutomation } from './commands/automation.js';
import { registerHome } from './commands/home.js';
import { registerStatus } from './commands/status.js';

const program = new Command();

program
  .name('homekit')
  .description('Control your Apple Home from the command line.')
  .version('1.1.0', '--version', 'Print version and exit')
  .option('--json', 'Output as machine-readable JSON')
  .option('--verbose', 'Enable verbose debug logging')
  .addHelpText('after', `
Documentation:  https://homekit.builders/docs
Repository:     https://github.com/bolivestilo/Homekit
`);

registerAuth(program);
registerList(program);
registerGet(program);
registerSet(program);
registerScene(program);
registerAutomation(program);
registerHome(program);
registerStatus(program);

program.parse(process.argv);
