import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
  date: string; // Received from the parent (e.g., today's date or user-chosen date)
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ visible, onClose, date }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (visible && date) {
      fetch(`http://localhost:3001/retrieve?date=${date}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.entry) setText(data.entry);
          else setText("");
        })
        .catch(() => Alert.alert("Error", "Failed to retrieve entry"));
    }
  }, [visible, date]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert("Validation Error", "Text input cannot be empty");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, text }),
      });
      if (response.ok) {
        Alert.alert("Success", "Entry submitted");
        setText("");
        onClose();
      } else {
        Alert.alert("Error", "Submission failed");
      }
    } catch {
      Alert.alert("Error", "An error occurred during submission");
    }
  };

  const handleClose = () => {
    setText("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your text here..."
            value={text}
            onChangeText={setText}
            multiline
          />
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Cancel" color="red" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: Dimensions.get("window").height * 0.4,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    elevation: 5,
    position: "relative",
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SubmissionForm;
