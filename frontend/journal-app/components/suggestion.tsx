import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const Suggestion: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        // Simulating the API response with a hardcoded suggestion for now
        const suggestionText =
          "Based on your activity in the last 30 days, you should go outside and get some fresh air";
        setSuggestion(suggestionText); // Set suggestion immediately
      } catch (error) {
        Alert.alert(
          "Error",
          "An error occurred while fetching the suggestion."
        );
        console.error(error);
      }
    };

    if (!suggestion) {
      fetchSuggestion(); // Fetch the suggestion only if it's not already set
    }
  }, [suggestion]);

  return (
    <View style={styles.container}>
      {suggestion && <Text style={styles.suggestionText}>{suggestion}</Text>}
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
