@echo off
REM ========================================
REM  LAC Mod Menu APK Builder
REM  Injects mod menu into original APK
REM ========================================

setlocal enabledelayedexpansion

echo ========================================
echo   LAC Mod Menu APK Builder v1.0
echo ========================================

REM Configuration
set APKTOOL=%USERPROFILE%\apktool\apktool.jar
set APKSIGNER=%USERPROFILE%\android-sdk\build-tools\34.0.0\apksigner.jar
set KEYTOOL=keytool
set JAVA=java

REM Paths
set INPUT_APK=..\..\LAC_apktool
set MOD_MENU_SMALI=smali\com\lac\modmenu
set OUTPUT_APK=output\LAC_ModMenu.apk
set SIGNED_APK=output\LAC_ModMenu_Signed.apk
set ALIGNED_APK=output\LAC_ModMenu_Aligned.apk

REM Check Java
echo [1/8] Checking Java...
%JAVA% -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Java not found. Please install JDK 17+
    exit /b 1
)

REM Check apktool
echo [2/8] Checking apktool...
if not exist "%APKTOOL%" (
    echo [!] apktool.jar not found at %APKTOOL%
    echo     Download from: https://ibotpeaches.github.io/Apktool/
    exit /b 1
)

REM Create output directory
echo [3/8] Creating output directory...
if not exist output mkdir output

REM Copy smali files
echo [4/8] Injecting mod menu smali code...
xcopy /E /Y "%MOD_MENU_SMALI%" "%INPUT_APK%\smali_classes9\com\lac\modmenu\"

REM Modify AndroidManifest.xml
echo [5/8] Modifying AndroidManifest.xml...
powershell -Command "(Get-Content '%INPUT_APK%\AndroidManifest.xml') -replace 'com.unity3d.player.UnityPlayerActivity', 'com.lac.modmenu.ModMenuActivity' | Set-Content '%INPUT_APK%\AndroidManifest.xml'"

REM Add permission for overlay
powershell -Command "(Get-Content '%INPUT_APK%\AndroidManifest.xml') -replace '</manifest>', '    <uses-permission android:name=""android.permission.SYSTEM_ALERT_WINDOW""/>\n</manifest>' | Set-Content '%INPUT_APK%\AndroidManifest.xml'"

REM Build APK with apktool
echo [6/8] Building APK with apktool...
%JAVA% -jar "%APKTOOL%" b "%INPUT_APK%" -o "%OUTPUT_APK%"

if %errorlevel% neq 0 (
    echo [!] apktool build failed
    exit /b 1
)

REM Generate keystore if not exists
echo [7/8] Generating signing key...
if not exist "keystore\lac-modmenu.keystore" (
    if not exist keystore mkdir keystore
    %KEYTOOL% -genkey -v -keystore keystore\lac-modmenu.keystore -alias lac-modmenu -keyalg RSA -keysize 2048 -validity 10000 -storepass password -keypass password -dname "CN=LAC Mod Menu, OU=Security Test, O=LAC, L=Unknown, ST=Unknown, C=US"
)

REM Align APK
echo [8/8] Aligning and signing APK...
if exist "%USERPROFILE%\android-sdk\build-tools\34.0.0\zipalign.exe" (
    "%USERPROFILE%\android-sdk\build-tools\34.0.0\zipalign.exe" -f 4 "%OUTPUT_APK%" "%ALIGNED_APK%"
    set FINAL_APK=%ALIGNED_APK%
) else (
    set FINAL_APK=%OUTPUT_APK%
)

REM Sign APK
%JAVA% -jar "%APKSIGNER%" sign --ks keystore\lac-modmenu.keystore --ks-pass pass:password --key-pass pass:password --out "%SIGNED_APK%" "%FINAL_APK%"

if %errorlevel% neq 0 (
    echo [!] APK signing failed
    echo [*] Trying alternative signing method...
    jarsigner -keystore keystore\lac-modmenu.keystore -storepass password -keypass password "%FINAL_APK%" lac-modmenu
)

echo.
echo ========================================
echo   BUILD COMPLETE
echo ========================================
echo.
echo Output APK: %SIGNED_APK%
echo.
echo Install with:
echo   adb install %SIGNED_APK%
echo.
echo Or transfer to device and install manually.
echo.
