# LAC Security Test Framework

[![CI](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/ci.yml/badge.svg)](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/ci.yml)
[![CodeQL](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/codeql.yml/badge.svg)](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/codeql.yml)
[![Release](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/release.yml/badge.svg)](https://github.com/IsraelDXPP/LAC-SecurityTest/actions/workflows/release.yml)

## Overview

Security testing framework for Los Angeles Crimes 1.9.6. Includes both:
1. **APK Mod Menu** - Modified APK with integrated mod menu (no root required)
2. **Frida Agent** - Runtime hooking framework (requires root)

## Features

- 33 documented vulnerabilities (5 Critical, 9 High, 9 Medium, 10 Low)
- 5 hack modules: Player, Vehicle, Network, Editor, Game State
- **APK Mod Menu** - Install and play with mod menu built-in
- **Frida Agent** - Advanced runtime hooking
- Floating menu overlay with tabbed interface
- Anti-detection bypass system
- CLI for automation and scripting
- GitHub Actions CI/CD pipeline

## Quick Start - APK Mod Menu (Recommended)

```bash
# Clone repository
git clone https://github.com/IsraelDXPP/LAC-SecurityTest.git
cd LAC-SecurityTest

# Build modded APK
cd apk-builder
build-apk.bat

# Install on device
adb install output\LAC_ModMenu_Signed.apk
```

## Quick Start - Frida Agent (Requires Root)

```bash
# Clone repository
git clone https://github.com/IsraelDXPP/LAC-SecurityTest.git
cd LAC-SecurityTest

# Install dependencies
npm install

# Build project
npm run build

# Inject agent
npm run inject
```

## Prerequisites

### For APK Mod Menu
- Java JDK 17+
- apktool (https://ibotpeaches.github.io/Apktool/)
- Android SDK Build Tools
- Original APK (already extracted)

### For Frida Agent
- Node.js 18+
- Android device/emulator with root access
- ADB (Android Debug Bridge)
- Frida server running on device

## Usage

### CLI Commands

```bash
# Inject agent into LAC
npm run inject

# List all vulnerabilities
npm run list

# Filter by severity
npm run list -- --severity CRITICAL

# Filter by category
npm run list -- --category Player

# Show hook status
npm run cli -- status

# Export vulnerability report
npm run cli -- export --format markdown

# Toggle floating menu
npm run menu
```

### Floating Menu

- **Player Tab**: God mode, infinite health, unlimited ammo, speed hacks
- **Vehicle Tab**: Vehicle god mode, unlimited fuel, super speed, ESP
- **Network Tab**: View all players/vehicles, see chat, force unlock
- **Editor Tab**: Invincibility, editor mode, time control
- **Game Tab**: Infinite coins, zombie control, round control

## Project Structure

```
LAC-SecurityTest/
├── agent/                    # Frida agent (TypeScript)
│   ├── index.ts              # Entry point
│   ├── il2cpp/               # Il2Cpp integration
│   ├── modules/              # Hack modules
│   ├── menu/                 # Floating UI
│   └── utils/                # Utilities
├── apk-builder/              # APK mod menu build system
│   ├── smali/                # Smali code for mod menu
│   ├── build-apk.bat         # Build script
│   └── README.md             # APK builder docs
├── cli/                      # Command line interface
├── data/                     # Configuration data
├── scripts/                  # Automation scripts
├── tests/                    # Test suite
└── docs/                     # Documentation
```

## CI/CD

### GitHub Actions Workflows

1. **CI** (`ci.yml`): Runs on push/PR, builds and tests
2. **CodeQL** (`codeql.yml`): Security analysis
3. **Release** (`release.yml`): Creates releases on tags
4. **Dependencies** (`dependencies.yml`): Auto-updates dependencies

### Creating a Release

```bash
# Tag a release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# GitHub Actions will automatically:
# - Build the project
# - Create a GitHub Release
# - Upload build artifacts
```

## Security

### Anti-Detection

The framework bypasses common detection methods:
- ptrace checks
- /proc/self/maps reading
- Frida signature scanning
- Memory scanning
- Process enumeration

### Responsible Disclosure

This framework is for authorized security testing only. Do not use against production systems without explicit permission.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Vulnerabilities](docs/VULNERABILITIES.md)
- [Patches](docs/PATCHES.md)

## License

MIT License - See [LICENSE](LICENSE) for details.

## Disclaimer

This tool is for authorized security testing and educational purposes only. The authors are not responsible for misuse.
