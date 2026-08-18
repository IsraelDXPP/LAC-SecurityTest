import { resolver } from "../il2cpp/resolver";
import { HookManager } from "../il2cpp/hooks";
import { log } from "../utils/logger";
import { validator } from "../utils/validation";

export interface PlayerHacksConfig {
  godMode: boolean;
  infiniteHealth: boolean;
  unlimitedAmmo: boolean;
  noClip: boolean;
  speedHack: boolean;
  speedMultiplier: number;
  jumpMultiplier: number;
  superJump: boolean;
  infiniteJump: boolean;
  flyMode: boolean;
  autoAim: boolean;
  noRecoil: boolean;
  oneHitKill: boolean;
  freezePlayers: boolean;
  invisibility: boolean;
}

const defaultConfig: PlayerHacksConfig = {
  godMode: false,
  infiniteHealth: false,
  unlimitedAmmo: false,
  noClip: false,
  speedHack: false,
  speedMultiplier: 2.0,
  jumpMultiplier: 2.0,
  superJump: false,
  infiniteJump: false,
  flyMode: false,
  autoAim: false,
  noRecoil: false,
  oneHitKill: false,
  freezePlayers: false,
  invisibility: false,
};

export class PlayerHacks {
  private hooks: HookManager;
  private config: PlayerHacksConfig;
  private localPlayer: any = null;

  constructor(hooks: HookManager) {
    this.hooks = hooks;
    this.config = { ...defaultConfig };
  }

  init(): void {
    this.registerHooks();
    log.info("Player hacks module initialized");
  }

