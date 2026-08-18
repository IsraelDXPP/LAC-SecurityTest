@echo off
REM LAC Security Test - Quick Start
REM This script sets up the environment and launches the agent

echo ========================================
echo   LAC Security Test Framework v1.0.0
echo ========================================

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Node.js not found. Please install Node.js 18+
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] npm not found. Please install npm
    exit /b 1
)

REM Install dependencies
echo [1/3] Installing dependencies...
call npm install

REM Build the project
echo [2/3] Building project...
call npm run build

REM Start the agent
echo [3/3] Starting agent...
echo.
echo Usage:
echo   npm run inject          - Inject agent into LAC
echo   npm run menu            - Toggle floating menu
echo   npm run list            - List vulnerabilities
echo   npm run cli -- status   - Show hook status
echo.
echo For more information, see README.md
