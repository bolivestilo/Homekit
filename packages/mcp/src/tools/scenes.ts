/**
 * MCP tools: scene management.
 */

import { z } from 'zod';
import type { HomekitClient } from '@homekit/core';

export const sceneTools = [
  {
    name: 'homekit_list_scenes',
    description: 'List all available Apple Home scenes.',
    inputSchema: { type: 'object', properties: {} },
    inputValidator: z.object({}),
    async handler(client: HomekitClient): Promise<string> {
      const scenes = await client.listScenes();
      return JSON.stringify(scenes, null, 2);
    },
  },

  {
    name: 'homekit_activate_scene',
    description: 'Activate an Apple Home scene by name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The scene name, as shown in Apple Home.',
        },
      },
      required: ['name'],
    },
    inputValidator: z.object({ name: z.string() }),
    async handler(
      client: HomekitClient,
      input: { name: string }
    ): Promise<string> {
      await client.activateScene(input.name);
      return `✓ Scene "${input.name}" activated`;
    },
  },

  {
    name: 'homekit_create_scene',
    description:
      'Create a new Apple Home scene with specified accessory states. ' +
      'Each accessory entry needs a name and a value (on/off/0-100).',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The name for the new scene.' },
        accessories: {
          type: 'array',
          description: 'Accessories and their target states.',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              value: { description: 'on, off, or 0–100' },
            },
            required: ['name', 'value'],
          },
        },
      },
      required: ['name', 'accessories'],
    },
    inputValidator: z.object({
      name: z.string(),
      accessories: z.array(
        z.object({
          name: z.string(),
          value: z.union([z.string(), z.number()]),
        })
      ),
    }),
    async handler(
      client: HomekitClient,
      input: { name: string; accessories: Array<{ name: string; value: string | number }> }
    ): Promise<string> {
      const scene = await client.createScene(input.name, input.accessories);
      return `✓ Scene "${scene.name}" created`;
    },
  },
];
