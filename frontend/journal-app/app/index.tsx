import Calendar from "@/components/calendar";
import PastEntries from "@/components/pastentries";
import Welcome from "@/components/welcome";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        height: '100%',
        paddingVertical: 30,
        backgroundColor: 'white',
      }}
    >
      <Welcome />
      <Calendar />
    </View>
  );
}
