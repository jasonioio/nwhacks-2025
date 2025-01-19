import { StyleSheet, Dimensions } from "react-native";

/*
Palette:
BG:       #89A8B2
Accent1:  #B3C8CF
Accent2:  #E5E1DA
WhiteTxt: #F1F0E8
*/

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#89A8B2", // Main background color
  },
  navBar: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#B3C8CF", // Accent1
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  navBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F1F0E8", // White text
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#F1F0E8",
  },
  suggestionContainer: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#E5E1DA", // Accent2
    width: width * 0.8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  roundedButton: {
    backgroundColor: "#E5E1DA", // Accent2
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
  roundedButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
