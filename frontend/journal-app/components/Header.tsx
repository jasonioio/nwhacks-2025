import React from "react";
import { View, Text } from "react-native";
import { styles } from "./Header.styles";

const Header = () => {
  const date = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let affix;
  switch (date.getDate() % 10) {
    case 1:
      affix = "st";
      break;
    case 2:
      affix = "nd";
      break;
    case 3:
      affix = "rd";
      break;
    default:
      affix = "th";
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {monthNames[date.getMonth()]} {date.getDate()}
        {affix}, {date.getFullYear()}
      </Text>
    </View>
  );
};

export default Header;
