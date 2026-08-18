@echo off
REM LAC Security Test - Frida Injection Script
REM Injects the Frida agent into LAC process

echo [*] Injecting Frida agent into LAC...

REM Check if Frida is running
adb devices >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] ADB not found. Make sure Android SDK is installed and in PATH.
    echo     Download: https://developer.android.com/tools/releases/platform-tools
    exit /b 1
)

REM Check for connected device
adb devices | findstr /R "device$" >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] No Android device connected.
    echo     Connect your device via USB or start an emulator.
    exit /b 1
)

REM Push Frida server if not present
adb shell "ls /data/local/tmp/frida-server" >nul 2>&1
if %errorlevel% neq 0 (
    echo [*] Pushing Frida server to device...
    adb push frida-server /data/local/tmp/
    adb shell "chmod 755 /data/local/tmp/frida-server"
)

REM Start Frida server
echo [*] Starting Frida server...
adb shell "/data/local/tmp/frida-server &"

REM Wait for server to start
timeout /t 2 /nobreak >nul

REM Check if LAC is running
echo [*] Looking for LAC process...
for /f "tokens=*" %%a in ('adb shell "ps -A | grep com.MA.LAC"') do (
    set PID=%%a
)

if defined PID (
    echo [+] Found LAC process. Attaching...
    frida -U -n com.MA.LAC -l agent/index.ts
) else (
    echo [*] LAC not running. Spawning...
    frida -U -f com.MA.LAC -l agent/index.ts --no-pause
)

echo [+] Agent injected successfully
