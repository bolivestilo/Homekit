/**
 * @openclaw/homekit — Apple Home plugin for the @openclaw agent framework.
 *
 * https://homekit.builders
 * https://github.com/bolivestilo/Homekit
 *
 * Usage:
 *   import { homekit } from '@openclaw/homekit';
 *   const agent = new OpenClaw({ plugins: [homekit()] });
 */

import { HomekitClient } from '@homekit/core';
import type { Accessory, Scene, Automation } from '@homekit/core';

export interface HomekitPluginOptions {
  /** Override the IPC socket path (default: ~/.homekit/homekit.sock) */
  socketPath?: string;
  /** Log level (default: 'info') */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

export interface OpenClawPlugin {
  name: string;
  version: string;
  tools: OpenClawTool[];
}

export interface OpenClawTool {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  run: (params: Record<string, unknown>) => Promise<string>;
}

/**
 * Create the @openclaw/homekit plugin.
 *
 * @example
 * ```typescript
 * import { OpenClaw } from '@openclaw/core';
 * import { homekit } from '@openclaw/homekit';
 *
 * const agent = new OpenClaw({ plugins: [homekit()] });
 * const res = await agent.run('Turn off all the bedroom lights');
 * ```
 */
export function homekit(options: HomekitPluginOptions = {}): OpenClawPlugin {
  const client = new HomekitClient(options);

  return {
    name: '@openclaw/homekit',
    version: '1.1.0',
    tools: [
      {
        name: 'list_accessories',
        description:
          'List all Apple Home accessories with their current state. ' +
          'Optionally filter by room name.',
        parameters: {
          type: 'object',
          properties: {
            room: { type: 'string', description: 'Optional room filter.' },
          },
        },
        async run(params): Promise<string> {
          const accessories: Accessory[] = await client.listAccessories(
            params['room'] as string | undefined
          );
          return JSON.stringify(accessories, null, 2);
        },
      },

      {
        name: 'control_accessory',
        description:
          'Control an Apple Home accessory. ' +
          'Use "on"/"off" for lights and switches, 0–100 for brightness, ' +
          '"lock"/"unlock" for smart locks.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Accessory display name.' },
            value: { description: 'on, off, lock, unlock, or 0–100.' },
          },
          required: ['name', 'value'],
        },
        async run(params): Promise<string> {
          await client.setAccessory(
            params['name'] as string,
            params['value'] as string | number
          );
          return `✓ ${params['name']} set to ${params['value']}`;
        },
      },

      {
        name: 'activate_scene',
        description: 'Activate an Apple Home scene by name.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Scene name.' },
          },
          required: ['name'],
        },
        async run(params): Promise<string> {
          await client.activateScene(params['name'] as string);
          return `✓ Scene "${params['name']}" activated`;
        },
      },

      {
        name: 'create_scene',
        description: 'Create a new Apple Home scene.',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Scene name.' },
            accessories: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  value: { description: 'on, off, or 0–100' },
                },
              },
            },
          },
          required: ['name', 'accessories'],
        },
        async run(params): Promise<string> {
          const scene: Scene = await client.createScene(
            params['name'] as string,
            params['accessories'] as Array<{ name: string; value: string | number }>
          );
          return `✓ Scene "${scene.name}" created`;
        },
      },
    ],
  };
}

// Re-export types for consumers
export type { Accessory, Scene, Automation };
