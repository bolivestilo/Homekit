import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { printJson, fatal, isJsonMode } from '../lib/output.js';

export function registerGet(program: Command): void {
  program
    .command('get <name>')
    .description('Get the current state of an accessory')
    .action(async (name: string) => {
      const client = new HomekitClient();
      try {
        const accessory = await client.getAccessory(name);
        if (isJsonMode()) {
          printJson(accessory);
        } else {
          console.log(`\n  ${accessory.name}`);
          console.log(`  Room:  ${accessory.room}`);
          console.log(`  Type:  ${accessory.type}`);
          console.log(`  State: ${JSON.stringify(accessory.state)}\n`);
        }
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
