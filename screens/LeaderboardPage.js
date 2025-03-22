import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('Weekly');

  const toggleTimeframe = () => {
    setTimeframe(prev => prev === 'Weekly' ? 'Monthly' : prev === 'Monthly' ? 'All-time' : 'Weekly');
  };

  return (
    <View style={styles.container}>
      {/* User Rank & Score */}
      <View style={styles.section}>
        <Text style={styles.header}>Your Rank & Score</Text>
        <Text>Rank: 5</Text>
        <Text>Score: 150</Text>
        <Text>Streak: 5 days</Text>
      </View>
      
      {/* Weekly/Monthly Toggle */}
      <View style={styles.section}>
        <Text style={styles.header}>Leaderboard ({timeframe})</Text>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleTimeframe}>
          <Text>Toggle Timeframe</Text>
        </TouchableOpacity>
      </View>
      
      {/* Top 10 Leaderboard */}
      <View style={styles.section}>
        <Text style={styles.header}>Top 10 Leaderboard</Text>
        <Text>1. Alice - 200 pts</Text>
        <Text>2. Bob - 180 pts</Text>
        <Text>3. Carol - 170 pts</Text>
        <Text>...and so on</Text>
      </View>
      
      {/* Badges & Achievements */}
      <View style={styles.section}>
        <Text style={styles.header}>Badges & Achievements</Text>
        <Text>🏅 Consistency Champion</Text>
      </View>
      
      {/* Add Friends */}
      <View style={styles.section}>
        <Text style={styles.header}>Add Friends</Text>
        <Button title="Add Friend" onPress={() => {}} />
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
  toggleButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});