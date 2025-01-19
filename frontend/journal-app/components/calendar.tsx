import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { SENTIMENT_COLORS } from "@/constants/sentimentColors";

interface CalendarProps {
  onDateSelected: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelected }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Record<number, { sentiment: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMonth();
  }, [currentDate]);

  async function fetchMonth() {
    setLoading(true);
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const monthParam = String(monthIndex + 1).padStart(2, "0");
    try {
      const response = await fetch(
        `http://10.19.129.35:3001/retrieve_month?year=${year}&month=${monthParam}`
      );
      const data = await response.json();
      const map: Record<number, { sentiment: string }> = {};
      if (data.entries && typeof data.entries === "object") {
        for (const [dayString, sentiment] of Object.entries(data.entries)) {
          const dayInt = parseInt(dayString, 10);
          map[dayInt] = { sentiment: sentiment as string };
        }
      }
      setMonthData(map);
    } catch {
      setMonthData({});
    } finally {
      setLoading(false);
    }
  }

  function handlePreviousMonth() {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  }

  function handleNextMonth() {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  }

  function handleDayPress(day: number) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelected(dateString);
  }

  function renderDay(day: number | null, index: string) {
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
    const backgroundColor = sentiment ? SENTIMENT_COLORS[sentiment] ?? "lightgrey" : "lightgrey";
    return (
      <TouchableOpacity
        key={index}
        style={[styles.day, { backgroundColor, borderColor: backgroundColor }]}
        onPress={() => handleDayPress(day)}
      >
        <Text>{day}</Text>
      </TouchableOpacity>
    );
  }

  function renderWeekday(day: string) {
    return (
      <View
        key={day}
        style={[styles.day, { backgroundColor: "transparent", borderColor: "transparent" }]}
      >
        <Text style = {styles.weekdays}>{day}</Text>
      </View>
    );
  }

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
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
  }

  return (
    <>
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
          <Text style = {styles.legendText}>Loading...</Text>
        </View>
      ) : (
        renderCalendar()
      )}
    </View>
    <View style={styles.legendContainer}>
          {Object.entries(SENTIMENT_COLORS).map(([sentiment, color]) => (
            <View key={sentiment} style={styles.sentimentContainer}>
              <View style={[styles.colorSwatch, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{sentiment}</Text>
            </View>
          ))}
        </View>  
    <View style = {styles.hr}></View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#2D293D",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    color: 'white'
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
    color: 'white'
  },
  weekdays: {
    color: 'white',
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
  legendContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5%",
    backgroundColor: '#001',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 15,
  },
  sentimentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colorSwatch: {
    width: 20,
    aspectRatio: 1,
  },
  legendText: {
    fontWeight: "bold",
    color: 'white',
    fontSize: 12,
  },
  hr: {
    width: '100%',
    borderColor: '#666666',
    borderWidth: 0.5,
    borderStyle: 'solid',
    marginHorizontal: 'auto',
    marginTop: 20
  }
});

export default Calendar;
