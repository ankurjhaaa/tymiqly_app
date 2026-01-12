import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Splash from "expo-splash-screen";

import SplashScreen from "./SplashScreen"; // 👈 custom animated splash

// ⛔ Prevent native splash from auto hiding
Splash.preventAutoHideAsync();

export default function App() {
  const webViewRef = useRef(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  // 🧩 ASK ALL PERMISSIONS (Camera + Location)
  const askPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      if (cameraStatus !== "granted") {
        Alert.alert(
          "Camera Access Denied",
          "Camera is needed for QR scan or photo upload."
        );
      }

      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      if (locationStatus !== "granted") {
        Alert.alert(
          "Location Access Denied",
          "Location is needed for attendance tracking."
        );
      }
    } catch (error) {
      console.log("Permission Error:", error);
    }
  };

  // 🔁 PERMISSIONS ON START
  useEffect(() => {
    askPermissions();
  }, []);

  // 🔙 ANDROID BACK BUTTON HANDLER
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  // ✅ HIDE NATIVE SPLASH AFTER CUSTOM SPLASH
  useEffect(() => {
    if (!showSplash) {
      Splash.hideAsync();
    }
  }, [showSplash]);

  // 🌊 SHOW CUSTOM SPLASH FIRST
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
    
      {/* 🌐 TYMIQLY WEBVIEW */}
      <WebView
        ref={webViewRef}
        source={{ uri: "https://tymiqly.com" }}
        userAgent="TymiqlyAppWebView"
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        geolocationEnabled
        startInLoadingState
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(nav) => setCanGoBack(nav.canGoBack)}
        mixedContentMode="always"
        originWhitelist={["*"]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  
});
