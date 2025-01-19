import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./Suggestion.styles";

interface SuggestionProps {
  data: string;
  scrollViewRef: React.RefObject<ScrollView>;
}

export default function Suggestion({ data, scrollViewRef }: SuggestionProps) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!data) {
      setTypedText("");
      return;
    }
    const cleanString = data.trim();
    let typedSoFar = "";
    let i = 0;
    setTypedText("");

    const interval = setInterval(() => {
      if (i < cleanString.length) {
        typedSoFar += cleanString[i];
        setTypedText(typedSoFar);
        i++;

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 50);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [data, scrollViewRef]);

  return (
    <View style={styles.container}>
      <Text style={styles.suggestionText}>
        {typedText || "No suggestion data found"}
      </Text>
    </View>
  );
}
