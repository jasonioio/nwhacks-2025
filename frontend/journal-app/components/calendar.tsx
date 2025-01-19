import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

// Example data fetching function
const fetchMonthData = async (year: number, month: number) => {
  // Simulated data with sentiment values (-1: negative, 0: neutral, 1: positive)
  const exampleData = {
    1: { sentiment: -1 }, // Day 1
    5: { sentiment: 1 },  // Day 5
    10: { sentiment: 0 }, // Day 10
    // Add data for other days as needed
  };
  return new Promise((resolve) => setTimeout(() => resolve(exampleData), 500));
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<{ [key: number]: { sentiment: number } }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data for the current month when the component mounts or currentDate changes
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
  }

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };

  const renderDay = (day: number | null) => {
    const sentiment = day !== null ? monthData[day]?.sentiment : null;
    let backgroundColor = '#ccc'; // Default color for days without sentiment data

    if (sentiment === -1) backgroundColor = '#ffcccc'; // Negative: red
    if (sentiment === 0) backgroundColor = '#ffffcc'; // Neutral: yellow
    if (sentiment === 1) backgroundColor = '#ccffcc'; // Positive: green
    if (day === null) backgroundColor = 'transparent'; // Empty day

    return (
      <TouchableOpacity key={day} style={[styles.day, { backgroundColor }]}>
        <Text>{day}</Text>
      </TouchableOpacity>
    );
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayNameInMonth = getFirstDayNameInMonth(year, month);

    // Generate days for the month
    const days = [];
    for (let i = 1; i <= firstDayNameInMonth; i++) {
        days.push(renderDay(null));
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(renderDay(i));
    }
    
    const endPadding = 7 - (days.length % 7);
    for (let i = 1; i <= endPadding; i++) {
        days.push(renderDay(null));
    }

    return <View style={styles.calendarGrid}>{days}</View>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
      </Text>
      <View style={styles.buttonRow}>
        <Button title="Previous" onPress={handlePreviousMonth} />
        <Button title="Next" onPress={handleNextMonth} />
      </View>
      {loading ? (
        <Text>Loading...</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  day: {
    width: '13%', // Approximate size to fit 7 days per row
    aspectRatio: 1, // Make it square
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default Calendar;
