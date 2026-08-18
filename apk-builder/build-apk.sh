#!/bin/bash
# ========================================
#  LAC Mod Menu APK Builder (Linux)
#  For GitHub Actions / Linux systems
# ========================================

set -e

echo "========================================"
echo "  LAC Mod Menu APK Builder v1.0"
echo "========================================"

# Configuration
APK_DIR="../LAC_apktool"
OUTPUT_DIR="output"
SMALI_DIR="smali/com/lac/modmenu"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Copy smali files
echo "[1/5] Injecting mod menu smali code..."
mkdir -p "$APK_DIR/smali_classes9/com/lac/modmenu/"
cp -r "$SMALI_DIR"/* "$APK_DIR/smali_classes9/com/lac/modmenu/"

# Modify AndroidManifest.xml
echo "[2/5] Modifying AndroidManifest.xml..."
sed -i 's/com.unity3d.player.UnityPlayerActivity/com.lac.modmenu.ModMenuActivity/g' "$APK_DIR/AndroidManifest.xml"
sed -i 's/<\/manifest>/    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"\/>\n<\/manifest>/g' "$APK_DIR/AndroidManifest.xml"

# Build with apktool
echo "[3/5] Building APK with apktool..."
apktool b "$APK_DIR" -o "$OUTPUT_DIR/LAC_ModMenu.apk"

# Generate keystore if not exists
echo "[4/5] Generating signing key..."
mkdir -p keystore
if [ ! -f "keystore/release.keystore" ]; then
    keytool -genkey -v \
        -keystore keystore/release.keystore \
        -alias lac-modmenu \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass password \
        -keypass password \
        -dname "CN=LAC Mod Menu, OU=Security Test, O=LAC, L=Unknown, ST=Unknown, C=US"
fi

# Sign APK
echo "[5/5] Signing APK..."
zipalign -f 4 "$OUTPUT_DIR/LAC_ModMenu.apk" "$OUTPUT_DIR/LAC_ModMenu_Aligned.apk"
apksigner sign \
    --ks keystore/release.keystore \
    --ks-pass pass:password \
    --key-pass pass:password \
    --out "$OUTPUT_DIR/LAC_ModMenu_Signed.apk" \
    "$OUTPUT_DIR/LAC_ModMenu_Aligned.apk"

echo ""
echo "========================================"
echo "  BUILD COMPLETE"
echo "========================================"
echo ""
echo "Output APK: $OUTPUT_DIR/LAC_ModMenu_Signed.apk"
echo ""
echo "Install with:"
echo "  adb install $OUTPUT_DIR/LAC_ModMenu_Signed.apk"
echo ""
