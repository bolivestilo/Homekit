/**
 * @homekit/core — Type definitions for the Homekit ecosystem.
 * https://homekit.builders
 */

// ─── Accessory ───────────────────────────────────────────────────────────────

export type AccessoryType =
  | 'lightbulb'
  | 'switch'
  | 'outlet'
  | 'lock'
  | 'thermostat'
  | 'sensor'
  | 'camera'
  | 'fan'
  | 'garage'
  | 'window'
  | 'blind'
  | 'security'
  | 'unknown';

export interface LightbulbState {
  on: boolean;
  brightness?: number;  // 0–100
  hue?: number;         // 0–360
  saturation?: number;  // 0–100
  colorTemp?: number;   // 140–500 mireds
}

export interface LockState {
  locked: boolean;
  jammed?: boolean;
}

export interface ThermostatState {
  currentTemp: number;
  targetTemp: number;
  mode: 'off' | 'heat' | 'cool' | 'auto';
  units: 'C' | 'F';
}

export interface SwitchState {
  on: boolean;
}

export interface SensorState {
  value: number | boolean;
  unit?: string;
  type: 'temperature' | 'humidity' | 'motion' | 'contact' | 'co2' | 'light' | 'unknown';
}

export type AccessoryState =
  | LightbulbState
  | LockState
  | ThermostatState
  | SwitchState
  | SensorState
  | Record<string, unknown>;

export interface Accessory {
  id: string;
  name: string;
  room: string;
  home: string;
  type: AccessoryType;
  state: AccessoryState;
  reachable: boolean;
  firmware?: string;
  manufacturer?: string;
  model?: string;
}

// ─── Scene ───────────────────────────────────────────────────────────────────

export interface SceneAccessoryConfig {
  id: string;
  name: string;
  targetState: Partial<AccessoryState>;
}

export interface Scene {
  id: string;
  name: string;
  home: string;
  accessories: SceneAccessoryConfig[];
  lastActivated?: string;  // ISO 8601
}

// ─── Automation ──────────────────────────────────────────────────────────────

export type AutomationTriggerType =
  | 'time'
  | 'sunset'
  | 'sunrise'
  | 'accessory'
  | 'location'
  | 'manual';

export interface Automation {
  id: string;
  name: string;
  home: string;
  enabled: boolean;
  triggerType: AutomationTriggerType;
  lastRun?: string;  // ISO 8601
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  name: string;
  accessories: string[];  // accessory IDs
}

export interface Home {
  id: string;
  name: string;
  primary: boolean;
  rooms: Room[];
}

// ─── Config ──────────────────────────────────────────────────────────────────

export interface HomekitConfig {
  socketPath: string;
  authPath: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  timeout: number;  // ms
}

export const DEFAULT_CONFIG: HomekitConfig = {
  socketPath: `${process.env.HOME}/.homekit/homekit.sock`,
  authPath: `${process.env.HOME}/.homekit/auth.json`,
  logLevel: 'info',
  timeout: 10_000,
};

// ─── IPC Protocol ────────────────────────────────────────────────────────────

export interface IPCRequest {
  id: string;
  method: string;
  params?: Record<string, unknown>;
  token: string;
}

export interface IPCResponse<T = unknown> {
  id: string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}
