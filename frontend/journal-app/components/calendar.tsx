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
  const buttonColor = "#34a899";

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

  const renderDay = (day: number | null, index: string) => {
    const sentiment = day !== null ? monthData[day]?.sentiment : null;
    let backgroundColor = '#ccc'; // Default color for days without sentiment data
    let borderColor = '#ccc'; // Default color for days without sentiment data

    if (sentiment === -1) backgroundColor = '#ffcccc'; // Negative: red
    if (sentiment === 0) backgroundColor = '#ffffcc'; // Neutral: yellow
    if (sentiment === 1) backgroundColor = '#ccffcc'; // Positive: green
    if (day === null) { // Empty day
        backgroundColor = 'transparent';
        borderColor = 'transparent';
    }
    return (
      <TouchableOpacity key={index} style={[styles.day, { backgroundColor, borderColor }]}>
        <Text>{day}</Text>
      </TouchableOpacity>
    );
  };

  const renderWeekday = (day: string) => {
    return (
      <View key={day} style={[styles.day, { backgroundColor: 'transparent', borderColor: 'transparent' }]}>
        <Text>{day}</Text>
      </View>
    );
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayNameInMonth = getFirstDayNameInMonth(year, month);    
    const days = []; // Generate days for the month
    var nullCount = 0;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    dayNames.forEach((dayName) => {
        days.push(renderWeekday(dayName));
    });

    for (let i = 1; i <= firstDayNameInMonth; i++) {
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

    return (
      <View style={styles.calendarGrid}>
        {days}
      </View>
    );
  };

  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button color={buttonColor} title="Prev" onPress={handlePreviousMonth} />
        <Text style={styles.header}>
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </Text>
        <Button color={buttonColor} title="Next" onPress={handleNextMonth} />
      </View>
      {loading ? (
        <Text>{renderLoading()}</Text>
      ) : (
        renderCalendar()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '5%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    flex: 1, // This will make the text take up all available space
    fontFamily: 'Abril Fatface'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space buttons evenly
    alignItems: 'center', // Vertically align items in the center
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
    borderColor: '#ccc',
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1, // Ensure the container fills the entire available space
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    width: '100%', // Ensure the container takes the full width of the parent
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center', // Ensure the text is centered within its container
  },
});

export default Calendar;
