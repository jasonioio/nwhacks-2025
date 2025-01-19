import Calendar from "@/components/calendar";
import { Text, View, Button } from "react-native";
import SubmissionForm from "./SubmissionForm";
import { useState } from "react";
import Suggestion from "@/components/suggestion";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState<boolean>(false);

  // Toggle visibility for Submission Form
  const openForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);

  // Toggle visibility for Suggestion Component
  const toggleSuggestion = () => setSuggestionVisible((prev) => !prev);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        paddingVertical: 30,
        backgroundColor: "white",
      }}
    >
      {/* Calendar */}
      <Calendar />

      {/* Button to toggle Submission Form */}
      <Button title="Open Submission Form" onPress={openForm} />
      <SubmissionForm visible={isFormVisible} onClose={closeForm} />

      {/* Button to toggle Suggestion Component */}
      <Button
        title={isSuggestionVisible ? "Hide Suggestion" : "Show Suggestion"}
        onPress={toggleSuggestion}
      />

      {/* Conditionally Render Suggestion */}
      {isSuggestionVisible && <Suggestion />}
    </View>
  );
}