  private registerHooks(): void {
    // VULN-C02 / VULN-C01: God Mode + Infinite Health
    this.hooks.register({
      className: "PlayerHealth",
      methodName: "CmdUpdateHealth",
      onEnter: (args) => {
        if (this.config.godMode || this.config.infiniteHealth) {
          args[0] = Il2Cpp.int(99999);
          log.hook("player", "God Mode / Infinite Health", "ON");
        }
      },
    });

    // VULN-C01: Auto-heal on damage received
    this.hooks.register({
      className: "PlayerHealth",
      methodName: "RpcTakeDamage",
      onEnter: () => {
        if (this.config.godMode) {
          this.healToFull();
        }
      },
    });

    // VULN-H01: Unlimited Ammo
    this.hooks.register({
      className: "PlayerWeapon",
      methodName: "PistolShoot",
      replace: (args, instance) => {
        if (this.config.unlimitedAmmo) {
          log.hook("player", "Unlimited Ammo (Pistol)", "ON");
          instance.field("ammo").value = Il2Cpp.array(Il2Cpp.int, [999, 999, 999, 999, 999, 999]);
          return undefined;
        }
        return instance.method("PistolShoot").invoke(...args);
      },
    });

    this.hooks.register({
      className: "PlayerWeapon",
      methodName: "RifleShoot",
      replace: (args, instance) => {
        if (this.config.unlimitedAmmo) {
          log.hook("player", "Unlimited Ammo (Rifle)", "ON");
          instance.field("ammo").value = Il2Cpp.array(Il2Cpp.int, [999, 999, 999, 999, 999, 999]);
          return undefined;
        }
        return instance.method("RifleShoot").invoke(...args);
      },
    });

    this.hooks.register({
      className: "PlayerWeapon",
      methodName: "SniperShoot",
      replace: (args, instance) => {
        if (this.config.unlimitedAmmo) {
          log.hook("player", "Unlimited Ammo (Sniper)", "ON");
          instance.field("ammo").value = Il2Cpp.array(Il2Cpp.int, [999, 999, 999, 999, 999, 999]);
          return undefined;
        }
        return instance.method("SniperShoot").invoke(...args);
      },
    });

    this.hooks.register({
      className: "PlayerWeapon",
      methodName: "ShotgunShoot",
      replace: (args, instance) => {
        if (this.config.unlimitedAmmo) {
          log.hook("player", "Unlimited Ammo (Shotgun)", "ON");
          instance.field("ammo").value = Il2Cpp.array(Il2Cpp.int, [999, 999, 999, 999, 999, 999]);
          return undefined;
        }
        return instance.method("ShotgunShoot").invoke(...args);
      },
    });

    // VULN-H02: Speed Hack
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdRun",
      onEnter: (args) => {
        if (this.config.speedHack) {
          args[0] = Il2Cpp.float(this.config.speedMultiplier);
          log.hook("player", "Speed Hack", "ON");
        }
      },
    });

    // VULN-M04: Super Jump
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdJump",
      onEnter: (args) => {
        if (this.config.superJump) {
          args[1] = Il2Cpp.float(this.config.jumpMultiplier);
          log.hook("player", "Super Jump", "ON");
        }
      },
    });

    // VULN-H06: Infinite Jump
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdJump",
      replace: (args, instance) => {
        if (this.config.infiniteJump) {
          instance.field("canJump").value = Il2Cpp.bool(true);
          instance.field("jumpCount").value = Il2Cpp.int(0);
          log.hook("player", "Infinite Jump", "ON");
        }
        return instance.method("CmdJump").invoke(...args);
      },
    });

    // VULN-C05: No Recoil
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdShootPos",
      onEnter: () => {
        if (this.config.noRecoil) {
          log.hook("player", "No Recoil", "ON");
        }
      },
    });

    // VULN-M03: One Hit Kill
    this.hooks.register({
      className: "PlayerHealth",
      methodName: "CmdUpdateHealth",
      onEnter: (args) => {
        if (this.config.oneHitKill) {
          args[0] = Il2Cpp.int(0);
          log.hook("player", "One Hit Kill", "ON");
        }
      },
    });

    // VULN-H03: Freeze Players
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdRun",
      replace: (args, instance) => {
        if (this.config.freezePlayers) {
          const position = instance.transform.position;
          position.x = Il2Cpp.float(0);
          position.y = Il2Cpp.float(0);
          position.z = Il2Cpp.float(0);
          instance.transform.position = position;
          log.hook("player", "Freeze Players", "ON");
        }
        return undefined;
      },
    });

    // VULN-M07: Invisibility (set mask to invisible model)
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdUpdateMask",
      onEnter: (args) => {
        if (this.config.invisibility) {
          args[0] = Il2Cpp.int(-1);
          log.hook("player", "Invisibility", "ON");
        }
      },
    });

    // VULN-M10: Infinite Jetpack
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdJump",
      replace: (args, instance) => {
        if (this.config.flyMode) {
          instance.field("jetpackFuel").value = Il2Cpp.float(99999);
          log.hook("player", "Infinite Jetpack", "ON");
        }
        return instance.method("CmdJump").invoke(...args);
      },
    });

    // VULN-H07: Respawn Anywhere
    this.hooks.register({
      className: "PlayerControl",
      methodName: "CmdRespawn",
      onEnter: (args) => {
        if (this.config.noClip) {
          args[0] = Il2Cpp.float(0);
          args[1] = Il2Cpp.float(100);
          args[2] = Il2Cpp.float(0);
          log.hook("player", "Respawn Anywhere", "ON");
        }
      },
    });
  }

  private healToFull(): void {
    try {
      const localPlayer = this.getLocalPlayer();
      if (!localPlayer) return;

      const healthComponent = localPlayer.method("GetComponent", [Il2Cpp.int(23)]).invoke();
      if (!healthComponent.isNull) {
        healthComponent.method("CmdUpdateHealth", [Il2Cpp.int(99999)]).invoke();
      }
    } catch (e) {
      log.error("Failed to heal to full", e);
    }
  }

  private getLocalPlayer(): any {
    if (!this.localPlayer || this.localPlayer.isNull) {
      this.localPlayer = resolver.findLocalPlayer();
    }
    return this.localPlayer;
  }

  getConfig(): PlayerHacksConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<PlayerHacksConfig>): void {
    Object.assign(this.config, updates);
    log.info("Player hacks config updated", updates);
  }

  toggle(godMode?: boolean, infiniteHealth?: boolean, unlimitedAmmo?: boolean): void {
    if (godMode !== undefined) this.config.godMode = godMode;
    if (infiniteHealth !== undefined) this.config.infiniteHealth = infiniteHealth;
    if (unlimitedAmmo !== undefined) this.config.unlimitedAmmo = unlimitedAmmo;
  }
}
