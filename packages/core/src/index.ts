/**
 * @homekit/core
 * Shared HomeKit bridge, types, and auth manager for the Homekit ecosystem.
 *
 * https://homekit.builders
 * https://github.com/bolivestilo/Homekit
 */

export { HomekitClient } from './client.js';
export { readAuth, writeAuth, clearAuth, requireAuth } from './auth.js';
export type { AuthData } from './auth.js';
export type {
  AccessoryType,
  AccessoryState,
  LightbulbState,
  LockState,
  ThermostatState,
  SwitchState,
  SensorState,
  Accessory,
  SceneAccessoryConfig,
  Scene,
  AutomationTriggerType,
  Automation,
  Room,
  Home,
  HomekitConfig,
  IPCRequest,
  IPCResponse,
} from './types.js';
export { DEFAULT_CONFIG } from './types.js';
