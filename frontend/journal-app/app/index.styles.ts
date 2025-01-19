import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

/*
Palette:
BG:       #89A8B2
Accent1:  #B3C8CF
Accent2:  #E5E1DA
WhiteTxt: #F1F0E8
*/

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#89A8B2",
  },
  navBar: {
    width: "100%",
    paddingTop: 8,
    backgroundColor: "#B3C8CF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  mainContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  dayLogoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dayText: {
    fontSize: 18,
    color: "#F1F0E8",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginTop: -14,
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
    backgroundColor: "#E5E1DA",
    width: width * 0.8,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  roundedButton: {
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
  roundedButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
