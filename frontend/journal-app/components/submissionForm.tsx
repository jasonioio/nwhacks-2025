import React, { useState } from "react";
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
  ActivityIndicator,
} from "react-native";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  handleRender: (param: boolean) => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  visible,
  onClose,
  date,
  handleRender,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onRender = () => {
    handleRender(true);
  };

  async function handleSubmit() {
    if (!text.trim()) {
      Alert.alert("Validation Error", "Text input cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://10.19.129.35:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, text }),
      });
      if (response.ok) {
        Alert.alert("Success", "Entry submitted");
        setText("");
        onClose();
        onRender();
      } else {
        Alert.alert("Error", "Submission failed");
      }
    } catch {
      Alert.alert("Error", "Submission request failed");
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setText("");
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#34a899" />
              <Text style={styles.loadingText}>Submitting...</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Type your text here..."
                value={text}
                onChangeText={setText}
                multiline
              />
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Cancel" color="red" onPress={handleClose} />
            </>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
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
