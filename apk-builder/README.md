# LAC Mod Menu APK Builder

This directory contains the tools and code needed to build a modified APK with an integrated mod menu.

## Prerequisites

1. **Java JDK 17+** - Required for apktool and signing
2. **apktool** - Download from https://ibotpeaches.github.io/Apktool/
3. **Android SDK Build Tools** - For zipalign and apksigner
4. **Original APK** - Already extracted in `../LAC_apktool/`

## Setup

1. Place `apktool.jar` in your home directory:
   ```
   %USERPROFILE%\apktool\apktool.jar
   ```

2. Ensure Android SDK is installed with build-tools 34.0.0

## Build

```bash
# Run the build script
build-apk.bat
```

The script will:
1. Inject smali mod menu code into the APK
2. Modify AndroidManifest.xml to use custom activity
3. Rebuild the APK with apktool
4. Generate a signing key (first time only)
5. Align and sign the APK

## Output

The signed APK will be in:
```
output\LAC_ModMenu_Signed.apk
```

## Install

```bash
# Via ADB
adb install output\LAC_ModMenu_Signed.apk

# Or transfer to device
adb push output\LAC_ModMenu_Signed.apk /sdcard/
```

## Features

The mod menu includes:
- **Player Tab**: God Mode, Infinite Health, Unlimited Ammo, Speed Hack, Super Jump, No Recoil, One Hit Kill
- **Vehicle Tab**: Vehicle God Mode, Unlimited Fuel
- **Network Tab**: View All Players
- **Game Tab**: Infinite Coin

## How It Works

1. **ModMenuActivity** extends UnityPlayerActivity
2. **ModMenuOverlay** draws the floating menu using WindowManager
3. **ModMenuHook** provides static methods to check hack states
4. Game code reads hack states via ModMenuHook.isHackEnabled()

## Integration

To integrate with game code, add hook calls in the appropriate smali files:

```smali
# Example: Check if God Mode is enabled
invoke-static {v0}, Lcom/lac/modmenu/ModMenuHook;->isHackEnabled(Ljava/lang/String;)Z
move-result v0
if-eqz v0, :normal_damage
# God mode enabled - skip damage
: normal_damage
```

## Troubleshooting

- **apktool not found**: Download and place in `%USERPROFILE%\apktool\`
- **Signing failed**: Install Android SDK Build Tools
- **APK not installing**: Uninstall original app first
- **App crashes**: Check logcat for errors: `adb logcat | grep -i "lac\|modmenu"`
