# Roadmap

    > **Legend:** ✅ Done · 🚧 In progress · 🗓 Planned · 💭 Exploring

    ---

    ## v1.0 — Foundation ✅

    _Released July 2025_

    - ✅ `homekit-cli` — full terminal interface for Apple Home
    - ✅ `homekit-mcp` — MCP server (stdio transport) for Claude Desktop, Cursor, Windsurf
    - ✅ `@openclaw/homekit` — @openclaw plugin
    - ✅ macOS companion app on the App Store
    - ✅ Scene create, import, and export as JSON
    - ✅ Automation list and trigger
    - ✅ Multi-Home support (`homekit home switch`)

    ---

    ## v1.1 — Developer Experience 🗓

    _Target: Q3 2025_

    - 🗓 **Accessory aliases** — `homekit alias lr "Living Room Lights"`
    - 🗓 **Scheduled commands** — `homekit schedule "08:00" scene "Good Morning"`
    - 🗓 **Scene diff** — `homekit scene diff a.json b.json`
    - 🗓 **Accessory groups** — `homekit set @lights off`
    - 🗓 **HTTP MCP transport** — Alternative to stdio for remote agent setups
    - 🗓 **`homekit status`** — Single-command Home summary
    - 🗓 **Log/history** — Record every command and agent action with timestamps

    ---

    ## v2.0 — Platform Expansion 💭

    _Target: 2026_

    - 💭 **Shortcuts integration** — Trigger Homekit from Apple Shortcuts
    - 💭 **Menu bar app** — Quick-access Home control
    - 💭 **Multi-agent support** — Multiple simultaneous MCP connections
    - 💭 **REST API mode** — `homekit serve`
    - 💭 **Plugin SDK** — Third-party tool and command extensions
    - 💭 **Web dashboard** — Browser-based UI for teams and power users

    ---

    ## Community Requests 💭

    | Request | Issue |
    |---------|-------|
    | Support for Matter accessories | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
    | Windows / Linux CLI | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
    | VS Code extension | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
    | Claude.ai web integration | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
    | Home energy monitoring | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |

    [Open a feature request →](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml)
    