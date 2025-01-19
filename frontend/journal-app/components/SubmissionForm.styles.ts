import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    height: "50%",
    backgroundColor: "#E5E1DA",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF5B5B",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#000",
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    minHeight: "85%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    color: "#000",
    fontFamily: "Evergarden",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
