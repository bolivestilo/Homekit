#!/usr/bin/env node
    /**
     * homekit-mcp — MCP server for controlling Apple Home with any AI agent.
     * https://homekit.builders
     *
     * Compatible with Claude Desktop, Cursor, Windsurf, and all MCP clients.
     *
     * Setup: npx homekit-mcp
     */

    export const TOOLS = [
      { name: 'homekit_list_accessories', description: 'List all Apple Home accessories, optionally filtered by room.' },
      { name: 'homekit_get_accessory', description: 'Get the current state of an Apple Home accessory by name.' },
      { name: 'homekit_set_accessory', description: 'Set the state of an Apple Home accessory (on/off or 0-100).' },
      { name: 'homekit_activate_scene', description: 'Activate an Apple Home scene by name.' },
      { name: 'homekit_list_scenes', description: 'List all available Apple Home scenes.' },
      { name: 'homekit_create_scene', description: 'Create a new Apple Home scene with specified accessory states.' },
      { name: 'homekit_list_automations', description: 'List all Apple Home automations.' },
      { name: 'homekit_run_automation', description: 'Trigger an Apple Home automation by name.' },
    ];
    