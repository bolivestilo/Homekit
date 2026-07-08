/**
 * homekit-mcp — MCP server implementation (stdio / JSON-RPC 2.0).
 * https://homekit.builders
 */

import { HomekitClient } from '@homekit/core';
import { accessoryTools } from './tools/accessories.js';
import { sceneTools } from './tools/scenes.js';
import { automationTools } from './tools/automations.js';

type Tool = {
  name: string;
  description: string;
  inputSchema: unknown;
  inputValidator: { parse: (v: unknown) => unknown };
  handler: (client: HomekitClient, input: unknown) => Promise<string>;
};

const ALL_TOOLS: Tool[] = [
  ...accessoryTools,
  ...sceneTools,
  ...automationTools,
] as Tool[];

const TOOL_MAP = new Map(ALL_TOOLS.map((t) => [t.name, t]));

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

export class HomekitMcpServer {
  private client = new HomekitClient();

  async handleRequest(req: JsonRpcRequest): Promise<JsonRpcResponse> {
    const { id, method, params } = req;

    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: { tools: {} },
            serverInfo: { name: 'homekit-mcp', version: '1.1.0' },
          },
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: ALL_TOOLS.map((t) => ({
              name: t.name,
              description: t.description,
              inputSchema: t.inputSchema,
            })),
          },
        };

      case 'tools/call': {
        const toolName = (params as Record<string, unknown>)?.name as string;
        const toolInput = (params as Record<string, unknown>)?.arguments ?? {};
        const tool = TOOL_MAP.get(toolName);

        if (!tool) {
          return {
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Unknown tool: ${toolName}` },
          };
        }

        try {
          const parsed = tool.inputValidator.parse(toolInput);
          const text = await tool.handler(this.client, parsed);
          return {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text }],
            },
          };
        } catch (err) {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32603,
              message: err instanceof Error ? err.message : String(err),
            },
          };
        }
      }

      default:
        return {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Method not found: ${method}` },
        };
    }
  }

  /** Start stdio transport. */
  run(): void {
    process.stdin.setEncoding('utf-8');
    let buffer = '';

    process.stdin.on('data', async (chunk: string) => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          const req: JsonRpcRequest = JSON.parse(trimmed);
          const res = await this.handleRequest(req);
          process.stdout.write(JSON.stringify(res) + '\n');
        } catch {
          const errResponse: JsonRpcResponse = {
            jsonrpc: '2.0',
            id: 0,
            error: { code: -32700, message: 'Parse error' },
          };
          process.stdout.write(JSON.stringify(errResponse) + '\n');
        }
      }
    });

    process.stdin.on('end', () => process.exit(0));
    process.on('SIGTERM', () => process.exit(0));
    process.on('SIGINT', () => process.exit(0));
  }
}
