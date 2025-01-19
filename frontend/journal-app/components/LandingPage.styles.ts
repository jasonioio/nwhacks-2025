import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  landingBackground: {
    width: "100%", // Ensure it fills the entire width of the screen
    height: "100%", // Ensure it fills the entire height of the screen
    position: "absolute", // Position it behind the overlay
  },
  landingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position it above the background
    width: "100%", // Ensure it fills the entire screen
    height: "100%", // Ensure it fills the entire screen
    transform: [{ translateY: -200 }],
  },
  landingTitle: {
    fontSize: 48,
    fontWeight: "bold",
    fontFamily: "Verve",
    color: "#F1F0E8",
  },
  landingButton: {
    backgroundColor: "#E5E1DA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  landingButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
