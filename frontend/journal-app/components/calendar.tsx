import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

interface CalendarProps {
  onDateSelected: (date: string) => void;
}

const sentimentColors: Record<string, string> = {
  Joyful: "#FDE2E4",
  Sad: "#CCD5FF",
  Productive: "#BFE2CA",
  Tired: "#FDFDC4",
  Okay: "#D3E0EA",
  Angry: "#FFD1D1",
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelected }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Record<number, { sentiment: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchDataForMonth(currentDate.getFullYear(), currentDate.getMonth());
    })();
  }, [currentDate]);

  const fetchDataForMonth = async (year: number, month: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.19.129.35:3001/retrieve_month?year=${year}&month=${String(month + 1).padStart(2, "0")}`
      );
      const data = await response.json();
      const map: Record<number, { sentiment: string }> = {};
      data.entries?.forEach((doc: any) => {
        map[doc.day] = { sentiment: doc.sentiment };
      });
      setMonthData(map);
    } catch {
      setMonthData({});
    } finally {
      setLoading(false);
    }
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
    if (day === null) {
      return (
        <TouchableOpacity
          key={index}
          style={[styles.day, { backgroundColor: "transparent", borderColor: "transparent" }]}
        >
          <Text />
        </TouchableOpacity>
      );
    }
    const sentiment = monthData[day]?.sentiment;
    const backgroundColor = sentiment ? sentimentColors[sentiment] || "lightgrey" : "lightgrey";
    return (
      <TouchableOpacity
        key={index}
        style={[styles.day, { backgroundColor, borderColor: backgroundColor }]}
        onPress={() => handleDayPress(day)}
      >
        <Text>{day}</Text>
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34a899" />
          <Text>Loading...</Text>
        </View>
      ) : (
        renderCalendar()
      )}
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
  loadingContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Calendar;
