import { log } from "./logger";

export class AntiDetect {
  private static patched = false;

  static applyBypass(): void {
    if (this.patched) return;

    try {
      this.hookStrstr();
      this.hookFopen();
      this.patchPtrace();
      this.patchStatusCheck();
      this.patchMemoryScan();
      this.patched = true;
      log.info("Anti-detection bypass applied");
    } catch (e) {
      log.error("Failed to apply anti-detection bypass", e);
    }
  }

  private static hookStrstr(): void {
    const strstr = Module.findExportByName("libc.so", "strstr");
    if (!strstr) return;

    const blacklist = [
      "frida",
      "frida-agent",
      "frida-server",
      "gmain",
      "linjector",
      "REJECT",
    ];

    Interceptor.attach(strstr, {
      onEnter(args) {
        const haystack = args[0];
        const needle = args[1];
        if (!needle.isNull()) {
          const needleStr = needle.readCString();
          if (needleStr && blacklist.some((b) => needleStr.toLowerCase().includes(b))) {
            this.shouldBlock = true;
          }
        }
      },
      onLeave(retval) {
        if (this.shouldBlock) {
          retval.replace(ptr(0));
          this.shouldBlock = false;
        }
      },
    });

    log.debug("strstr hook applied for Frida detection bypass");
  }

  private static hookFopen(): void {
    const fopen = Module.findExportByName("libc.so", "fopen");
    if (!fopen) return;

    const blacklist = ["/proc/self/maps", "/proc/self/status", "/proc/self/task"];

    Interceptor.attach(fopen, {
      onEnter(args) {
        const path = args[0];
        if (!path.isNull()) {
          const pathStr = path.readCString();
          if (pathStr && blacklist.includes(pathStr)) {
            this.shouldBlock = true;
          }
        }
      },
      onLeave(retval) {
        if (this.shouldBlock) {
          retval.replace(ptr(0));
          this.shouldBlock = false;
        }
      },
    });

    log.debug("fopen hook applied for process inspection bypass");
  }

  private static patchPtrace(): void {
    const ptrace = Module.findExportByName("libc.so", "ptrace");
    if (!ptrace) return;

    Interceptor.replace(
      ptrace,
      new NativeCallback(
        function (request: number, _pid: number, _addr: number, _data: number) {
          if (request === 0) return 0;
          return 0;
        },
        "long",
        ["int", "int", "pointer", "pointer"]
      )
    );

    log.debug("ptrace hook applied (anti-debug bypass)");
  }

  private static patchStatusCheck(): void {
    const openat = Module.findExportByName("libc.so", "openat");
    if (!openat) return;

    const blacklist = ["/proc/self/status", "/proc/self/maps"];

    Interceptor.attach(openat, {
      onEnter(args) {
        const path = args[1];
        if (!path.isNull()) {
          const pathStr = path.readCString();
          if (pathStr && blacklist.includes(pathStr)) {
            this.shouldBlock = true;
          }
        }
      },
      onLeave(retval) {
        if (this.shouldBlock) {
          retval.replace(new NativePointer(-1));
          this.shouldBlock = false;
        }
      },
    });

    log.debug("openat hook applied for process inspection bypass");
  }

  private static patchMemoryScan(): void {
    const iterate = Module.findExportByName("libc.so", "dl_iterate_phdr");
    if (!iterate) return;

    Interceptor.attach(iterate, {
      onEnter() {
        this.skip = false;
      },
    });

    log.debug("dl_iterate_phdr monitoring active");
  }
}
