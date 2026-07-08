# Architecture

## Overview

Homekit is a TypeScript monorepo with four packages that together form a complete bridge between AI agents and Apple Home.

```
packages/
├── core/        @homekit/core       — shared bridge, types, auth
├── cli/         homekit-cli         — terminal interface
├── mcp/         homekit-mcp         — MCP server for AI agents
└── openclaw/    @openclaw/homekit   — @openclaw plugin
```

## Data flow

```
AI Agent (Claude, GPT, Cursor, Windsurf…)
    │
    │  Model Context Protocol — stdio JSON-RPC 2.0
    ▼
homekit-mcp
    │
    │  uses @homekit/core HomekitClient
    ▼
@homekit/core
    │
    │  Unix socket IPC → Homekit macOS App
    ▼
Homekit macOS App (Swift)
    │
    │  Apple HomeKit Framework
    ▼
Apple Home
```

The macOS app is the only component with direct HomeKit framework access. All Node.js packages communicate with it via a local Unix socket, authenticated with a token generated during `homekit auth`.

## @homekit/core

The `@homekit/core` package is the shared foundation. It owns:

- **`HomekitClient`** — the single connection point to the macOS app
- **`AuthManager`** — reads and writes the auth token from `~/.homekit/auth.json`
- **`HomekitConfig`** — loads configuration from `~/.homekit/config.json`
- **All TypeScript types** — `Accessory`, `Scene`, `Automation`, `Room`, `Home`

Both `homekit-cli` and `homekit-mcp` use `HomekitClient` directly. This ensures consistent behavior across both surfaces.

## homekit-cli

The CLI is built with [commander.js](https://github.com/tj/commander.js). Each subcommand (`list`, `set`, `scene`, `automation`, `home`) is a separate file under `packages/cli/src/commands/`.

The CLI uses `@homekit/core` for all data access and formats output via `packages/cli/src/lib/output.ts` — either as a human-readable table or `--json` machine output.

## homekit-mcp

The MCP server uses stdio transport (JSON-RPC 2.0) and is compatible with any MCP client. Each of the 8 tools maps to a method on `HomekitClient`. The server handles tool discovery, input validation (Zod schemas), and error formatting.

## @openclaw/homekit

A thin plugin layer that wraps `HomekitClient` in the @openclaw plugin interface. Exposes 4 tools: `list_accessories`, `control_accessory`, `activate_scene`, `create_scene`.

## Security model

- The Unix socket is protected by macOS file permissions (`700`)
- Auth token is stored in `~/.homekit/auth.json` with `600` permissions
- The macOS app validates every request against the stored token
- No network traffic is required — everything is local IPC

## Configuration

All configuration lives in `~/.homekit/`:

```
~/.homekit/
├── auth.json        { "token": "...", "home": "..." }
├── config.json      { "socketPath": "...", "logLevel": "info" }
└── aliases.json     { "lr": "Living Room Lights", ... }
```
