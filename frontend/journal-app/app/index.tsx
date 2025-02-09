import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import Calendar from "@/components/Calendar";
import SubmissionForm from "@/components/SubmissionForm";
import Suggestion from "@/components/Suggestion";
import Header from "@/components/Header";
import Legend from "@/components/Legend";
import LandingPage from "@/components/LandingPage";
import { styles } from "./index.styles";

export default function Index() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSuggestionVisible, setSuggestionVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [lifestyleAdvice, setLifestyleAdvice] = useState<string | null>(null);
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isRender, setIsRender] = useState(false);
  const [LandingPageVisible, setLandingPageVisible] = useState(true); 

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  async function fetchLifestyleAdvice() {
    if (lifestyleAdvice) return;
    setIsFetchingAdvice(true);
    try {
      const response = await fetch("http://10.19.129.35:3001/lifestyle");
      const data = await response.json();
      setLifestyleAdvice(data.advice);
    } catch {
      setLifestyleAdvice("No data available");
    } finally {
      setIsFetchingAdvice(false);
    }
  }

  function onDateSelected(date: string) {
    setSelectedDate(date);
    setFormVisible(true);
  }

  function closeForm() {
    setFormVisible(false);
  }

  async function toggleSuggestion() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!isSuggestionVisible && !lifestyleAdvice) {
      await fetchLifestyleAdvice();
    }
    setSuggestionVisible(!isSuggestionVisible);
  }

  useEffect(() => {
    if (isSuggestionVisible && lifestyleAdvice) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 0);
    }
  }, [isSuggestionVisible, lifestyleAdvice]);

  if (LandingPageVisible) {
    return <LandingPage onGetStarted={() => setLandingPageVisible(false)} />;
  }

  return (

    <View style={styles.screenWrapper}>
      <View style={styles.navBar}>
        <Text style={styles.navBarTitle}>BrightPath</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.mainContainer}
        ref={scrollViewRef}
      >
        <View style={styles.dayLogoRow}>
          <Header />
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.calendarContainer}>
          <Calendar onDateSelected={onDateSelected} render={isRender} />
        </View>

        <Legend />

        <View style={styles.buttonContainer}>
          {isFetchingAdvice ? (
            <View style={styles.loadingButtonContainer}>
              <ActivityIndicator size="large" color="#F1F0E8" />
              <Text style={styles.loadingText}>Loading suggestion...</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={toggleSuggestion}
              style={styles.roundedButton}
            >
              <Text style={styles.roundedButtonText}>
                {isSuggestionVisible ? "Hide Suggestion" : "View Suggestion"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isSuggestionVisible && lifestyleAdvice && (
          <View style={styles.suggestionContainer}>
            <Suggestion data={lifestyleAdvice} scrollViewRef={scrollViewRef} />
          </View>
        )}

        <SubmissionForm
          visible={isFormVisible}
          onClose={closeForm}
          date={selectedDate}
          handleRender={setIsRender}
        />
      </ScrollView>
    </View>
  );
}
