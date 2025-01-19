import Calendar from "@/components/calendar";
import { Text, View } from "react-native";
import Header from "@/components/header";
import Legend from "@/components/legend";

export default function Index() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: "center",
        backgroundColor: 'white',
        padding: '5%',
        gap: '5%'
      }}
    >
      <Header/>
      <Calendar />
      <Legend />
    </View>
  );
}
