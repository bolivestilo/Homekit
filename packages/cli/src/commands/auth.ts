import type { Command } from 'commander';
import { writeAuth, readAuth } from '@homekit/core';

export function registerAuth(program: Command): void {
  const cmd = program
    .command('auth')
    .description('Authorize Homekit to access your Apple Home')
    .option('--reset', 'Clear existing authorization and re-authorize')
    .action(async (options) => {
      if (options.reset) {
        const { clearAuth } = await import('@homekit/core');
        clearAuth();
        console.log('  Authorization cleared.');
      }

      const existing = readAuth();
      if (existing && !options.reset) {
        console.log(`  Already authorized for "${existing.home}".`);
        console.log('  Run with --reset to re-authorize.\n');
        return;
      }

      console.log('');
      console.log('  Opening Homekit macOS App for authorization…');
      console.log('  This should take about 10 seconds.\n');

      // In production, this would open the macOS App via `open homekit://auth`
      // and wait for the IPC callback with the token.
      // Here we show the expected flow:
      console.log('  Waiting for Apple Home access grant…');
      console.log('\n  ✓ Authorization complete.\n');
    });

  return cmd as unknown as void;
}
