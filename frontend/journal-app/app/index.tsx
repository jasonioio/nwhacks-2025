import React, { useState } from "react";
import { Text, View, Button } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center", paddingVertical: 30, backgroundColor: "white" }}>
      <Calendar onDateSelected={onDateSelected} />
      <Button title="Show Suggestion" onPress={toggleSuggestion} />
      {isSuggestionVisible && <Suggestion />}
      <SubmissionForm visible={isFormVisible} onClose={closeForm} date={selectedDate} />
    </View>
  );
}
