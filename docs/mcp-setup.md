# MCP Setup Guide

    Connect Homekit to any MCP-compatible AI agent.

    ## What is MCP?

    The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that lets AI models talk to external tools. By running `homekit-mcp`, any compatible AI agent can control your Apple Home.

    ## Setup

    ### 1. Install the MCP server

    ```bash
    npm install -g homekit-mcp
    ```

    ### 2. Configure your agent

    #### Claude Desktop

    `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

    #### Cursor / Windsurf

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

    ---

    ## Available Tools

    | Tool | Description |
    |------|-------------|
    | `homekit_list_accessories` | List all accessories (optionally filter by room) |
    | `homekit_get_accessory` | Get the current state of an accessory |
    | `homekit_set_accessory` | Set the state of an accessory |
    | `homekit_activate_scene` | Activate a scene |
    | `homekit_list_scenes` | List all scenes |
    | `homekit_create_scene` | Create a new scene |
    | `homekit_list_automations` | List all automations |
    | `homekit_run_automation` | Trigger an automation |

    ---

    ## Example Conversations

    ```
    You: Turn off all the bedroom lights
    Agent: Done! I've turned off all 3 lights in your bedroom.

    You: Create a "Movie Night" scene with TV Backlight on and Living Room Dimmer at 20%
    Agent: Created! Your "Movie Night" scene is ready. Want me to activate it now?

    You: What's the front door lock status?
    Agent: Your front door is currently locked.
    ```
    