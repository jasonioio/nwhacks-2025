import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Calendar from "@/components/calendar";
import SubmissionForm from "@/components/submissionForm";
import Suggestion from "@/components/suggestion";
import Header from "@/components/header";
import Legend from "@/components/legend";
import { styles } from "./index.styles";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [lifestyleAdvice, setLifestyleAdvice] = useState<string | null>(null);
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  async function fetchLifestyleAdvice() {
    if (lifestyleAdvice) return;
    setIsFetchingAdvice(true);
    try {
      const response = await fetch("http://10.19.129.35:3001/lifestyle");
      const data = await response.json();
      setLifestyleAdvice(data.advice);
    } catch {
      setLifestyleAdvice("No data available");
    } finally {
      setIsFetchingAdvice(false);
    }
  }

  const onDateSelected = (date: string) => {
    setSelectedDate(date);
    setFormVisible(true);
  };

  function closeForm() {
    setFormVisible(false);
  }

  async function toggleSuggestion() {
    if (!isSuggestionVisible && !lifestyleAdvice) {
      await fetchLifestyleAdvice();
    }
    setSuggestionVisible(!isSuggestionVisible);
  }

  useEffect(() => {
    if (isSuggestionVisible && lifestyleAdvice) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 300);
    }
  }, [isSuggestionVisible, lifestyleAdvice]);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer} ref={scrollViewRef}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ThoughtStream 📖</Text>
      </View>

      <Header />

      <View style={styles.calendarContainer}>
        <Calendar onDateSelected={onDateSelected} />
      </View>

      <Legend />

      <View style={styles.buttonContainer}>
        {isFetchingAdvice ? (
          <View style={styles.loadingButtonContainer}>
            <ActivityIndicator size="large" color="#34a899" />
            <Text style={styles.loadingText}>Loading suggestion...</Text>
          </View>
        ) : (
          <Button
            title={isSuggestionVisible ? "Hide Suggestion" : "View Suggestion"}
            onPress={toggleSuggestion}
          />
        )}
      </View>

      {isSuggestionVisible && lifestyleAdvice && (
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
