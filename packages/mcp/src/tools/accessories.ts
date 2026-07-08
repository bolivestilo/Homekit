/**
 * MCP tools: accessory control.
 */

import { z } from 'zod';
import type { HomekitClient } from '@homekit/core';

export const accessoryTools = [
  {
    name: 'homekit_list_accessories',
    description:
      'List all Apple Home accessories with their current state. ' +
      'Optionally filter by room name.',
    inputSchema: {
      type: 'object',
      properties: {
        room: {
          type: 'string',
          description: 'Optional. Filter to a specific room (case-insensitive).',
        },
      },
    },
    inputValidator: z.object({ room: z.string().optional() }),
    async handler(
      client: HomekitClient,
      input: { room?: string }
    ): Promise<string> {
      const accessories = await client.listAccessories(input.room);
      return JSON.stringify(accessories, null, 2);
    },
  },

  {
    name: 'homekit_get_accessory',
    description:
      'Get the full current state of a specific Apple Home accessory by name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The accessory display name, as shown in Apple Home.',
        },
      },
      required: ['name'],
    },
    inputValidator: z.object({ name: z.string() }),
    async handler(
      client: HomekitClient,
      input: { name: string }
    ): Promise<string> {
      const accessory = await client.getAccessory(input.name);
      return JSON.stringify(accessory, null, 2);
    },
  },

  {
    name: 'homekit_set_accessory',
    description:
      'Set the state of an Apple Home accessory. ' +
      'Use "on" or "off" for lights and switches. ' +
      'Use 0–100 for brightness. ' +
      'Use "lock" or "unlock" for smart locks. ' +
      'Use a number like 72 for thermostat temperature.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The accessory display name.',
        },
        value: {
          description: '"on", "off", "lock", "unlock", or a number (0–100 for brightness, temperature for thermostats).',
        },
      },
      required: ['name', 'value'],
    },
    inputValidator: z.object({
      name: z.string(),
      value: z.union([z.string(), z.number()]),
    }),
    async handler(
      client: HomekitClient,
      input: { name: string; value: string | number }
    ): Promise<string> {
      await client.setAccessory(input.name, input.value);
      return `✓ ${input.name} set to ${input.value}`;
    },
  },
];
