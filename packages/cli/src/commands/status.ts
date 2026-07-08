import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { fatal, printJson } from '../lib/output.js';

export function registerStatus(program: Command): void {
  program
    .command('status')
    .description('Full Home summary — all rooms and live states')
    .action(async () => {
      const client = new HomekitClient();
      try {
        const [accessories, scenes, automations] = await Promise.all([
          client.listAccessories(),
          client.listScenes(),
          client.listAutomations(),
        ]);

        if (process.argv.includes('--json')) {
          printJson({ accessories, scenes, automations });
          return;
        }

        const onCount = accessories.filter((a) => {
          const s = a.state as Record<string, unknown>;
          return s['on'] === true;
        }).length;

        const rooms = [...new Set(accessories.map((a) => a.room))];

        console.log(`\n  Home Status\n`);
        console.log(`  Rooms:         ${rooms.length}`);
        console.log(`  Accessories:   ${accessories.length} total, ${onCount} on`);
        console.log(`  Scenes:        ${scenes.length}`);
        console.log(`  Automations:   ${automations.filter((a) => a.enabled).length} enabled\n`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
