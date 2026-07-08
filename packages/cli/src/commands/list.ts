import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { printAccessories, fatal } from '../lib/output.js';

export function registerList(program: Command): void {
  program
    .command('list [room]')
    .description('List all accessories, optionally filtered by room')
    .action(async (room?: string) => {
      const client = new HomekitClient();
      try {
        const accessories = await client.listAccessories(room);
        if (accessories.length === 0) {
          console.log(room
            ? `  No accessories found in "${room}".`
            : '  No accessories found.'
          );
          return;
        }
        printAccessories(accessories);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
