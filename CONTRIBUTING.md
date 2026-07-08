# Contributing to Homekit

Thank you for taking the time to contribute. This guide covers everything you need to know.

---

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Getting started](#getting-started)
- [Development setup](#development-setup)
- [Project structure](#project-structure)
- [Commit style](#commit-style)
- [Pull request process](#pull-request-process)
- [Issue reporting](#issue-reporting)

---

## Code of conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

---

## Getting started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/<you>/Homekit.git`
3. **Create a branch**: `git checkout -b feat/your-feature`
4. **Make your changes** and add tests
5. **Push** and open a pull request

Not sure where to start? Look for [good first issues](https://github.com/bolivestilo/Homekit/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

---

## Development setup

**Prerequisites:** Node.js 18+, macOS 13+ (for integration testing with Apple Home)

```bash
# Clone and install
git clone https://github.com/bolivestilo/Homekit.git
cd Homekit
npm install

# Build all packages
npm run build

# Run tests
npm test

# Watch mode (all packages)
npm run dev
```

**Per-package:**

```bash
cd packages/cli
npm run dev       # TypeScript watch
npm run build     # Compile to dist/
npm test          # Run tests

# Run CLI from source
node packages/cli/dist/index.js list
```

---

## Project structure

```
Homekit/
├── packages/
│   ├── cli/           homekit-cli — terminal interface
│   ├── mcp/           homekit-mcp — MCP server for AI agents
│   ├── core/          @homekit/core — shared bridge + types
│   └── openclaw/      @openclaw/homekit — @openclaw plugin
├── docs/              documentation
├── .github/           GitHub workflows, templates
├── CHANGELOG.md       version history
├── CONTRIBUTING.md    this file
├── ROADMAP.md         planned features
└── SECURITY.md        vulnerability reporting
```

---

## Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>
```

| Type | When |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | No fix or feature |
| `test` | Tests |
| `chore` | Build, deps, tooling |
| `perf` | Performance |

**Scopes:** `cli`, `mcp`, `core`, `openclaw`, `docs`, `ci`

**Examples:**
```
feat(cli): add homekit status command
fix(mcp): resolve scene export encoding on macOS Sonoma
docs: update MCP setup guide for Windsurf
chore(deps): bump typescript to 5.5
```

---

## Pull request process

1. Update `CHANGELOG.md` — add your change under `[Unreleased]`
2. Update docs if you changed behavior
3. Ensure `npm test` passes
4. Ensure `npm run typecheck` passes
5. Fill out the PR template
6. Request a review from a maintainer

PR title must follow Conventional Commit format.

---

## Issue reporting

- **Bugs** → [bug report template](https://github.com/bolivestilo/Homekit/issues/new?template=bug_report.yml)
- **Features** → [feature request template](https://github.com/bolivestilo/Homekit/issues/new?template=feature_request.yml)
- **Security** → see [SECURITY.md](SECURITY.md) — do **not** use public issues

---

Questions? Open a [discussion](https://github.com/bolivestilo/Homekit/discussions) or file an issue.
