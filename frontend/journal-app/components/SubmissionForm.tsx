import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SubmissionForm.styles";

interface SubmissionFormProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  handleRender?: (param: boolean) => void;
}

export default function SubmissionForm({
  visible,
  onClose,
  date,
  handleRender,
}: SubmissionFormProps) {
  const [text, setText] = useState("");
  const [loadingText, setLoadingText] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible || !date) return;
    setLoadingText(true);
    setText("");

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    (async () => {
      try {
        const res = await fetch(
          `http://10.19.129.35:3001/retrieve?date=${date}`
        );
        const data = await res.json();
        setText(data.entry || "");
      } catch {
        Alert.alert("Error", "Failed to load existing entry");
      } finally {
        setLoadingText(false);
      }
    })();
  }, [visible, date, fadeAnim]);

  function handleClose() {
    setText("");
    setLoadingText(false);
    setSubmitting(false);
    fadeAnim.setValue(0);
    onClose();
  }

  async function handleSubmit() {
    if (!text.trim()) {
      Alert.alert("Validation Error", "Text input cannot be empty");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("http://10.19.129.35:3001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, text }),
      });
      if (response.ok) {
        Alert.alert("Success", "Entry submitted");
        handleClose();
        if (handleRender) handleRender(true);
      } else {
        Alert.alert("Error", "Submission failed");
      }
    } catch {
      Alert.alert("Error", "Submission request failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!visible) return null;

  const isLoading = loadingText || submitting;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="#F1F0E8" />
          </TouchableOpacity>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#89A8B2" />
              <Text style={styles.loadingText}>
                {loadingText ? "Loading entry..." : "Submitting..."}
              </Text>
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
              <View style={styles.buttonRow}>
                <Button title="Submit" onPress={handleSubmit} color="#B3C8CF" />
                <Button title="Cancel" onPress={handleClose} color="#FF5B5B" />
              </View>
            </>
          )}
        </View>
      </Animated.View>
    </Modal>
  );
}
