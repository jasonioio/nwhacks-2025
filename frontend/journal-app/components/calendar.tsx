import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";

interface CalendarProps {
  onDateSelected: (date: string) => void;
}

const fetchMonthData = async (year: number, month: number) => {
  const exampleData = {
    1: { sentiment: -1 },
    5: { sentiment: 1 },
    10: { sentiment: 0 },
  };
  return new Promise((resolve) => setTimeout(() => resolve(exampleData), 500));
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelected }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Record<number, { sentiment: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataForMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const fetchDataForMonth = async (year: number, month: number) => {
    setLoading(true);
    const data: any = await fetchMonthData(year, month);
    setMonthData(data);
    setLoading(false);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayNameInMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const handleDayPress = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelected(dateString);
  };

  const renderDay = (day: number | null, index: string) => {
    const sentiment = day !== null ? monthData[day]?.sentiment : null;
    let backgroundColor = "#ccc";
    let borderColor = "#ccc";
    if (sentiment === -1) backgroundColor = "#ffcccc";
    if (sentiment === 0) backgroundColor = "#ffffcc";
    if (sentiment === 1) backgroundColor = "#ccffcc";
    if (day === null) {
      backgroundColor = "transparent";
      borderColor = "transparent";
    }

    return (
      <TouchableOpacity
        key={index}
        style={[styles.day, { backgroundColor, borderColor }]}
        onPress={() => day && handleDayPress(day)}
      >
        <Text>{day || ""}</Text>
      </TouchableOpacity>
    );
  };

  const renderWeekday = (day: string) => (
    <View
      key={day}
      style={[styles.day, { backgroundColor: "transparent", borderColor: "transparent" }]}
    >
      <Text>{day}</Text>
    </View>
  );

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayNameInMonth(year, month);
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let nullCount = 0;

    dayNames.forEach((dayName) => days.push(renderWeekday(dayName)));
    for (let i = 1; i <= firstDay; i++) {
      days.push(renderDay(null, "null" + nullCount));
      nullCount++;
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(renderDay(i, i.toString()));
    }
    const endPadding = 7 - (days.length % 7);
    if (endPadding < 7) {
      for (let i = 1; i <= endPadding; i++) {
        days.push(renderDay(null, "null" + nullCount));
        nullCount++;
      }
    }
    return <View style={styles.calendarGrid}>{days}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button color="#34a899" title="Prev" onPress={handlePreviousMonth} />
        <Text style={styles.header}>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </Text>
        <Button color="#34a899" title="Next" onPress={handleNextMonth} />
      </View>
      {loading ? <Text>Loading...</Text> : renderCalendar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  day: {
    width: "13%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default Calendar;
