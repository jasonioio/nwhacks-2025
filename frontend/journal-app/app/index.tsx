import Calendar from "@/components/calendar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Welcome */}
      <Calendar />
      {/* new entry */}
      {/* past entry?? */}
    </View>
  );
}
