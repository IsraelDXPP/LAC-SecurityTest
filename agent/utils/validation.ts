import { log } from "./logger";

export interface ValidationRule {
  name: string;
  validate: (args: any[], instance: any) => boolean;
  errorMessage: string;
}

export class HookValidator {
  private rules: Map<string, ValidationRule[]> = new Map();

  addRule(hookKey: string, rule: ValidationRule): void {
    const existing = this.rules.get(hookKey) || [];
    existing.push(rule);
    this.rules.set(hookKey, existing);
  }

  validate(hookKey: string, args: any[], instance: any): boolean {
    const rules = this.rules.get(hookKey) || [];
    for (const rule of rules) {
      if (!rule.validate(args, instance)) {
        log.warn(`Validation failed: ${hookKey} - ${rule.errorMessage}`);
        return false;
      }
    }
    return true;
  }

  static requireAuthority(): ValidationRule {
    return {
      name: "requireAuthority",
      validate: (_args, instance) => {
        try {
          return instance.method("get_isServer").invoke().valueOf() === true;
        } catch {
          return true;
        }
      },
      errorMessage: "Not running on server",
    };
  }

  static rateLimit(intervalMs: number): ValidationRule {
    const lastCall = new Map<string, number>();
    return {
      name: "rateLimit",
      validate: (_args, instance) => {
        const now = Date.now();
        const key = instance.toString();
        const last = lastCall.get(key) || 0;
        if (now - last < intervalMs) {
          return false;
        }
        lastCall.set(key, now);
        return true;
      },
      errorMessage: `Rate limited (min interval: ${intervalMs}ms)`,
    };
  }

  static maxValue(fieldName: string, max: number): ValidationRule {
    return {
      name: "maxValue",
      validate: (args) => {
        const value = args[0];
        if (typeof value === "number" && value > max) {
          return false;
        }
        return true;
      },
      errorMessage: `${fieldName} exceeds max value of ${max}`,
    };
  }

  static stringNotEmpty(index: number): ValidationRule {
    return {
      name: "stringNotEmpty",
      validate: (args) => {
        const value = args[index];
        if (typeof value === "string" && value.length === 0) {
          return false;
        }
        return true;
      },
      errorMessage: `String argument at index ${index} is empty`,
    };
  }
}

export const validator = new HookValidator();
