import React, { useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import Calendar from "@/components/calendar";
import { Text, View } from "react-native";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [lifestyleAdvice, setLifestyleAdvice] = useState<string | null>(null);

  async function fetchLifestyleAdvice() {
    if (lifestyleAdvice) return;
    try {
      const response = await fetch("http://10.19.129.35:3001/lifestyle");
      const data = await response.json();
      setLifestyleAdvice(data.advice);
    } catch {
      setLifestyleAdvice("No data available");
    }
  }

  function onDateSelected(date: string) {
    setSelectedDate(date);
    setFormVisible(true);
  }

  function closeForm() {
    setFormVisible(false);
  }

  async function toggleSuggestion() {
    if (!isSuggestionVisible) {
      await fetchLifestyleAdvice();
    }
    setSuggestionVisible(!isSuggestionVisible);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Welcome */}
      <Calendar />
      {/* new entry */}
      {/* past entry?? */}
    </View>
  );
}
