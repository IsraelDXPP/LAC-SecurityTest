import { resolver } from "../il2cpp/resolver";
import { HookManager } from "../il2cpp/hooks";
import { log } from "../utils/logger";

export interface VehicleHacksConfig {
  godMode: boolean;
  unlimitedFuel: boolean;
  superSpeed: boolean;
  speedMultiplier: number;
  noClip: boolean;
  noClipHeight: number;
  esp: boolean;
  espDistance: number;
  forceEntry: boolean;
  noFallDamage: boolean;
  noTraffic: boolean;
  alwaysDrift: boolean;
  rainbowCar: boolean;
}

const defaultConfig: VehicleHacksConfig = {
  godMode: false,
  unlimitedFuel: false,
  superSpeed: false,
  speedMultiplier: 3.0,
  noClip: false,
  noClipHeight: 10.0,
  esp: false,
  espDistance: 500,
  forceEntry: false,
  noFallDamage: false,
  noTraffic: false,
  alwaysDrift: false,
  rainbowCar: false,
};

export class VehicleHacks {
  private hooks: HookManager;
  private config: VehicleHacksConfig;

  constructor(hooks: HookManager) {
    this.hooks = hooks;
    this.config = { ...defaultConfig };
  }

  init(): void {
    this.registerHooks();
    log.info("Vehicle hacks module initialized");
  }

  private registerHooks(): void {
    // VULN-C02: Vehicle God Mode - block damage application
    this.hooks.register({
      className: "VehicleDamage",
      methodName: "RpcDamagePoint",
      replace: (args, instance) => {
        if (this.config.godMode) {
          log.hook("vehicle", "Vehicle God Mode", "ON");
          return undefined;
        }
        return instance.method("RpcDamagePoint").invoke(...args);
      },
    });

    this.hooks.register({
      className: "VehicleDamage",
      methodName: "RpcDetachBodyPart",
      replace: (args, instance) => {
        if (this.config.godMode) {
          return undefined;
        }
        return instance.method("RpcDetachBodyPart").invoke(...args);
      },
    });

    // VULN-C03: Unlimited Fuel
    this.hooks.register({
      className: "VehicleControl",
      methodName: "FixedUpdate",
      onEnter: (instance) => {
        if (this.config.unlimitedFuel) {
          try {
            instance.field("Fuel").value = Il2Cpp.float(100);
          } catch { }
        }
      },
    });

    // VULN-H08: Vehicle Speed Hack
    this.hooks.register({
      className: "VehicleControl",
      methodName: "FixedUpdate",
      onEnter: (instance) => {
        if (this.config.superSpeed) {
          try {
            const motor = instance.field("motorTorque");
            if (motor) {
              motor.value = Il2Cpp.float(this.config.speedMultiplier * 1500);
            }
          } catch { }
        }
      },
    });

    // VULN-H05: Force Enter Vehicle
    this.hooks.register({
      className: "PlayerDriveVehicle",
      methodName: "CmdForceEnterVehicle",
      replace: (args, instance) => {
        if (this.config.forceEntry) {
          log.hook("vehicle", "Force Enter Vehicle", "ON");
          return instance.method("CmdForceEnterVehicle").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-M09: Vehicle No Fall Damage
    this.hooks.register({
      className: "VehicleDamage",
      methodName: "CmdHitPlayer",
      replace: (args, instance) => {
        if (this.config.noFallDamage) {
          const impactVelocity = args[0];
          if (impactVelocity && typeof impactVelocity === "number" && impactVelocity > 20) {
            log.hook("vehicle", "No Fall Damage", "ON");
            args[0] = Il2Cpp.float(0);
          }
        }
        return instance.method("CmdHitPlayer").invoke(...args);
      },
    });

    // VULN-H09: No Traffic
    this.hooks.register({
      className: "VehicleControl",
      methodName: "Start",
      onEnter: (instance) => {
        if (this.config.noTraffic) {
          try {
            const npc = instance.field("hasNPC");
            if (npc) {
              npc.value = Il2Cpp.bool(false);
              log.hook("vehicle", "No Traffic", "ON");
            }
          } catch { }
        }
      },
    });

    // VULN-H10: Always Drift
    this.hooks.register({
      className: "VehicleControl",
      methodName: "Start",
      onEnter: (instance) => {
        if (this.config.alwaysDrift) {
          try {
            instance.field("AlwaysDrift").value = Il2Cpp.bool(true);
            instance.field("ArcadeDriving").value = Il2Cpp.bool(true);
            log.hook("vehicle", "Always Drift", "ON");
          } catch { }
        }
      },
    });

    // VULN-H11: Vehicle ESP
    this.hooks.register({
      className: "VehicleControl",
      methodName: "Update",
      onEnter: (instance) => {
        if (this.config.esp) {
          try {
            const distance = this.getDistanceToPlayer(instance);
            if (distance < this.config.espDistance) {
              this.drawVehicleESP(instance, distance);
            }
          } catch { }
        }
      },
    });

    // VULN-L01: Rainbow Car
    this.hooks.register({
      className: "VehicleControl",
      methodName: "Update",
      onEnter: (instance) => {
        if (this.config.rainbowCar) {
          try {
            const time = (Date.now() / 1000) % 6;
            const r = Math.abs(Math.sin(time * 0.5));
            const g = Math.abs(Math.sin(time * 0.5 + 2));
            const b = Math.abs(Math.sin(time * 0.5 + 4));
            const color = new Il2Cpp_UnityEngine.Color(r, g, b, 1.0);
            const renderer = instance.GetComponent(63);
            if (renderer) {
              renderer.material.color = color;
            }
          } catch { }
        }
      },
    });

    // VULN-M08: Vehicle Horn Spam
    this.hooks.register({
      className: "VehicleControl",
      methodName: "Update",
      onEnter: (instance) => {
        if (this.config.superSpeed) {
          try {
            instance.field("Horn").value = Il2Cpp.bool(true);
          } catch { }
        }
      },
    });
  }

  private getDistanceToPlayer(vehicleInstance: any): number {
    try {
      const localPlayer = resolver.findLocalPlayer();
      if (!localPlayer) return Infinity;

      const playerPos = localPlayer.transform.position;
      const vehiclePos = vehicleInstance.transform.position;

      const dx = playerPos.x - vehiclePos.x;
      const dy = playerPos.y - vehiclePos.y;
      const dz = playerPos.z - vehiclePos.z;

      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    } catch {
      return Infinity;
    }
  }

  private drawVehicleESP(_vehicleInstance: any, _distance: number): void {
    // ESP drawing will be implemented with Unity's GL drawing
  }

  getConfig(): VehicleHacksConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<VehicleHacksConfig>): void {
    Object.assign(this.config, updates);
    log.info("Vehicle hacks config updated", updates);
  }
}
