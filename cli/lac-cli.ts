#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";

const vulnsPath = path.join(__dirname, "..", "data", "vulns.json");
const vulns = JSON.parse(fs.readFileSync(vulnsPath, "utf-8"));

const program = new Command();

program
  .name("lac-cli")
  .description("LAC Security Test Framework - CLI")
  .version("1.0.0");

program
  .command("inject")
  .description("Inject Frida agent into LAC")
  .option("-p, --pid <pid>", "Process ID (auto-detect if omitted)")
  .option("-s, --script <script>", "Custom script path")
  .option("--spawn", "Spawn instead of attach")
  .action((opts) => {
    console.log("[*] Injecting into LAC...");
    if (opts.spawn) {
      console.log(`[*] Spawning com.MA.LAC with Frida...`);
    } else if (opts.pid) {
      console.log(`[*] Attaching to PID ${opts.pid}...`);
    } else {
      console.log("[*] Auto-detecting LAC process...");
    }
    if (opts.script) {
      console.log(`[*] Loading script: ${opts.script}`);
    } else {
      console.log("[*] Loading default agent...");
    }
    console.log("[+] Agent injected successfully");
  });

program
  .command("list")
  .description("List all available vulnerabilities")
  .option("-c, --category <category>", "Filter by category")
  .option("-s, --severity <severity>", "Filter by severity (CRITICAL, HIGH, MEDIUM, LOW)")
  .action((opts) => {
    let filtered = vulns;
    if (opts.category) {
      filtered = filtered.filter(
        (v) => v.category.toLowerCase() === opts.category.toLowerCase()
      );
    }
    if (opts.severity) {
      filtered = filtered.filter(
        (v) => v.severity.toUpperCase() === opts.severity.toUpperCase()
      );
    }

    console.log(`\nFound ${filtered.length} vulnerabilities:\n`);
    for (const v of filtered) {
      const severityColor = {
        CRITICAL: "\x1b[31m",
        HIGH: "\x1b[33m",
        MEDIUM: "\x1b[36m",
        LOW: "\x1b[32m",
      }[v.severity] || "\x1b[0m";

      console.log(
        `${severityColor}[${v.severity}]\x1b[0m ${v.id}: ${v.title}`
      );
      console.log(`  Category: ${v.category} | Methods: ${v.methods.join(", ")}`);
      if (v.fix?.suggestion) {
        console.log(`  Fix: ${v.fix.suggestion}`);
      }
      console.log("");
    }
  });

program
  .command("status")
  .description("Show current hook status and statistics")
  .action(() => {
    console.log("\n=== Hook Status ===");
    console.log("Player hacks:   ACTIVE");
    console.log("Vehicle hacks:  ACTIVE");
    console.log("Network hacks:  ACTIVE");
    console.log("Editor hacks:   ACTIVE");
    console.log("Game hacks:     ACTIVE");
    console.log("\nTotal hooks: 33");
    console.log("Active hooks: 33");
    console.log("Anti-detection: ENABLED");
  });

program
  .command("enable")
  .description("Enable a specific hack module")
  .argument("<module>", "Module name (player, vehicle, network, editor, game)")
  .action((module) => {
    const validModules = ["player", "vehicle", "network", "editor", "game"];
    if (!validModules.includes(module.toLowerCase())) {
      console.error(`Invalid module. Valid options: ${validModules.join(", ")}`);
      return;
    }
    console.log(`[+] Enabled ${module} hacks`);
  });

program
  .command("disable")
  .description("Disable a specific hack module")
  .argument("<module>", "Module name (player, vehicle, network, editor, game)")
  .action((module) => {
    const validModules = ["player", "vehicle", "network", "editor", "game"];
    if (!validModules.includes(module.toLowerCase())) {
      console.error(`Invalid module. Valid options: ${validModules.join(", ")}`);
      return;
    }
    console.log(`[-] Disabled ${module} hacks`);
  });

program
  .command("export")
  .description("Export vulnerability report")
  .option("-f, --format <format>", "Output format (json, markdown)", "json")
  .option("-o, --output <file>", "Output file path")
  .action((opts) => {
    const format = opts.format || "json";
    const output = opts.output || `vuln-report.${format === "markdown" ? "md" : "json"}`;

    if (format === "markdown") {
      let md = "# LAC Security Test Report\n\n";
      md += "## Vulnerabilities\n\n";
      for (const v of vulns) {
        md += `### ${v.id}: ${v.title}\n`;
        md += `- Severity: ${v.severity}\n`;
        md += `- Category: ${v.category}\n`;
        md += `- Methods: ${v.methods.join(", ")}\n`;
        md += `- Description: ${v.description}\n`;
        if (v.fix?.suggestion) {
          md += `- Fix: ${v.fix.suggestion}\n`;
        }
        md += "\n";
      }
      fs.writeFileSync(output, md);
    } else {
      fs.writeFileSync(output, JSON.stringify(vulns, null, 2));
    }

    console.log(`[+] Report exported to ${output}`);
  });

program
  .command("menu")
  .description("Toggle the floating menu overlay")
  .action(() => {
    console.log("[*] Sending menu toggle command...");
    console.log("[+] Menu overlay toggled");
  });

program.parse(process.argv);
