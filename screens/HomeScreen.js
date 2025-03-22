import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Greeting Message */}
      <Text style={styles.greeting}>Welcome, User!</Text>

      {/* Progress Tracker */}
      <View style={styles.progressTracker}>
        <Text>Streak: 5 days</Text>
        <Text>Points: 150</Text>
      </View>

      {/* Daily Workout Summary */}
      <View style={styles.workoutSummary}>
        <Text>Today's Workout: Full Body Circuit</Text>
      </View>

      {/* Motivational Quote */}
      <View style={styles.quoteContainer}>
        <Text>"Push yourself, because no one else is going to do it for you."</Text>
      </View>

      {/* Notification Icon */}
      <View style={styles.notification}>
        <Text>🔔</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    marginBottom: 12,
  },
  progressTracker: {
    marginBottom: 12,
  },
  workoutSummary: {
    marginBottom: 12,
  },
  quoteContainer: {
    marginBottom: 12,
  },
  notification: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});