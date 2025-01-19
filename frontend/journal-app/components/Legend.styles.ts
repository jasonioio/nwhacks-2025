import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  legendContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 5,
  },
  legendText: {
    fontWeight: "bold",
    fontSize: 14,
  },
});
