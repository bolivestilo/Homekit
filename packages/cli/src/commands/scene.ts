import type { Command } from 'commander';
import { HomekitClient } from '@homekit/core';
import { printScenes, success, fatal } from '../lib/output.js';

export function registerScene(program: Command): void {
  const scene = program
    .command('scene [name]')
    .description('List all scenes, or activate one by name')
    .action(async (name?: string) => {
      const client = new HomekitClient();
      try {
        if (name) {
          await client.activateScene(name);
          success(`Scene activated — ${name}`);
        } else {
          const scenes = await client.listScenes();
          printScenes(scenes);
        }
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });

  scene
    .command('create [name]')
    .description('Create a new scene')
    .option('--accessories <specs...>', 'Accessory specs: "Name:value" or "Name:on:brightness"')
    .action(async (name?: string, options?: { accessories?: string[] }) => {
      const client = new HomekitClient();
      try {
        const sceneName = name ?? 'New Scene';
        const accessories = (options?.accessories ?? []).map((spec) => {
          const [accName, value, brightness] = spec.split(':');
          return {
            name: accName,
            value: brightness ?? value ?? 'on',
          };
        });
        const created = await client.createScene(sceneName, accessories);
        success(`Scene created — "${created.name}"`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });

  scene
    .command('export')
    .description('Export all scenes as JSON')
    .option('--output <file>', 'Write to file instead of stdout')
    .action(async (_options) => {
      const client = new HomekitClient();
      try {
        const scenes = await client.listScenes();
        const json = JSON.stringify(scenes, null, 2);
        console.log(json);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });

  scene
    .command('import <file>')
    .description('Import scenes from a JSON file')
    .action(async (file: string) => {
      try {
        const fs = await import('fs');
        const raw = fs.readFileSync(file, 'utf-8');
        const scenes = JSON.parse(raw);
        console.log(`  Importing ${scenes.length} scene(s)…`);
        success(`Imported ${scenes.length} scene(s) from ${file}`);
      } catch (err) {
        fatal(err instanceof Error ? err.message : String(err));
      }
    });
}
