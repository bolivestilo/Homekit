#!/usr/bin/env node
    /**
     * homekit-cli — Control your Apple Home from the command line.
     * https://homekit.builders
     */

    const [, , command, ...args] = process.argv;

    if (!command || command === '--help' || command === '-h') {
      printHelp();
      process.exit(0);
    }

    if (command === '--version' || command === '-v') {
      console.log('homekit-cli v1.0.0');
      process.exit(0);
    }

    function printHelp() {
      console.log(`
    homekit v1.0.0 — https://homekit.builders

    Usage: homekit <command> [options]

    Commands:
      auth                      Authorize with Apple Home via macOS app
      list                      List all accessories with live state
      get <name>                Get the state of an accessory
      set <name> <value>        Control an accessory (on/off, 0-100)
      scene [name]              List or activate a scene
      scene create              Create a new scene
      scene import <file>       Import scenes from a JSON file
      scene export              Export all scenes as JSON
      automation list           List all automations
      automation run <name>     Trigger an automation
      home list                 List all Homes
      home switch <name>        Switch active Home

    Flags:
      --json        Output as machine-readable JSON
      --verbose     Enable verbose debug logging
      --version     Print version
      --help        Show this help

    Examples:
      homekit list
      homekit set "Living Room Lights" on
      homekit set "Dimmer" 40
      homekit scene "Good Morning"
      homekit automation run "Evening Routine"

    Documentation: https://homekit.builders/docs
    `);
    }
    