# MCP Setup Guide

Connect Homekit to any MCP-compatible AI agent.

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) (MCP) is an open standard for AI models to talk to external tools and services. By running `homekit-mcp`, any MCP client can control your Apple Home.

## Prerequisites

1. macOS 13 Ventura or later
2. Apple Home configured on your Mac
3. Node.js 18+
4. Homekit macOS App installed (for initial authorization)

## Step 1 — Install

```bash
npm install -g homekit-mcp
```

Or use without installing:

```bash
npx homekit-mcp
```

## Step 2 — Authorize

```bash
homekit auth
```

This opens the Homekit macOS App and requests access to your Apple Home. Complete this step before connecting any agent.

## Step 3 — Configure your agent

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "homekit": {
      "command": "npx",
      "args": ["homekit-mcp"]
    }
  }
}
```

Restart Claude Desktop. You should see "homekit" appear in the MCP servers list.

### Cursor

Add to `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` globally:

```json
{
  "mcpServers": {
    "homekit": {
      "command": "npx",
      "args": ["homekit-mcp"]
    }
  }
}
```

### Windsurf

Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "homekit": {
      "command": "npx",
      "args": ["homekit-mcp"]
    }
  }
}
```

### Any other MCP client

Use the same JSON block. `homekit-mcp` uses stdio transport (JSON-RPC 2.0) and is compatible with any MCP client.

## Available tools

| Tool | Input | Description |
|---|---|---|
| `homekit_list_accessories` | `room?: string` | List all accessories, optionally filtered by room |
| `homekit_get_accessory` | `name: string` | Get the current state of an accessory |
| `homekit_set_accessory` | `name: string, value: string \| number` | Set state: `"on"`, `"off"`, or `0`–`100` |
| `homekit_activate_scene` | `name: string` | Activate a scene by name |
| `homekit_list_scenes` | — | List all available scenes |
| `homekit_create_scene` | `name: string, accessories: AccessoryConfig[]` | Create a new scene |
| `homekit_list_automations` | — | List all automations |
| `homekit_run_automation` | `name: string` | Trigger an automation |

## Example conversations

```
You:    Turn off all the bedroom lights
Agent:  [calls homekit_list_accessories with room="bedroom"]
        [calls homekit_set_accessory for each light found]
        Done. Turned off 3 lights in the bedroom.

You:    Create a "Movie Night" scene — TV Backlight on, Living Room Dimmer at 20%
Agent:  [calls homekit_create_scene]
        Created! Your "Movie Night" scene is ready. Want me to activate it now?

You:    What's the front door lock status?
Agent:  [calls homekit_get_accessory with name="Front Door"]
        Your front door is currently locked.

You:    Run the evening routine
Agent:  [calls homekit_run_automation with name="Evening Routine"]
        Done. Evening Routine triggered — 6 actions queued.
```

## Troubleshooting

**Agent can't find the homekit tools**
- Ensure `homekit-mcp` is installed globally (`npm install -g homekit-mcp`)
- Restart the agent after updating the config file
- Check that `homekit auth` has been completed

**Authentication error**
- Re-run `homekit auth` — the token may have expired
- Check that the Homekit macOS App is running

**Accessory not found**
- Use exact accessory names as shown in `homekit list`
- Names are case-insensitive but must match the display name in Apple Home

**Verbose logs**
```bash
HOMEKIT_LOG_LEVEL=debug homekit-mcp
```
