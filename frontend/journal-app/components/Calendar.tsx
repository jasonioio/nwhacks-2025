import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Calendar.styles";
import { SENTIMENT_COLORS } from "@/constants/sentimentColors";

interface CalendarProps {
  onDateSelected: (date: string) => void;
}

export default function Calendar({ onDateSelected }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<Record<number, { sentiment: string }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchMonth();
    })();
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
        <View
          key={index}
          style={[styles.day, { backgroundColor: "transparent", borderColor: "transparent" }]}
        />
      );
    }
    const sentiment = monthData[day]?.sentiment;
    const backgroundColor = sentiment ? SENTIMENT_COLORS[sentiment] : "lightgrey";
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
        <Text>{day}</Text>
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
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePreviousMonth}>
          <Ionicons name="chevron-back" size={24} color="#89A8B2" />
        </TouchableOpacity>

        <Text style={styles.header}>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </Text>

        <TouchableOpacity style={styles.arrowButton} onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#89A8B2" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#89A8B2" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        renderCalendar()
      )}
    </View>
  );
}
