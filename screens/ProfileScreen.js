import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.section}>
        <Text style={styles.header}>User Profile</Text>
        <Text>Profile Name: John Doe</Text>
        <Text>Fitness Goal: Muscle Gain</Text>
        <Text>Streak: 5 days</Text>
        <Text>Points: 150</Text>
      </View>
      
      {/* Workout & Progress Tracking */}
      <View style={styles.section}>
        <Text style={styles.header}>Workout History</Text>
        <Text>2023-10-01: Full Body Circuit</Text>
        <Text>2023-09-30: Cardio Session</Text>
      </View>
      
      {/* App Preferences & Settings */}
      <View style={styles.section}>
        <Text style={styles.header}>App Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text>Daily Workout Reminders</Text>
          <Switch value={true} onValueChange={() => {}} />
        </View>
        <View style={styles.preferenceItem}>
          <Text>AI Workout Recommendations</Text>
          <Switch value={false} onValueChange={() => {}} />
        </View>
        <View style={styles.preferenceItem}>
          <Text>Privacy Settings</Text>
          <Button title="Change" onPress={() => {}} />
        </View>
      </View>
      
      {/* Miscellaneous */}
      <View style={styles.section}>
        <Text style={styles.header}>Miscellaneous</Text>
        <Button title="Change Profile Details" onPress={() => {}} />
        <Button title="Toggle Theme" onPress={() => {}} />
        <Button title="Logout" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
});