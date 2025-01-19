import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./LandingPage.styles";

export default function LandingPage({
  onGetStarted,
}: {
  onGetStarted: () => void;
}) {
  return (
    <View style={styles.landingContainer}>
      <ImageBackground
        source={require("../assets/landing.gif")}
        style={styles.landingBackground}
        resizeMode="cover"
      >
        <View style={styles.landingOverlay}>
          <Text style={styles.landingTitle}>BrightPath</Text>
          <TouchableOpacity style={styles.landingButton} onPress={onGetStarted}>
            <Text style={styles.landingButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
