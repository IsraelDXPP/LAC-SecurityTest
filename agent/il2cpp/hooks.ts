import { log } from "../utils/logger";

export interface HookConfig {
  className: string;
  methodName: string;
  assemblyName?: string;
  onEnter?: (args: any[], instance: any) => void;
  onLeave?: (retval: any, instance: any) => any;
  replace?: (args: any[], instance: any) => any;
  enabled?: boolean;
}

export class HookManager {
  private hooks: Map<string, HookConfig> = new Map();
  private activeHooks: Map<string, any> = new Map();
  private resolver: any;

  constructor(resolver: any) {
    this.resolver = resolver;
  }

  register(config: HookConfig): void {
    const key = `${config.className}.${config.methodName}`;
    config.enabled = config.enabled !== false;
    this.hooks.set(key, config);
    log.info(`Hook registered: ${key}`);
  }

  registerAll(configs: HookConfig[]): void {
    configs.forEach((c) => this.register(c));
  }

  enable(key: string): void {
    const config = this.hooks.get(key);
    if (config) {
      config.enabled = true;
      this.applyHook(key);
    }
  }

  disable(key: string): void {
    const config = this.hooks.get(key);
    if (config) {
      config.enabled = false;
      this.removeHook(key);
    }
  }

  toggle(key: string): boolean {
    const config = this.hooks.get(key);
    if (!config) return false;
    config.enabled = !config.enabled;
    if (config.enabled) {
      this.applyHook(key);
    } else {
      this.removeHook(key);
    }
    return config.enabled;
  }

  private applyHook(key: string): void {
    const config = this.hooks.get(key);
    if (!config || !config.enabled) return;

    try {
      const method = this.resolver.getMethod(
        config.className,
        config.methodName,
        config.assemblyName || "Assembly-CSharp"
      );

      if (!method) {
        log.error(`Cannot hook: method not found - ${key}`);
        return;
      }

      if (config.replace) {
        method.implementation = function (...args: any[]) {
          return config.replace!(args, this);
        };
      } else {
        const originalOnEnter = config.onEnter;
        const originalOnLeave = config.onLeave;

        method.implementation = function (...args: any[]) {
          if (originalOnEnter) {
            originalOnEnter(args, this);
          }
          const retval = method.invoke(...args);
          if (originalOnLeave) {
            return originalOnLeave(retval, this);
          }
          return retval;
        };
      }

      this.activeHooks.set(key, method);
      log.info(`Hook applied: ${key}`);
    } catch (e) {
      log.error(`Failed to apply hook: ${key}`, e);
    }
  }

  private removeHook(key: string): void {
    const activeHook = this.activeHooks.get(key);
    if (activeHook) {
      activeHook.revert();
      this.activeHooks.delete(key);
      log.info(`Hook removed: ${key}`);
    }
  }

  enableAll(): void {
    for (const [key, config] of this.hooks) {
      if (config.enabled) {
        this.applyHook(key);
      }
    }
  }

  disableAll(): void {
    for (const key of this.activeHooks.keys()) {
      this.removeHook(key);
    }
  }

  getHookCount(): number {
    return this.hooks.size;
  }

  getActiveCount(): number {
    return this.activeHooks.size;
  }

  getHooksByCategory(category: string): HookConfig[] {
    return Array.from(this.hooks.values()).filter((h) =>
      h.className.toLowerCase().includes(category.toLowerCase())
    );
  }
}
