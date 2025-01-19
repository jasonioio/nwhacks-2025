import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Verve: require("../assets/fonts/Verve.ttf"),
    Patrick: require("../assets/fonts/PatrickHand-Regular.ttf"),
  });

  // Prevent splash screen from hiding until fonts are loaded
  React.useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync(); // Keep splash screen visible
    } else {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Optionally return a custom loading screen while fonts are loading
  }

  return <Slot />;
}
