import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
  },
  titleContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  calendarContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  loadingButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
  suggestionContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});
