import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { printAutomations, success, fatal } from '../lib/output.js';

export function registerAutomation(program: Command): void {
  const auto = program
    .command('automation')
    .description('Manage automations');

  auto
    .command('list')
    .description('List all automations')
    .action(async () => {
      const client = new HomekitClient();
      try {
        const automations = await client.listAutomations();
        printAutomations(automations);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });

  auto
    .command('run <name>')
    .description('Trigger an automation by name')
    .action(async (name: string) => {
      const client = new HomekitClient();
      try {
        await client.runAutomation(name);
        success(`Automation triggered — ${name}`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
