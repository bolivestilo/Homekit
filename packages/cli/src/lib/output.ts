/**
 * Output formatting — human-readable tables or --json machine output.
 */

import type { Accessory, Scene, Automation, Home } from '@homekit/core';

export function isJsonMode(): boolean {
  return process.argv.includes('--json');
}

export function printJson(data: unknown): void {
  console.log(JSON.stringify(data, null, 2));
}

export function printAccessories(accessories: Accessory[]): void {
  if (isJsonMode()) {
    printJson(accessories);
    return;
  }

  // Group by room
  const byRoom = accessories.reduce<Record<string, Accessory[]>>((acc, a) => {
    const room = a.room || 'Other';
    (acc[room] ??= []).push(a);
    return acc;
  }, {});

  for (const [room, items] of Object.entries(byRoom)) {
    console.log(`\n  ${room}`);
    for (let i = 0; i < items.length; i++) {
      const a = items[i];
      const isLast = i === items.length - 1;
      const prefix = isLast ? '  └──' : '  ├──';
      const state = formatState(a);
      const reachable = a.reachable ? '' : ' ⚠ unreachable';
      console.log(`${prefix} ${a.name.padEnd(28)} ${state}${reachable}`);
    }
  }
  console.log('');
}

function formatState(a: Accessory): string {
  const s = a.state as Record<string, unknown>;
  if ('on' in s) {
    const dot = s['on'] ? '●' : '○';
    const bri = typeof s['brightness'] === 'number' ? `  ${String(s['brightness']).padStart(3)}%` : '';
    return `${dot} ${s['on'] ? 'on ' : 'off'}${bri}`;
  }
  if ('locked' in s) {
    return s['locked'] ? '● locked' : '○ unlocked';
  }
  if ('currentTemp' in s) {
    return `● ${s['currentTemp']}°F  ${s['mode']}`;
  }
  return '● active';
}

export function printScenes(scenes: Scene[]): void {
  if (isJsonMode()) {
    printJson(scenes);
    return;
  }
  if (scenes.length === 0) {
    console.log('  No scenes found.\n');
    return;
  }
  console.log('');
  for (const s of scenes) {
    console.log(`  ◆  ${s.name}`);
  }
  console.log('');
}

export function printAutomations(automations: Automation[]): void {
  if (isJsonMode()) {
    printJson(automations);
    return;
  }
  if (automations.length === 0) {
    console.log('  No automations found.\n');
    return;
  }
  console.log('');
  for (const a of automations) {
    const status = a.enabled ? '● enabled' : '○ disabled';
    console.log(`  ${a.name.padEnd(32)} ${status}`);
  }
  console.log('');
}

export function printHomes(homes: Home[]): void {
  if (isJsonMode()) {
    printJson(homes);
    return;
  }
  console.log('');
  for (const h of homes) {
    const active = h.primary ? ' ◀ active' : '';
    console.log(`  ${h.primary ? '●' : '○'}  ${h.name}${active}`);
  }
  console.log('');
}

export function success(msg: string): void {
  console.log(`  ✓ ${msg}`);
}

export function fatal(msg: string, code = 1): never {
  console.error(`  ✗ ${msg}`);
  process.exit(code);
}
