# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- `homekit status` — single-command full Home summary
- Accessory aliases — `homekit alias lr "Living Room Lights"`
- Scheduled commands — `homekit schedule "08:00" scene "Good Morning"`
- HTTP MCP transport — alternative to stdio for remote setups
- Log/history — record every command and agent action

---

## [1.1.0] — 2025-07-08

### Added
- **`@homekit/core`** — new shared package with the HomeKit bridge, auth manager, and type definitions
  - `HomekitClient` — unified client used by both CLI and MCP server
  - `AccessoryType`, `AccessoryState`, `Scene`, `Automation` types
  - `HomekitConfig` — shared configuration layer
- Multi-Home support improvements — `homekit home list` now shows active home indicator
- `--json` output now includes `room`, `type`, and full `state` for every accessory
- `homekit scene create` is now interactive — prompts for accessory states
- Dependabot enabled for automated dependency updates
- CodeQL security scanning on every push to `main`
- `.editorconfig` for consistent formatting across editors

### Fixed
- Authentication token no longer expires on macOS Sonoma (14.4+)
- Scene export preserves accessory display order
- `--verbose` flag now prints IPC socket path for debugging

### Changed
- `@openclaw/homekit` updated to use `@homekit/core` client internally
- Minimum Node.js version raised from 16 to 18
- Repo topics updated with full keyword set

---

## [1.0.0] — 2025-05-19

### Added
- **`homekit-cli`** — full terminal interface for controlling Apple Home
  - `homekit auth` — authorize with Apple Home via macOS app
  - `homekit list [room]` — list all accessories with live state
  - `homekit get <name>` — get accessory state
  - `homekit set <name> <value>` — control accessories (on/off, 0–100)
  - `homekit scene [name]` — list or activate scenes
  - `homekit scene create` — create scenes from the command line
  - `homekit scene import/export` — batch import and export scenes as JSON
  - `homekit automation list/run` — list and trigger automations
  - `homekit home list/switch` — manage multiple Homes
  - `--json` flag for machine-readable output
  - `--verbose` flag for debugging

- **`homekit-mcp`** — MCP server for AI agent integration
  - `homekit_list_accessories` tool
  - `homekit_get_accessory` tool
  - `homekit_set_accessory` tool
  - `homekit_activate_scene` tool
  - `homekit_list_scenes` tool
  - `homekit_create_scene` tool
  - `homekit_list_automations` tool
  - `homekit_run_automation` tool
  - Stdio transport (Claude Desktop, Cursor, Windsurf, and all MCP clients)

- **`@openclaw/homekit`** — plugin for the @openclaw agent framework

- **macOS App** — native companion app on the App Store
  - Visual scene builder and editor
  - Live accessory dashboard
  - CLI & MCP authorization manager
  - Scene import/export with drag-and-drop

---

[Unreleased]: https://github.com/bolivestilo/Homekit/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/bolivestilo/Homekit/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/bolivestilo/Homekit/releases/tag/v1.0.0
