import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { printHomes, success, fatal } from '../lib/output.js';

export function registerHome(program: Command): void {
  const home = program
    .command('home')
    .description('Manage multiple Apple Homes');

  home
    .command('list')
    .description('List all configured Homes')
    .action(async () => {
      const client = new HomekitClient();
      try {
        const homes = await client.listHomes();
        printHomes(homes);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });

  home
    .command('switch <name>')
    .description('Switch the active Home')
    .action(async (name: string) => {
      const client = new HomekitClient();
      try {
        await client.switchHome(name);
        success(`Switched to "${name}"`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
