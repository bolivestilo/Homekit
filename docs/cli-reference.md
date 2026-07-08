# CLI Reference

Complete reference for `homekit-cli`.

## Installation

```bash
npm install -g homekit-cli
```

## Global flags

| Flag | Description |
|---|---|
| `--json` | Output as machine-readable JSON |
| `--verbose` | Enable verbose debug logging |
| `--version` | Print version and exit |
| `--help` | Show help |

---

## homekit auth

Authorize Homekit to access your Apple Home.

```bash
homekit auth
```

Opens the Homekit macOS App, which presents the system HomeKit authorization dialog. Takes ~10 seconds. Only required once — the token is stored in `~/.homekit/auth.json`.

---

## homekit list

List all accessories with their current state.

```bash
homekit list [room]
```

| Argument | Description |
|---|---|
| `room` | Optional. Filter to a specific room (case-insensitive) |

**Examples:**

```bash
homekit list
homekit list bedroom
homekit list "Living Room"
homekit list --json
```

---

## homekit get

Get the current state of a specific accessory.

```bash
homekit get <name>
```

**Examples:**

```bash
homekit get "Front Door"
homekit get "Living Room Lights" --json
```

---

## homekit set

Control an accessory.

```bash
homekit set <name> <value>
```

| Value | Description |
|---|---|
| `on` | Turn on |
| `off` | Turn off |
| `0`–`100` | Set brightness/level (for dimmable accessories) |
| `lock` | Lock (for smart locks) |
| `unlock` | Unlock (for smart locks) |
| `<temperature>` | Set thermostat target (e.g. `72`) |

**Examples:**

```bash
homekit set "Living Room Lights" on
homekit set "Floor Lamp" 40
homekit set "Front Door" lock
homekit set "Thermostat" 70
```

---

## homekit scene

List or activate scenes.

```bash
homekit scene [name]
```

Without a name, lists all scenes. With a name, activates that scene.

**Examples:**

```bash
homekit scene                    # List all scenes
homekit scene "Good Morning"     # Activate a scene
homekit scene --json             # List scenes as JSON
```

### homekit scene create

Interactively create a new scene.

```bash
homekit scene create [name] [--accessories <spec>...]
```

**Examples:**

```bash
homekit scene create
homekit scene create "Movie Night" \
  --accessories "TV Backlight:on" \
               "Main Lights:off" \
               "Lamp:20"
```

Accessory spec format: `"<name>:<value>"` or `"<name>:<on|off>:<brightness>"`

### homekit scene import

Import scenes from a JSON file.

```bash
homekit scene import <file>
```

**Example:**

```bash
homekit scene import my-scenes.json
```

### homekit scene export

Export all scenes as JSON.

```bash
homekit scene export [--output <file>]
```

**Examples:**

```bash
homekit scene export                          # stdout
homekit scene export --output my-scenes.json  # write to file
homekit scene export > backup.json            # redirect
```

---

## homekit automation

Manage automations.

### homekit automation list

```bash
homekit automation list
homekit automation list --json
```

### homekit automation run

Trigger an automation by name.

```bash
homekit automation run <name>
```

**Example:**

```bash
homekit automation run "Evening Routine"
```

---

## homekit home

Manage multiple Homes.

### homekit home list

```bash
homekit home list
homekit home list --json
```

### homekit home switch

Switch the active Home.

```bash
homekit home switch <name>
```

**Example:**

```bash
homekit home switch "Beach House"
```

---

## homekit status

Display a full live Home summary — all rooms, accessories, and active scenes.

```bash
homekit status
homekit status --json
```

---

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success |
| `1` | General error |
| `2` | Authentication required — run `homekit auth` |
| `3` | Accessory not found |
| `4` | macOS App not running or IPC error |
