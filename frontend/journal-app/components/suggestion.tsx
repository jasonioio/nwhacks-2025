import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SuggestionProps {
  data: string | null;
}

const Suggestion: React.FC<SuggestionProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.suggestionText}>
        {data ?? "No suggestion data found"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  suggestionText: {
    margin: 20,
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
    textAlign: "center",
  },
});

export default Suggestion;
