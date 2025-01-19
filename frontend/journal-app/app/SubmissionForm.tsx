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


  function parseNumString(num: string) {
    return Number.parseInt(num) < 10 ? num[1] : num;
  }

  const monthNum = parseNumString(date.split('-')[1]);
  const dayNum = parseNumString(date.split('-')[2])

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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <>
              <Text style = {styles.date}>{monthNum}/{dayNum}</Text>
              <View style = {styles.inputContainer}>
                <Text style = {styles.prompt}>What happened today?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type your text here..."
                  value={text}
                  onChangeText={setText}
                  multiline
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style = {styles.submit} onPress={handleSubmit}>
                    <Text style = {styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style = {styles.cancel} onPress={handleClose}>
                    <Text style = {styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",

  },
  modalContainer: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "#2D293D",
    padding: 20,
    paddingVertical: 70,
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
    marginVertical : 20,
    flexGrow: 1
  },
  date: {
    color: 'white',
    fontSize: 100,
    fontFamily: 'Abril Fatface'
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
  buttonText: {
    fontWeight: 'bold'
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
  buttonContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: '5%',
  },
  inputContainer: {
    height: '80%',
  },
  submit: {
    backgroundColor: '#A7F0B3',
    flexGrow: 1,
    padding: 10,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4
  },
  cancel: {
    backgroundColor: '#E5B2B2',
    flexGrow: 1,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    fontWeight: 'bold'
  },
  prompt: {
    color: 'white',
    fontFamily: 'Abril Fatface',
    fontSize: 30,
    paddingVertical: 5
  }
});

export default SubmissionForm;
