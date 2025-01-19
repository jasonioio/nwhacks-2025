import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Verve: require("../assets/fonts/Verve.ttf"),
    Evergarden: require("../assets/fonts/Evergarden-YzaLy.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Slot />;
}
