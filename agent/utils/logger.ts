export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel = LogLevel.INFO;
  private buffer: string[] = [];
  private maxBuffer = 500;

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  debug(message: string, data?: any): void {
    if (this.level <= LogLevel.DEBUG) {
      this.log("DEBUG", message, data);
    }
  }

  info(message: string, data?: any): void {
    if (this.level <= LogLevel.INFO) {
      this.log("INFO", message, data);
    }
  }

  warn(message: string, data?: any): void {
    if (this.level <= LogLevel.WARN) {
      this.log("WARN", message, data);
    }
  }

  error(message: string, data?: any): void {
    if (this.level <= LogLevel.ERROR) {
      this.log("ERROR", message, data);
    }
  }

  hook(moduleName: string, hookName: string, status: "ON" | "OFF"): void {
    const tag = status === "ON" ? "[+]" : "[-]";
    this.info(`${tag} [${moduleName}] ${hookName}`);
  }

  vulnerability(id: string, description: string, status: string): void {
    this.info(`[VULN:${id}] ${status}: ${description}`);
  }

  private log(level: string, message: string, data?: any): void {
    const timestamp = new Date().toISOString().substr(11, 12);
    const logEntry = `[${timestamp}] [${level}] ${message}`;

    if (data) {
      console.log(`${logEntry} | ${JSON.stringify(data)}`);
    } else {
      console.log(logEntry);
    }

    this.buffer.push(logEntry);
    if (this.buffer.length > this.maxBuffer) {
      this.buffer.shift();
    }
  }

  getBuffer(): string[] {
    return [...this.buffer];
  }

  flush(): string {
    const output = this.buffer.join("\n");
    this.buffer = [];
    return output;
  }
}

export const log = new Logger();
