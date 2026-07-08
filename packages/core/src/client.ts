/**
 * @homekit/core — HomekitClient: unified IPC client for all Homekit packages.
 * https://homekit.builders
 */

import net from 'net';
import { randomUUID } from 'crypto';
import type {
  Accessory,
  Scene,
  Automation,
  Home,
  HomekitConfig,
  IPCRequest,
  IPCResponse,
} from './types.js';
import { DEFAULT_CONFIG } from './types.js';
import { requireAuth } from './auth.js';

export class HomekitClient {
  private config: HomekitConfig;

  constructor(config: Partial<HomekitConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ─── Internal IPC ──────────────────────────────────────────────────────────

  private async call<T>(method: string, params?: Record<string, unknown>): Promise<T> {
    const auth = requireAuth();
    const request: IPCRequest = {
      id: randomUUID(),
      method,
      params,
      token: auth.token,
    };

    return new Promise((resolve, reject) => {
      const socket = net.createConnection(this.config.socketPath);
      let buffer = '';

      const timer = setTimeout(() => {
        socket.destroy();
        reject(new Error(`Homekit IPC timeout after ${this.config.timeout}ms. Is the Homekit macOS App running?`));
      }, this.config.timeout);

      socket.on('connect', () => {
        socket.write(JSON.stringify(request) + '\n');
      });

      socket.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const response: IPCResponse<T> = JSON.parse(line);
            clearTimeout(timer);
            socket.destroy();

            if (response.error) {
              reject(new Error(`[${response.error.code}] ${response.error.message}`));
            } else {
              resolve(response.result as T);
            }
          } catch {
            clearTimeout(timer);
            socket.destroy();
            reject(new Error('Invalid response from Homekit macOS App'));
          }
        }
      });

      socket.on('error', (err) => {
        clearTimeout(timer);
        reject(
          err.message.includes('ENOENT') || err.message.includes('ECONNREFUSED')
            ? new Error('Cannot connect to Homekit macOS App. Make sure it is running.')
            : err
        );
      });
    });
  }

  // ─── Accessories ───────────────────────────────────────────────────────────

  async listAccessories(room?: string): Promise<Accessory[]> {
    const accessories = await this.call<Accessory[]>('accessories.list');
    if (room) {
      const normalized = room.toLowerCase();
      return accessories.filter((a) => a.room.toLowerCase() === normalized);
    }
    return accessories;
  }

  async getAccessory(name: string): Promise<Accessory> {
    const accessories = await this.listAccessories();
    const match = accessories.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    if (!match) {
      throw new Error(
        `Accessory "${name}" not found. Run \`homekit list\` to see all accessories.`
      );
    }
    return match;
  }

  async setAccessory(name: string, value: string | number): Promise<void> {
    const accessory = await this.getAccessory(name);
    await this.call('accessories.set', { id: accessory.id, value });
  }

  // ─── Scenes ────────────────────────────────────────────────────────────────

  async listScenes(): Promise<Scene[]> {
    return this.call<Scene[]>('scenes.list');
  }

  async activateScene(name: string): Promise<void> {
    const scenes = await this.listScenes();
    const scene = scenes.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    if (!scene) {
      throw new Error(`Scene "${name}" not found.`);
    }
    await this.call('scenes.activate', { id: scene.id });
  }

  async createScene(
    name: string,
    accessories: Array<{ name: string; value: string | number }>
  ): Promise<Scene> {
    return this.call<Scene>('scenes.create', { name, accessories });
  }

  // ─── Automations ───────────────────────────────────────────────────────────

  async listAutomations(): Promise<Automation[]> {
    return this.call<Automation[]>('automations.list');
  }

  async runAutomation(name: string): Promise<void> {
    const automations = await this.listAutomations();
    const automation = automations.find(
      (a) => a.name.toLowerCase() === name.toLowerCase()
    );
    if (!automation) {
      throw new Error(`Automation "${name}" not found.`);
    }
    await this.call('automations.run', { id: automation.id });
  }

  // ─── Homes ─────────────────────────────────────────────────────────────────

  async listHomes(): Promise<Home[]> {
    return this.call<Home[]>('homes.list');
  }

  async switchHome(name: string): Promise<void> {
    const homes = await this.listHomes();
    const home = homes.find(
      (h) => h.name.toLowerCase() === name.toLowerCase()
    );
    if (!home) {
      throw new Error(`Home "${name}" not found.`);
    }
    await this.call('homes.switch', { id: home.id });
  }
}
