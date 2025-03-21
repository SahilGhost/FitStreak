import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

export default function WorkoutsPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Today's Workout Section */}
      <View style={styles.section}>
        <Text style={styles.header}>Today's Workout</Text>
        <Text>Full Body Circuit</Text>
      </View>
      
      {/* Start Workout Button */}
      <View style={styles.section}>
        <Button title="Start Workout" onPress={() => {}}/>
      </View>
      
      {/* Exercise List */}
      <View style={styles.section}>
        <Text style={styles.header}>Exercise List</Text>
        <Text>- Push-ups: 3 sets x 10 reps</Text>
        <Text>- Squats: 3 sets x 15 reps</Text>
        <Text>- Plank: 3 sets x 30 sec</Text>
      </View>
      
      {/* AI Coach Suggestions */}
      <View style={styles.section}>
        <Text style={styles.header}>AI Coach Suggestions</Text>
        <Text>Try modifying push-ups to knee push-ups if too challenging.</Text>
      </View>
      
      {/* Proof Submission */}
      <View style={styles.section}>
        <Text style={styles.header}>Proof Submission</Text>
        <Button title="Upload Proof" onPress={() => {}} />
      </View>
      
      {/* Workout History */}
      <View style={styles.section}>
        <Text style={styles.header}>Workout History</Text>
        <Text>- 2023-10-01: Completed</Text>
        <Text>- 2023-09-30: Completed</Text>
      </View>
      
      {/* Custom Workout Builder */}
      <View style={styles.section}>
        <Text style={styles.header}>Custom Workout Builder</Text>
        <Button title="Build Workout" onPress={() => {}} />
      </View>
      
      {/* Challenge a Friend Button */}
      <View style={styles.section}>
        <Text style={styles.header}>Challenge a Friend</Text>
        <Button title="Challenge" onPress={() => {}} />
      </View>
      
      {/* Progress Graphs */}
      <View style={styles.section}>
        <Text style={styles.header}>Progress Graphs</Text>
        <Text>[Graph Placeholder]</Text>
      </View>
      
      {/* Rest Timer */}
      <View style={styles.section}>
        <Text style={styles.header}>Rest Timer</Text>
        <Text>00:30</Text>
      </View>
      
      {/* Exercise Evaluation Test */}
      <View style={styles.section}>
        <Text style={styles.header}>Exercise Evaluation Test</Text>
        <Button title="Retake Test" onPress={() => {}} />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 8,
  },
});