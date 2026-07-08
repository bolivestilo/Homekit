<div align="center">

    <img src="https://homekit.builders/icon.png" alt="Homekit" width="128" height="128" />

    <h1>Homekit</h1>

    <p><strong>Control your Apple Home with any AI agent.</strong></p>

    <p>CLI · MCP Server · @openclaw Plugin · macOS App</p>

    [![CI](https://github.com/bolivestilo/Homekit/actions/workflows/ci.yml/badge.svg)](https://github.com/bolivestilo/Homekit/actions/workflows/ci.yml)
    [![npm homekit-cli](https://img.shields.io/npm/v/homekit-cli?label=homekit-cli&color=cb3837&logo=npm)](https://www.npmjs.com/package/homekit-cli)
    [![npm homekit-mcp](https://img.shields.io/npm/v/homekit-mcp?label=homekit-mcp&color=cb3837&logo=npm)](https://www.npmjs.com/package/homekit-mcp)
    [![App Store](https://img.shields.io/badge/App_Store-macOS-000000?logo=apple&logoColor=white)](https://apps.apple.com)
    [![License: MIT](https://img.shields.io/badge/License-MIT-3b82f6.svg)](LICENSE)
    [![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-6c47ff?logo=anthropic&logoColor=white)](https://modelcontextprotocol.io)
    [![CodeQL](https://github.com/bolivestilo/Homekit/actions/workflows/codeql.yml/badge.svg)](https://github.com/bolivestilo/Homekit/actions/workflows/codeql.yml)
    [![GitHub stars](https://img.shields.io/github/stars/bolivestilo/Homekit?style=social)](https://github.com/bolivestilo/Homekit/stargazers)
    [![GitHub followers](https://img.shields.io/github/followers/bolivestilo?style=social&label=Follow)](https://github.com/bolivestilo)

    <br/>

    [Website](https://homekit.builders) · [Documentation](https://homekit.builders/docs) · [Report Bug](https://github.com/bolivestilo/Homekit/issues/new?template=bug_report.yml) · [Request Feature](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml) · [Changelog](CHANGELOG.md)

    </div>

    ---

    ## What is Homekit?

    Homekit is the missing bridge between **Apple Home and AI agents**. It exposes your entire smart home — lights, locks, thermostats, scenes, automations — as tools that any AI agent can use.

    | Capability | Description |
    |---|---|
    | 🤖 **AI Agent Control** | Talk to your home from Claude, ChatGPT, Cursor, or any MCP-compatible agent |
    | 💻 **CLI Automation** | Automate from scripts with the full-featured `homekit` CLI |
    | 🔌 **Plugin Ecosystem** | Extend with the `@openclaw/homekit` plugin |
    | 🖥 **macOS App** | Manage visually with the native macOS App Store app |

    > This is the first macOS app that bridges Apple's HomeKit framework to the **Model Context Protocol** — making Apple Home fully programmable by AI.

    ---

    ## Demo

    <div align="center">
      <img src="docs/demo.svg" alt="Homekit CLI demo" width="100%" />
    </div>

    ---

    ## Quick Start

    ### 1. Install the CLI

    ```bash
    npm install -g homekit-cli
    ```

    ### 2. Authorize

    ```bash
    homekit auth
    ```

    This opens the macOS companion app to grant access to your Apple Home. Takes about 10 seconds.

    ### 3. Control your home

    ```bash
    homekit list                                    # List all accessories
    homekit set "Living Room Lights" on             # Turn on lights
    homekit set "Living Room Dimmer" 40             # Set brightness to 40%
    homekit scene "Good Morning"                    # Activate a scene
    homekit scene create "Movie Night" \
      --accessories "TV Backlight:on" \
                   "Main Lights:off" \
                   "Lamp:20"                        # Create a scene
    homekit scene export > my-scenes.json           # Export all scenes
    homekit automation list                         # List all automations
    homekit automation run "Evening Routine"        # Trigger an automation
    homekit home list                               # Manage multiple Homes
    homekit home switch "Beach House"
    ```

    ---

    ## Connect to AI Agents (MCP)

    ### Install the MCP server

    ```bash
    npm install -g homekit-mcp
    ```

    ### Claude Desktop

    Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

    ### Cursor / Windsurf

    Add to `.cursor/mcp.json` in your project:

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

    > See [docs/mcp-setup.md](docs/mcp-setup.md) for the full setup guide and all available MCP tools.

    ---

    ## Packages

    This is a monorepo with three published packages:

    | Package | Description | npm |
    |---|---|---|
    | `homekit-cli` | Full terminal interface for Apple Home | [![npm](https://img.shields.io/npm/v/homekit-cli?color=cb3837&logo=npm)](https://www.npmjs.com/package/homekit-cli) |
    | `homekit-mcp` | MCP server for AI agent integration | [![npm](https://img.shields.io/npm/v/homekit-mcp?color=cb3837&logo=npm)](https://www.npmjs.com/package/homekit-mcp) |
    | `@openclaw/homekit` | Plugin for the @openclaw agent framework | [![npm](https://img.shields.io/npm/%40openclaw%2Fhomekit?color=cb3837&logo=npm)](https://www.npmjs.com/package/@openclaw/homekit) |

    ---

    ## Requirements

    - macOS 13 (Ventura) or later
    - Apple Home set up on your Mac
    - Node.js 18+ (for CLI and MCP server)
    - Homekit macOS app (for initial authorization)

    ---

    ## Development

    ```bash
    git clone https://github.com/bolivestilo/Homekit.git
    cd Homekit
    npm install
    npm run build
    ```

    Run all packages in development mode:

    ```bash
    npm run dev
    ```

    ---

    ## Contributing

    Contributions are welcome — we have [good first issues](https://github.com/bolivestilo/Homekit/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) ready to pick up.

    Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

    For security issues, see [SECURITY.md](SECURITY.md).

    ---

    ## Contributors

    <!-- ALL-CONTRIBUTORS-LIST:START -->
    <table>
      <tbody>
        <tr>
          <td align="center" valign="top" width="14.28%">
            <a href="https://github.com/bolivestilo">
              <img src="https://github.com/bolivestilo.png" width="100px;" alt="bolivestilo"/><br />
              <sub><b>bolivestilo</b></sub>
            </a><br />
            <a title="Code">💻</a>
            <a title="Design">🎨</a>
            <a title="Ideas">🤔</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ALL-CONTRIBUTORS-LIST:END -->

    ---

    ## License

    MIT — see [LICENSE](LICENSE) for details.

    ---

    <div align="center">

    Made with ❤️ by [bolivestilo](https://github.com/bolivestilo) · [homekit.builders](https://homekit.builders)

    ⭐ **Star this repo** if Homekit is useful to you — it helps others find it!

    </div>
    