// Suggestion.tsx
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const Suggestion: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleGetSuggestion = async () => {
    try {
      const response = await fetch("http://localhost:3001/get-suggestion"); // Replace with your API URL
      const result = await response.json();
      if (response.ok) {
        setSuggestion(result.suggestion); // Assuming the API returns an object with a "suggestion" field
      } else {
        Alert.alert("Error", "Failed to fetch suggestion.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching the suggestion.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Suggestion" onPress={handleGetSuggestion} />
      {suggestion && <Text style={styles.suggestionText}>{suggestion}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  suggestionText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: "italic",
    color: "gray",
  },
});

export default Suggestion;
