import { resolver } from "../il2cpp/resolver";
import { HookManager } from "../il2cpp/hooks";
import { log } from "../utils/logger";

export interface EditorHacksConfig {
  invincible: boolean;
  editorMode: boolean;
  freeCam: boolean;
  freeCamSpeed: number;
  createObjects: boolean;
  deleteObjects: boolean;
  spawnProps: boolean;
  saveExploit: boolean;
  loadExploit: boolean;
  spawnBots: boolean;
  toggleAI: boolean;
  timeControl: boolean;
  customTime: number;
}

const defaultConfig: EditorHacksConfig = {
  invincible: false,
  editorMode: false,
  freeCam: false,
  freeCamSpeed: 5.0,
  createObjects: false,
  deleteObjects: false,
  spawnProps: false,
  saveExploit: false,
  loadExploit: false,
  spawnBots: false,
  toggleAI: false,
  timeControl: false,
  customTime: 12.0,
};

export class EditorHacks {
  private hooks: HookManager;
  private config: EditorHacksConfig;

  constructor(hooks: HookManager) {
    this.hooks = hooks;
    this.config = { ...defaultConfig };
  }

  init(): void {
    this.registerHooks();
    log.info("Editor hacks module initialized");
  }

  private registerHooks(): void {
    // VULN-M01: Editor Invincibility
    this.hooks.register({
      className: "LACEditor",
      methodName: "ToggleInvincible",
      replace: (args, instance) => {
        if (this.config.invincible) {
          log.hook("editor", "Editor Invincibility", "ON");
          return instance.method("ToggleInvincible").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-M02: Editor Mode Toggle
    this.hooks.register({
      className: "LACEditor",
      methodName: "ToggleEditing",
      replace: (args, instance) => {
        if (this.config.editorMode) {
          log.hook("editor", "Editor Mode", "ON");
          return instance.method("ToggleEditing").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-H07: Toggle AI Navmesh
    this.hooks.register({
      className: "LACEditor",
      methodName: "ToggleNavmeshAI",
      replace: (args, instance) => {
        if (this.config.toggleAI) {
          log.hook("editor", "Toggle Navmesh AI", "ON");
          return instance.method("ToggleNavmeshAI").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-H08: Spawn Props via Editor
    this.hooks.register({
      className: "LACEditor",
      methodName: "CmdSyncEditorObj",
      replace: (args, instance) => {
        if (this.config.spawnProps) {
          log.hook("editor", "Spawn Props", "ON");
          return instance.method("CmdSyncEditorObj").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-H09: Save File Exploit
    this.hooks.register({
      className: "LACEditor",
      methodName: "SaveFiles",
      replace: (args, instance) => {
        if (this.config.saveExploit) {
          log.hook("editor", "Save File Exploit", "ON");
          return instance.method("SaveFiles").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-H10: Load File Exploit
    this.hooks.register({
      className: "LACEditor",
      methodName: "LoadFile",
      replace: (args, instance) => {
        if (this.config.loadExploit) {
          log.hook("editor", "Load File Exploit", "ON");
          return instance.method("LoadFile").invoke(...args);
        }
        return undefined;
      },
    });

    // VULN-L02: Spawn Bots
    this.hooks.register({
      className: "ServerGameManager",
      methodName: "CmdSetPlayers",
      replace: (args, instance) => {
        if (this.config.spawnBots) {
          log.hook("editor", "Spawn Bots", "ON");
          args[0] = Il2Cpp.int(50);
          return instance.method("CmdSetPlayers").invoke(...args);
        }
        return instance.method("CmdSetPlayers").invoke(...args);
      },
    });

    // VULN-L03: Time Control
    this.hooks.register({
      className: "NetworkedGlobalVariables",
      methodName: "RpcSetVariable",
      onEnter: (args) => {
        if (this.config.timeControl) {
          const variableName = args[0];
          if (variableName && !variableName.isNull()) {
            const name = variableName.toString();
            if (name === "timeOfDay") {
              args[1] = Il2Cpp.float(this.config.customTime);
              log.hook("editor", "Time Control", "ON");
            }
          }
        }
      },
    });

    // VULN-L05: Day Cycle Sync
    this.hooks.register({
      className: "ServerGameManager",
      methodName: "CmdSyncDayCycle",
      replace: (args, instance) => {
        if (this.config.timeControl) {
          log.hook("editor", "Day Cycle Sync", "ON");
          args[0] = Il2Cpp.float(this.config.customTime);
          return instance.method("CmdSyncDayCycle").invoke(...args);
        }
        return instance.method("CmdSyncDayCycle").invoke(...args);
      },
    });
  }

  getConfig(): EditorHacksConfig {
    return { ...this.config };
  }

  updateConfig(updates: Partial<EditorHacksConfig>): void {
    Object.assign(this.config, updates);
    log.info("Editor hacks config updated", updates);
  }
}
