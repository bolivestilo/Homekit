# Roadmap

> **Legend:** ✅ Shipped · 🚧 In progress · 🗓 Planned · 💭 Exploring

Priorities shift based on community feedback — vote with 👍 on issues to influence what ships next.

---

## v1.0 — Foundation ✅

*Shipped May 2025*

- ✅ `homekit-cli` — full terminal interface for Apple Home
- ✅ `homekit-mcp` — MCP server (stdio) for Claude Desktop, Cursor, Windsurf
- ✅ `@openclaw/homekit` — @openclaw plugin
- ✅ macOS App on the App Store
- ✅ Scene create, import, export as JSON
- ✅ Automation list and trigger
- ✅ Multi-Home support

---

## v1.1 — Shared Core ✅

*Shipped July 2025*

- ✅ `@homekit/core` — shared client, types, and auth manager
- ✅ Improved JSON output with full accessory metadata
- ✅ CodeQL and Dependabot enabled
- ✅ Interactive `homekit scene create`

---

## v1.2 — Power User CLI 🗓

*Target: Q3 2025*

- 🗓 **`homekit status`** — single-command full Home summary
- 🗓 **Accessory aliases** — `homekit alias lr "Living Room Lights"`
- 🗓 **Scheduled commands** — `homekit schedule "08:00" scene "Good Morning"`
- 🗓 **Scene diff** — `homekit scene diff a.json b.json`
- 🗓 **Accessory groups** — `homekit set @lights off`
- 🗓 **Log/history** — timestamped record of every command and agent action

---

## v1.3 — MCP Expansion 🗓

*Target: Q4 2025*

- 🗓 **HTTP MCP transport** — alternative to stdio for remote agent setups
- 🗓 **`homekit_get_sensor`** — read temperature, humidity, motion, contact sensors
- 🗓 **`homekit_list_rooms`** — room-aware accessory grouping
- 🗓 **Camera snapshots** — `homekit_get_camera_snapshot` (image output)
- 🗓 **Streaming state** — push accessory changes to agents via SSE

---

## v2.0 — Platform 💭

*Target: 2026*

- 💭 **Menu bar app** — quick-access Home control
- 💭 **Multi-agent support** — multiple simultaneous MCP connections
- 💭 **REST API mode** — `homekit serve`
- 💭 **Plugin SDK** — third-party tools and commands
- 💭 **Web dashboard** — browser-based UI for teams and power users
- 💭 **Shortcuts integration** — trigger Homekit from Apple Shortcuts
- 💭 **iOS companion** — iPhone control via Homekit agent

---

## Community requests

*Vote with 👍 on the linked issues*

| Request | Link |
|---|---|
| Matter accessory support | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
| Windows / Linux CLI | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
| VS Code extension | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
| Home energy monitoring | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
| Claude.ai web integration | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |
| OpenAI plugin | [Vote](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) |

[Open a feature request →](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml)

---

## Priority model

1. **Security and stability** — crashes and data loss always first
2. **Community votes** — 👍 on issues are a strong signal
3. **Contributor PRs** — items with an open PR move faster
4. **Strategic fit** — features that deepen the CLI ↔ MCP ↔ App platform story

Follow the repo (**Watch → Custom → Releases**) to get notified.
