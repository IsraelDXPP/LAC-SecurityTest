@echo off
REM LAC Security Test - Build Script
REM Compiles the TypeScript agent to JavaScript

echo [*] Building LAC Security Test Framework...

REM Check TypeScript
npx tsc --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] TypeScript not found. Installing...
    call npm install -g typescript
)

REM Clean dist
if exist dist (
    echo [*] Cleaning previous build...
    rmdir /s /q dist
)

REM Compile TypeScript
echo [*] Compiling TypeScript...
npx tsc

if %errorlevel% neq 0 (
    echo [!] Build failed. Check TypeScript errors above.
    exit /b 1
)

echo [+] Build successful
echo [+] Output: dist/
