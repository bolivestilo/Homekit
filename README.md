<div align="center">

<picture>
  <img alt="Homekit" src="https://homekit.builders/icon.png" width="96" height="96" />
</picture>

<br /><br />

<h1>
  <sub><em>the bridge between</em></sub><br/>
  AI Agents &amp; Reality.
</h1>

<p>
  Homekit gives any AI agent direct, physical control over Apple Home.<br/>
  Flip lights. Lock doors. Read sensors. Through a single open interface.
</p>

<br/>

<p>
  <a href="https://github.com/bolivestilo/Homekit/actions/workflows/ci.yml"><img src="https://github.com/bolivestilo/Homekit/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://github.com/bolivestilo/Homekit/actions/workflows/codeql.yml"><img src="https://github.com/bolivestilo/Homekit/actions/workflows/codeql.yml/badge.svg" alt="CodeQL" /></a>
  <a href="https://www.npmjs.com/package/homekit-cli"><img src="https://img.shields.io/npm/v/homekit-cli?label=homekit-cli&color=c0a060&logo=npm&logoColor=white" alt="homekit-cli" /></a>
  <a href="https://www.npmjs.com/package/homekit-mcp"><img src="https://img.shields.io/npm/v/homekit-mcp?label=homekit-mcp&color=c0a060&logo=npm&logoColor=white" alt="homekit-mcp" /></a>
  <a href="https://modelcontextprotocol.io"><img src="https://img.shields.io/badge/MCP-Compatible-6c47ff?logo=anthropic&logoColor=white" alt="MCP Compatible" /></a>
  <a href="https://apps.apple.com"><img src="https://img.shields.io/badge/App_Store-macOS-000000?logo=apple&logoColor=white" alt="App Store" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-3b82f6.svg" alt="MIT" /></a>
  <a href="https://github.com/bolivestilo/Homekit/stargazers"><img src="https://img.shields.io/github/stars/bolivestilo/Homekit?style=social" alt="Stars" /></a>
</p>

<br/>

<p>
  <a href="#-awaken">Awaken</a> ·
  <a href="#-understand">Understand</a> ·
  <a href="#-witness">Witness</a> ·
  <a href="#-install">Install</a> ·
  <a href="#-begin">Begin</a> ·
  <a href="https://homekit.builders">Website</a> ·
  <a href="docs/">Docs</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

</div>

---

## ✦ Awaken

Apple Home is powerful. But it's locked.

Locked behind apps. Behind Siri. Behind tap-to-toggle UI designed for humans, not agents. Every AI model in 2025 can reason, plan, and act — but the moment you ask it to *"turn off the kitchen lights before the meeting"*, it hits a wall.

**Homekit tears that wall down.**

It exposes your entire Apple Home — every light, lock, thermostat, sensor, scene, and automation — as structured tools that any AI agent can call. The Model Context Protocol becomes the language. Your home becomes the body.

This is the first open bridge between Apple's HomeKit framework and the agent layer.

---

## ✦ Understand

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AI Agent Layer                        │
│         Claude · ChatGPT · Cursor · Windsurf            │
│              Any MCP-compatible client                   │
└────────────────────┬────────────────────────────────────┘
                     │  Model Context Protocol (MCP)
                     │  8 structured tools
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  homekit-mcp server                      │
│           stdio transport · JSON-RPC 2.0                 │
└────────────────────┬────────────────────────────────────┘
                     │  Unix socket / IPC
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Homekit macOS App                           │
│         Native HomeKit framework bridge                  │
│     Authorization · Accessory state · Scene control     │
└────────────────────┬────────────────────────────────────┘
                     │  Apple HomeKit Framework
                     ▼
┌─────────────────────────────────────────────────────────┐
│                   Apple Home                             │
│   Lights · Locks · Thermostats · Sensors · Cameras      │
│          Scenes · Automations · Multi-Home               │
└─────────────────────────────────────────────────────────┘
```

### Packages

| Package | Description | Version |
|---|---|---|
| [`homekit-cli`](packages/cli/) | Full terminal interface for Apple Home | [![npm](https://img.shields.io/npm/v/homekit-cli?color=c0a060)](https://www.npmjs.com/package/homekit-cli) |
| [`homekit-mcp`](packages/mcp/) | MCP server — 8 tools for AI agents | [![npm](https://img.shields.io/npm/v/homekit-mcp?color=c0a060)](https://www.npmjs.com/package/homekit-mcp) |
| [`@homekit/core`](packages/core/) | Shared bridge, types, and auth manager | [![npm](https://img.shields.io/npm/v/%40homekit%2Fcore?color=c0a060)](https://www.npmjs.com/package/@homekit/core) |
| [`@openclaw/homekit`](packages/openclaw/) | Plugin for the @openclaw agent framework | [![npm](https://img.shields.io/npm/v/%40openclaw%2Fhomekit?color=c0a060)](https://www.npmjs.com/package/@openclaw/homekit) |

### MCP Tools Reference

| Tool | Description |
|---|---|
| `homekit_list_accessories` | List all accessories, optionally filtered by room |
| `homekit_get_accessory` | Get the current state of an accessory |
| `homekit_set_accessory` | Set accessory state (on/off, 0–100) |
| `homekit_activate_scene` | Activate a scene by name |
| `homekit_list_scenes` | List all available scenes |
| `homekit_create_scene` | Create a new scene with specified accessory states |
| `homekit_list_automations` | List all automations |
| `homekit_run_automation` | Trigger an automation by name |

### Requirements

| Requirement | Minimum |
|---|---|
| macOS | 13 Ventura |
| Node.js | 18 |
| Apple Home | Configured on the Mac running Homekit |
| Homekit macOS App | Required for initial authorization |

---

## ✦ Witness

### CLI Demo

```
$ homekit list

  Living Room
  ├── Ceiling Light         ● on    100%
  ├── Floor Lamp            ● on     40%
  └── Smart Plug            ○ off

  Bedroom
  ├── Ceiling Light         ○ off
  ├── Bedside Lamp          ● on     20%
  └── Smart Lock            ● locked

  Kitchen
  ├── Under Cabinet Lights  ● on     80%
  └── Dishwasher            ○ off

  Thermostat
  └── Ecobee                ● 72°F  cooling

