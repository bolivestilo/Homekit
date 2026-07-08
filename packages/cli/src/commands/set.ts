import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { success, fatal } from '../lib/output.js';

export function registerSet(program: Command): void {
  program
    .command('set <name> <value>')
    .description("Set accessory state: 'on', 'off', 'lock', 'unlock', or 0–100")
    .action(async (name: string, value: string) => {
      const client = new HomekitClient();
      try {
        const parsed = /^\d+$/.test(value) ? parseInt(value, 10) : value;
        await client.setAccessory(name, parsed);
        success(`${name} — ${value}`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
