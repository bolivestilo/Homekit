# Changelog

    All notable changes to Homekit are documented here.

    The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
    and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

    ## [Unreleased]

    ## [1.0.0] — 2025-07-08

    ### Added
    - **homekit-cli** — Full terminal interface for controlling Apple Home
      - `homekit auth` — Authorize with Apple Home via macOS app
      - `homekit list` — List all accessories with live state
      - `homekit get <name>` — Get accessory state
      - `homekit set <name> <value>` — Control accessories (on/off, 0-100)
      - `homekit scene [name]` — Activate scenes
      - `homekit scene create` — Create scenes from the command line
      - `homekit scene import/export` — Batch import and export scenes as JSON
      - `homekit automation list/run` — List and trigger automations
      - `homekit home list/switch` — Manage multiple Homes
      - `--json` flag for machine-readable output
      - `--verbose` flag for debugging

    - **homekit-mcp** — MCP server for AI agent integration
      - `homekit_list_accessories` tool
      - `homekit_get_accessory` tool
      - `homekit_set_accessory` tool
      - `homekit_activate_scene` tool
      - `homekit_list_scenes` tool
      - `homekit_create_scene` tool
      - `homekit_list_automations` tool
      - `homekit_run_automation` tool
      - Stdio transport (compatible with Claude Desktop, Cursor, Windsurf, and all MCP clients)

    - **@openclaw/homekit** — Plugin for the @openclaw agent framework
      - `list_accessories` tool
      - `control_accessory` tool
      - `activate_scene` tool
      - `create_scene` tool

    - **macOS App** — Native companion app published to the App Store
      - Visual scene builder and editor
      - Live accessory dashboard
      - CLI & MCP authorization manager
      - Scene import/export with drag-and-drop

    [Unreleased]: https://github.com/bolivestilo/Homekit/compare/v1.0.0...HEAD
    [1.0.0]: https://github.com/bolivestilo/Homekit/releases/tag/v1.0.0
    