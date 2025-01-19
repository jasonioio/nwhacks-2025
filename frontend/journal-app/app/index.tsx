import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import SubmissionForm from "./SubmissionForm";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const openForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);

  return (
    <View style={styles.container}>
      <Button title="Open Submission Form" onPress={openForm} />
      <SubmissionForm visible={isFormVisible} onClose={closeForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
