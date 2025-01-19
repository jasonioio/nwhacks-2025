import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { styles } from "./SubmissionForm.styles";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  handleRender?: (param: boolean) => void; // now optional
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  visible,
  onClose,
  date,
  handleRender,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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
        if (handleRender) handleRender(true);
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
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.loadingText}>Submitting...</Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Type your text here..."
                placeholderTextColor="#777"
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

export default SubmissionForm;
