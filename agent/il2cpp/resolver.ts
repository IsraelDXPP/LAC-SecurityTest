import { log } from "../utils/logger";

export interface ClassInfo {
  name: string;
  typedefIndex: number;
  baseClass: string;
  il2CppClass: any;
}

export interface MethodInfo {
  name: string;
  rva: string;
  attribute?: string;
  il2CppMethod: any;
}

export interface FieldInfo {
  name: string;
  offset: string;
  type: string;
  syncVar?: boolean;
}

export class Il2CppResolver {
  private assemblyCache: Map<string, any> = new Map();
  private classCache: Map<string, any> = new Map();
  private ready = false;

  async initialize(): Promise<void> {
    return (Il2Cpp as any).perform(() => {
      log.info("Il2Cpp runtime initialized");
      this.ready = true;
    });
  }

  getAssembly(name: string): any {
    if (this.assemblyCache.has(name)) {
      return this.assemblyCache.get(name);
    }
    const domain = (Il2Cpp as any).domain;
    const assembly = domain.assembly(name);
    this.assemblyCache.set(name, assembly);
    log.info(`Assembly resolved: ${name}`);
    return assembly;
  }

  getClass(assemblyName: string, className: string): any {
    const cacheKey = `${assemblyName}.${className}`;
    if (this.classCache.has(cacheKey)) {
      return this.classCache.get(cacheKey);
    }
    const assembly = this.getAssembly(assemblyName);
    const clazz = assembly.image.class(className);
    this.classCache.set(cacheKey, clazz);
    log.info(`Class resolved: ${className}`);
    return clazz;
  }

  getMethod(className: string, methodName: string, assemblyName = "Assembly-CSharp"): any {
    const clazz = this.getClass(assemblyName, className);
    const methods = clazz.methods;
    for (let i = 0; i < methods.length; i++) {
      if (methods[i].name === methodName) {
        return methods[i];
      }
    }
    log.warn(`Method not found: ${className}.${methodName}`);
    return null;
  }

  getStaticField(className: string, fieldName: string, assemblyName = "Assembly-CSharp"): any {
    const clazz = this.getClass(assemblyName, className);
    return clazz.field(fieldName);
  }

  getFieldOffset(className: string, fieldName: string, assemblyName = "Assembly-CSharp"): number {
    const clazz = this.getClass(assemblyName, className);
    const field = clazz.field(fieldName);
    return field ? field.offset : -1;
  }

  getAllInstances(className: string, assemblyName = "Assembly-CSharp"): any[] {
    const clazz = this.getClass(assemblyName, className);
    return (Il2Cpp as any).GC.choose(clazz);
  }

  findLocalPlayer(): any {
    try {
      const playerControl = this.getClass("Assembly-CSharp", "PlayerControl");
      const instances = (Il2Cpp as any).GC.choose(playerControl);
      for (const instance of instances) {
        const isLocal = instance.method("get_Local");
        if (isLocal) {
          const localInstance = isLocal.invoke();
          if (!localInstance.isNull) {
            return localInstance;
          }
        }
      }
    } catch (e) {
      log.error("Failed to find local player", e);
    }
    return null;
  }

  isReady(): boolean {
    return this.ready;
  }
}

export const resolver = new Il2CppResolver();
