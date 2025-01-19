import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Legend.styles";
import { SENTIMENT_COLORS } from "@/constants/sentimentColors";

export default function Legend() {
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
}
