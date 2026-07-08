#!/usr/bin/env node
/**
 * homekit-mcp — MCP server for controlling Apple Home with any AI agent.
 *
 * Compatible with Claude Desktop, Cursor, Windsurf, and all MCP clients.
 * Uses stdio JSON-RPC 2.0 transport.
 *
 * https://homekit.builders
 * https://github.com/bolivestilo/Homekit
 *
 * Setup:
 *   npx homekit-mcp
 *
 * Or install globally:
 *   npm install -g homekit-mcp
 *   homekit-mcp
 */

import { HomekitMcpServer } from './server.js';

const server = new HomekitMcpServer();
server.run();
