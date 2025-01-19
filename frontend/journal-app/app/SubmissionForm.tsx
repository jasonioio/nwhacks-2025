import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  visible,
  onClose,
}) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert("Validation Error", "Text input cannot be empty!");
      return;
    }

    try {
      console.log(text);
      // POST request to analyze sentiment
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Send the text to the /analyze endpoint
      });

      const result = await response.json();

      if (response.ok) {
        // Display sentiment analysis result
        Alert.alert("Sentiment Analysis", `Sentiment: ${result.sentiment}`);
        setText(""); // Clear the input field
        onClose(); // Close the modal
      } else {
        Alert.alert("Error", "Failed to analyze sentiment.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while analyzing the sentiment.");
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose} // Handles back button press on Android
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your text here..."
            value={text}
            onChangeText={setText}
            multiline
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" color="red" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: Dimensions.get("window").height * 0.4, // 40% of the view height
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    elevation: 5,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
});

export default SubmissionForm;
