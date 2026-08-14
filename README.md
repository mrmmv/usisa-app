# USISA Android Application 🍊📱

This directory (`android app`) contains the standalone Android Application layout for the **USISA AI Vision 360° Smart Plant Diagnostic & Precision Agronomy System**.

---

## 🌟 Key Features of the Android App

- **Native Android UI / Material 3 Design System**:
  - Top Android Status Bar (Time, Wi-Fi, 5G, Battery).
  - Android App Bar with quick actions & farmer profile initials chip.
  - Mobile Bottom Navigation Bar (`Scan`, `Agronomy`, `Presets`, `Settings`).
  - Floating Action Button (FAB) for 1-Touch 360° Automated Scan & Gemini AI Analysis.
  - Touch-optimized Material Cards with glassmorphic depth & smooth animations.
  - Horizontal Weather Scroll Strip.
- **360° Motorized Camera Rig Control**:
  - Interactive 3D WebGL Turntable model with touch drag & angle controls (0° North, 90° East, 180° South, 270° West).
- **4-Angle Quadrant Capture & Photo Uploads**:
  - Touch-friendly 2x2 grid viewer for foliage, fruit cluster, underbelly, and new shoots.
- **Google Gemini AI Diagnostic Report**:
  - Radial Plant Health score ring gauge.
  - Instant disease classification (Citrus Canker, Chlorosis, Fruit Scab & Scale).
- **Organic Calamansi Agronomy Guide**:
  - 100% free DIY home remedies (Coffee grounds, Eggshell calcium tea, Banana peel potassium extract).
  - Real-time weather-synced rainfall spray delay advisory & irrigation recommendations.
- **Firebase Authentication & Cloud Sync**:
  - Email/Password Sign in, Sign up, Profile sync & Firestore cloud scan history storage.
- **Bilingual Localization**:
  - Instant 1-tap toggle between **English 🇬🇧** and **Filipino 🇵🇭**.

---

## 🚀 Running the Android App Locally

### 1. Install Dependencies
Navigate into the `android app` folder and install dependencies:
```bash
cd "android app"
npm install
```

### 2. Start Local Mobile Server
Run the Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5174` (or scan the local network IP on your mobile phone connected to the same Wi-Fi).

---

## 📱 Building a Physical Android APK (Capacitor Integration)

To package this app into a native Android `.apk` file for installation on Android smartphones:

1. **Install Capacitor CLI**:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```

2. **Initialize Capacitor**:
   ```bash
   npx cap init "USISA Citrus AI" "com.usisa.citrusapp" --web-dir dist
   ```

3. **Build the Production Web Assets**:
   ```bash
   npm run build
   ```

4. **Add Android Platform & Sync**:
   ```bash
   npx cap add android
   npx cap sync
   ```

5. **Open in Android Studio & Generate APK**:
   ```bash
   npx cap open android
   ```
   In Android Studio, select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to get your `.apk` installer file!

---

&copy; 2026 USISA AI Vision Project. All rights reserved.
