# @openclaw/homekit Plugin

The `@openclaw/homekit` package is an [OpenClaw](https://openclaw.dev) plugin that gives any OpenClaw agent direct control over Apple Home.

## Installation

```bash
npm install @openclaw/homekit
```

## Setup

```typescript
import { OpenClaw } from '@openclaw/core';
import { homekit } from '@openclaw/homekit';

const agent = new OpenClaw({
  plugins: [homekit()],
});
```

## Configuration

```typescript
homekit({
  socketPath: '/tmp/homekit.sock',  // override IPC socket (optional)
  logLevel: 'info',                  // 'debug' | 'info' | 'warn' | 'error'
})
```

## Available tools

| Tool | Description |
|---|---|
| `list_accessories` | List all Apple Home accessories |
| `control_accessory` | Control an accessory (on/off, brightness) |
| `activate_scene` | Activate an Apple Home scene |
| `create_scene` | Create a new scene |

## Example

```typescript
const agent = new OpenClaw({
  plugins: [homekit()],
  system: 'You are a smart home assistant. Help the user control their Apple Home.',
});

const response = await agent.run('Turn off all the lights and lock the front door.');
```

## Requirements

- Homekit macOS App installed and running
- `homekit auth` completed
- macOS 13 Ventura or later
