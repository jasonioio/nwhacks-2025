import React, { useState } from "react";
import { Text, View, Button, StyleSheet, ScrollView } from "react-native";
import Calendar from "@/components/calendar";
import SubmissionForm from "./SubmissionForm";
import Suggestion from "@/components/suggestion";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const onDateSelected = (date: string) => {
    setSelectedDate(date);
    setFormVisible(true);
  };

  const closeForm = () => setFormVisible(false);

  const toggleSuggestion = () => setSuggestionVisible((prev) => !prev);

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      {/* Custom Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>ThoughtStream 📖</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar onDateSelected={onDateSelected} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={isSuggestionVisible ? "Hide Suggestion" : "View Suggestion"}
          onPress={toggleSuggestion}
        />
      </View>

      {isSuggestionVisible && (
        <View style={styles.suggestionContainer}>
          <Suggestion />
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

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
  },
  titleContainer: {
    marginBottom: 25, // Space between the title and the calendar
    alignItems: "center", // Center the title
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // You can change the color as needed
  },
  calendarContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  suggestionContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    width: "80%",
    alignSelf: "center",
  },
});