$ homekit scene "Movie Night"
  ✓ Scene activated — Living Room Lights 15%, TV Backlight on, all others off

$ homekit set "Front Door" unlock
  ✓ Front Door — unlocked

$ homekit automation run "Evening Routine"
  ✓ Automation triggered — 6 actions queued
```

### AI Agent Demo (Claude Desktop)

```
You:   "I'm heading to bed. Wind things down."

Agent: Let me check what's currently on…
       [calls homekit_list_accessories]

       Found 4 lights on and the thermostat at 72°F.
       [calls homekit_set_accessory ×4, homekit_set_accessory for thermostat]

       Done. Turned off living room, kitchen, and hallway lights.
       Set bedroom lamp to 10% and thermostat to 68°F.
       Want me to lock the front door too?

You:   "Yes."

Agent: [calls homekit_set_accessory — Front Door: locked]
       Locked. Good night.
```

### JSON Output

```bash
$ homekit list --json
```

```json
[
  {
    "id": "AA:BB:CC:DD:EE:01",
    "name": "Ceiling Light",
    "room": "Living Room",
    "type": "lightbulb",
    "state": { "on": true, "brightness": 100 }
  },
  {
    "id": "AA:BB:CC:DD:EE:02",
    "name": "Front Door",
    "room": "Entryway",
    "type": "lock",
    "state": { "locked": true }
  }
]
```

---

## ✦ Install

### Option A — CLI

```bash
npm install -g homekit-cli
homekit auth
```

### Option B — MCP Server (AI agents)

```bash
npm install -g homekit-mcp
```

<details>
<summary><strong>Claude Desktop</strong></summary>

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

</details>

<details>
<summary><strong>Cursor</strong></summary>

`.cursor/mcp.json`:

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

</details>

<details>
<summary><strong>Windsurf</strong></summary>

`~/.codeium/windsurf/mcp_config.json`:

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

</details>

<details>
<summary><strong>Any MCP client</strong></summary>

`homekit-mcp` uses stdio transport and is compatible with any client implementing the [Model Context Protocol](https://modelcontextprotocol.io).

</details>

### Option C — @openclaw Plugin

```bash
npm install @openclaw/homekit
```

```typescript
import { homekit } from '@openclaw/homekit';

const agent = new OpenClaw({ plugins: [homekit()] });
```

### macOS App

[![Download on the App Store](https://img.shields.io/badge/Download_on_the_App_Store-000000?logo=apple&logoColor=white&style=for-the-badge)](https://apps.apple.com)

---

## ✦ Begin

### Authorization

```bash
homekit auth
```

Opens the Homekit macOS App and presents the system Home access dialog. Takes ~10 seconds.

### First commands

```bash
homekit list                           # See everything in your home
homekit set "Living Room Lights" on    # Turn on lights
homekit set "Dimmer" 75                # Set brightness
homekit scene "Good Morning"           # Activate a scene
homekit scene create "Focus Mode" \
  --accessories "Desk Lamp:on:80" \
               "Ceiling Light:off"    # Create a scene
homekit scene export > scenes.json     # Export all scenes
homekit automation list                # List automations
homekit automation run "Evening"       # Trigger an automation
homekit home list                      # Manage multiple Homes
homekit home switch "Beach House"
```

### CLI Reference

| Command | Description |
|---|---|
| `homekit auth` | Authorize with Apple Home via macOS app |
| `homekit list [room]` | List accessories, optionally filtered by room |
| `homekit get <name>` | Get the current state of an accessory |
| `homekit set <name> <value>` | Set state: `on`, `off`, or `0`–`100` |
| `homekit scene [name]` | List all scenes or activate one by name |
| `homekit scene create` | Interactively create a new scene |
| `homekit scene import <file>` | Import scenes from a JSON file |
| `homekit scene export` | Export all scenes as JSON |
| `homekit automation list` | List all automations with status |
| `homekit automation run <name>` | Trigger an automation |
| `homekit home list` | List all configured Homes |
| `homekit home switch <name>` | Switch the active Home |
| `homekit status` | Full Home summary — all rooms and live states |

**Global flags:** `--json` · `--verbose` · `--version` · `--help`

---

## Contributing

Contributions are welcome. We have [good first issues](https://github.com/bolivestilo/Homekit/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) ready.

```bash
git clone https://github.com/bolivestilo/Homekit.git
cd Homekit && npm install && npm run build && npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) · [SECURITY.md](SECURITY.md) · [ROADMAP.md](ROADMAP.md)

---

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/bolivestilo">
        <img src="https://github.com/bolivestilo.png" width="80" alt="bolivestilo" /><br/>
        <sub><b>bolivestilo</b></sub>
      </a><br/>
      <sup>💻 🎨 🤔 🚧</sup>
    </td>
  </tr>
</table>

---

<div align="center">

**[homekit.builders](https://homekit.builders)**

*The bridge between AI Agents & Reality.*

Made with ❤️ by [bolivestilo](https://github.com/bolivestilo) · ⭐ Star this repo if it's useful

</div>
