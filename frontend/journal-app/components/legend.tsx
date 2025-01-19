import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SENTIMENT_COLORS } from "@/constants/sentimentColors";

const Legend = () => {
  return (
    <View style={styles.container}>
      {Object.entries(SENTIMENT_COLORS).map(([sentiment, color]) => (
        <View key={sentiment} style={styles.legendContainer}>
          <View style={[styles.colorSwatch, { backgroundColor: color }]} />
          <Text style={styles.legendText}>{sentiment}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
  },
  legendContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colorSwatch: {
    width: 20,
    aspectRatio: 1,
  },
  legendText: {
    fontWeight: "bold",
  },
});

export default Legend;
