import React, { useState, useRef } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import Calendar from "@/components/calendar";
import SubmissionForm from "./SubmissionForm";
import Suggestion from "@/components/suggestion";
import Header from "@/components/header";
import Legend from "@/components/legend";
import { styles } from "./index.styles";

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

  // Ref to the ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  const onDateSelected = (date: string) => {
    setSelectedDate(date);
    setFormVisible(true);
  };

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
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ThoughtStream 📖</Text>
      </View>

      <Header />

      <View style={styles.calendarContainer}>
        <Calendar onDateSelected={onDateSelected} />
      </View>

      <Legend />

      <View style={styles.buttonContainer}>
        <Button
          title={isSuggestionVisible ? "Hide Suggestion" : "View Suggestion"}
          onPress={toggleSuggestion}
        />
      </View>

      {isSuggestionVisible && (
        <View style={styles.suggestionContainer}>
          <Suggestion data={lifestyleAdvice} />
        </View>
      )}

      <SubmissionForm
        visible={isFormVisible}
        onClose={closeForm}
        date={selectedDate}
      />
    </ScrollView>
  );
}
