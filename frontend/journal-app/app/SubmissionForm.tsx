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
  ActivityIndicator,
} from "react-native";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  visible,
  onClose,
  date,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && date) {
      setLoading(true);
      fetch(`http://10.19.129.35:3001/retrieve?date=${date}`)
        .then((res) => res.json())
        .then((data) => setText(data?.entry || ""))
        .catch(() => Alert.alert("Error", "Failed to retrieve entry"))
        .finally(() => setLoading(false));
    }
  }, [visible, date]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert("Validation Error", "Text input cannot be empty");
      return;
    }
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
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Loading...</Text>
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
              <View style={styles.cancel}>
                <Button title="Cancel" color="red" onPress={handleClose} />
              </View>
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
    height: Dimensions.get("window").height * 0.8,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    elevation: 5,
    position: "relative",
  },
  input: {
    height: 400,
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
    top: 12,
    right: 12,
    backgroundColor: "red",
    width: 25,
    height: 25,
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
  cancel: {
    marginTop: 5,
  },
});

export default SubmissionForm;
