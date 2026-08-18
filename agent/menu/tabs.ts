import { Overlay } from "./overlay";
import { log } from "../utils/logger";

export interface TabConfig {
  name: string;
  icon: string;
  widgets: WidgetConfig[];
}

export interface WidgetConfig {
  type: "toggle" | "slider" | "button" | "label";
  label: string;
  min?: number;
  max?: number;
  defaultValue?: any;
  callback?: (value: any) => void;
}

export class TabManager {
  private overlay: Overlay;
  private tabs: Map<string, TabConfig> = new Map();

  constructor(overlay: Overlay) {
    this.overlay = overlay;
    this.setupDefaultTabs();
  }

  private setupDefaultTabs(): void {
    this.tabs.set("player", {
      name: "Player",
      icon: "P",
      widgets: [
        { type: "toggle", label: "God Mode" },
        { type: "toggle", label: "Infinite Health" },
        { type: "toggle", label: "Unlimited Ammo" },
        { type: "toggle", label: "No Recoil" },
        { type: "toggle", label: "One Hit Kill" },
        { type: "slider", label: "Speed Multiplier", min: 1, max: 10, defaultValue: 2 },
        { type: "slider", label: "Jump Multiplier", min: 1, max: 10, defaultValue: 2 },
        { type: "toggle", label: "Super Jump" },
        { type: "toggle", label: "Infinite Jump" },
        { type: "toggle", label: "Fly Mode" },
      ],
    });

    this.tabs.set("vehicle", {
      name: "Vehicle",
      icon: "V",
      widgets: [
        { type: "toggle", label: "Vehicle God Mode" },
        { type: "toggle", label: "Unlimited Fuel" },
        { type: "toggle", label: "Super Speed" },
        { type: "slider", label: "Speed Multiplier", min: 1, max: 10, defaultValue: 3 },
        { type: "toggle", label: "Always Drift" },
        { type: "toggle", label: "Rainbow Car" },
        { type: "toggle", label: "No Traffic" },
        { type: "toggle", label: "No Fall Damage" },
        { type: "toggle", label: "Vehicle ESP" },
      ],
    });

    this.tabs.set("network", {
      name: "Network",
      icon: "N",
      widgets: [
        { type: "toggle", label: "View All Players" },
        { type: "toggle", label: "View All Vehicles" },
        { type: "toggle", label: "See All Chat" },
        { type: "toggle", label: "Force Unlock" },
        { type: "toggle", label: "Join Any Vehicle" },
        { type: "toggle", label: "Voice Chat All" },
        { type: "toggle", label: "Packet Intercept" },
        { type: "toggle", label: "Network Graph" },
        { type: "toggle", label: "Sync Spawner" },
      ],
    });

    this.tabs.set("editor", {
      name: "Editor",
      icon: "E",
      widgets: [
        { type: "toggle", label: "Invincible" },
        { type: "toggle", label: "Editor Mode" },
        { type: "toggle", label: "Toggle AI" },
        { type: "toggle", label: "Spawn Props" },
        { type: "toggle", label: "Time Control" },
        { type: "slider", label: "Custom Time", min: 0, max: 24, defaultValue: 12 },
        { type: "toggle", label: "Spawn Bots" },
        { type: "button", label: "Save Exploit" },
        { type: "button", label: "Load Exploit" },
      ],
    });

    this.tabs.set("game", {
      name: "Game",
      icon: "G",
      widgets: [
        { type: "toggle", label: "Infinite Coin" },
        { type: "toggle", label: "Infinite Dice" },
        { type: "toggle", label: "Kill All Zombies" },
        { type: "toggle", label: "Spawn Zombies" },
        { type: "slider", label: "Zombie Count", min: 1, max: 100, defaultValue: 20 },
        { type: "toggle", label: "Start Round" },
        { type: "toggle", label: "Stop Round" },
        { type: "toggle", label: "Override Role" },
        { type: "toggle", label: "Auto Collect" },
        { type: "toggle", label: "Time Sync" },
      ],
    });
  }

  getTabConfig(tabName: string): TabConfig | undefined {
    return this.tabs.get(tabName.toLowerCase());
  }

  getAllTabs(): TabConfig[] {
    return Array.from(this.tabs.values());
  }

  switchToTab(tabName: string): void {
    const config = this.tabs.get(tabName.toLowerCase());
    if (config) {
      this.overlay.switchTab(config.name);
      log.info(`Switched to tab: ${config.name}`);
    }
  }
}
