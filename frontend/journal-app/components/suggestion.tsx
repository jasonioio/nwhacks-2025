import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface SuggestionProps {
  data: string;
}

export default function Suggestion({ data }: SuggestionProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!data) {
      setTypedText("");
      return;
    }

    const cleanString = data.replace(/^\s+/, "").replace(/\s+$/, "");
    let typedSoFar = "";
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      if (i < cleanString.length) {
        typedSoFar += cleanString[i];
        setTypedText(typedSoFar);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.suggestionText}>
        {typedText || "No suggestion data found"}
      </Text>
    </View>
  );
}

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
