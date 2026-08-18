# LAC Security Test Framework

## Architecture Overview

### System Components

```
LAC-SecurityTest/
├── agent/                    # Frida agent (TypeScript)
│   ├── index.ts              # Entry point
│   ├── il2cpp/               # Il2Cpp integration
│   │   ├── resolver.ts       # Class/method resolution
│   │   └── hooks.ts          # Hook manager
│   ├── modules/              # Hack modules
│   │   ├── player-hacks.ts   # Player cheats
│   │   ├── vehicle-hacks.ts  # Vehicle cheats
│   │   ├── network-hacks.ts  # Network exploits
│   │   ├── editor-hacks.ts   # Editor exploits
│   │   └── gamestate-hacks.ts# Game state exploits
│   ├── menu/                 # Floating UI
│   │   ├── overlay.ts        # Menu overlay
│   │   ├── tabs.ts           # Tab management
│   │   └── widgets.ts        # UI widgets
│   └── utils/                # Utilities
│       ├── logger.ts         # Logging
│       ├── validation.ts     # Input validation
│       └── anti-detect.ts    # Anti-detection bypass
├── cli/                      # Command line interface
│   └── lac-cli.ts            # CLI commands
├── data/                     # Configuration data
│   ├── vulns.json            # Vulnerability catalog
│   └── methods-map.json      # Method offset mapping
├── scripts/                  # Automation scripts
│   ├── quickstart.bat        # Setup script
│   ├── inject.bat            # Injection script
│   └── build.bat             # Build script
└── tests/                    # Test suite
    ├── hook.test.ts          # Hook tests
    └── vulns.test.ts         # Vulnerability tests
```

### Data Flow

1. **CLI** → Sends commands to agent
2. **Agent** → Resolves Il2Cpp classes/methods
3. **Hook Manager** → Applies intercepts
4. **Modules** → Execute exploit logic
5. **Menu** → Provides UI controls
6. **Anti-Detect** → Prevents detection

### Hook System

```
Method Call → Hook Interceptor → Logic Check → Execute/Block/Modify
```

- **Command hooks**: Intercept Mirror RPCs (Cmd*)
- **Method hooks**: Replace method implementations
- **Update hooks**: Monitor Update/FixedUpdate loops
- **Event hooks**: Track Unity events

### Anti-Detection

The framework bypasses common detection methods:
- ptrace checks
- /proc/self/maps reading
- Frida signature scanning
- Memory scanning
- Process enumeration

### Module System

Each module is self-contained:
- **Player**: Health, ammo, movement, combat
- **Vehicle**: Damage, fuel, speed, entry
- **Network**: ESP, chat, packet monitoring
- **Editor**: Mode, AI, objects, save/load
- **Gamestate**: Coins, zombies, rounds, roles

### Configuration

All modules use typed configuration objects:
```typescript
interface PlayerHacksConfig {
  godMode: boolean;
  infiniteHealth: boolean;
  unlimitedAmmo: boolean;
  // ...
}
```

### Testing

- Unit tests for hook registration
- Integration tests for vulnerability data
- Manual testing via floating menu

### Build Process

```bash
npm run build    # Compile TypeScript
npm run test     # Run tests
npm run inject   # Inject agent
```
