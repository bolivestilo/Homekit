/**
 * MCP tools: automation management.
 */

import { z } from 'zod';
import type { HomekitClient } from '@homekit/core';

export const automationTools = [
  {
    name: 'homekit_list_automations',
    description: 'List all Apple Home automations with their enabled status and trigger type.',
    inputSchema: { type: 'object', properties: {} },
    inputValidator: z.object({}),
    async handler(client: HomekitClient): Promise<string> {
      const automations = await client.listAutomations();
      return JSON.stringify(automations, null, 2);
    },
  },

  {
    name: 'homekit_run_automation',
    description: 'Trigger an Apple Home automation by name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The automation name, as shown in Apple Home.',
        },
      },
      required: ['name'],
    },
    inputValidator: z.object({ name: z.string() }),
    async handler(
      client: HomekitClient,
      input: { name: string }
    ): Promise<string> {
      await client.runAutomation(input.name);
      return `✓ Automation "${input.name}" triggered`;
    },
  },
];
