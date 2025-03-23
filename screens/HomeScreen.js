import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Theme colors
  const colors = {
    primaryOrange: '#FF9500',
    gradientStart: '#FFAA00',
    gradientEnd: '#FF7700',
    background: '#FFFFFF',
    textDark: '#333333',
    textMedium: '#555555',
    textLight: '#666666',
    placeholder: '#AAAAAA',
    inputBg: '#F8F8F8',
    border: '#DDDDDD',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header with Notification */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome Back <Text style={styles.username}>Sahil</Text></Text>
            <TouchableOpacity style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          {/* Streak Calendar */}
          <View style={styles.streakContainer}>
            <View style={styles.streakRow}>
              <View style={styles.streakDay}>
                <Text style={styles.dayLabel}>M</Text>
                <View style={styles.pointsBox}>
                  <Text style={styles.pointsText}>50</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                  <Ionicons name="flame" size={12} color={colors.primaryOrange} style={styles.flameIcon} />
                </View>
              </View>
              <View style={styles.streakDay}>
                <Text style={styles.dayLabel}>T</Text>
                <View style={styles.pointsBox}>
                  <Text style={styles.pointsText}>50</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                  <Ionicons name="flame" size={12} color={colors.primaryOrange} style={styles.flameIcon} />
                </View>
              </View>
              <View style={styles.streakDay}>
                <Text style={styles.dayLabel}>W</Text>
                <View style={styles.pointsBox}>
                  <Text style={styles.pointsText}>50</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                  <Ionicons name="flame" size={12} color={colors.primaryOrange} style={styles.flameIcon} />
                </View>
              </View>
              <View style={styles.streakDay}>
                <Text style={styles.dayLabel}>T</Text>
                <View style={styles.pointsBox}>
                  <Text style={styles.pointsText}>50</Text>
                  <Text style={styles.pointsLabel}>pts</Text>
                  <Ionicons name="flame" size={12} color={colors.primaryOrange} style={styles.flameIcon} />
                </View>
              </View>
              <View style={styles.streakDay}>
                <Text style={styles.dayLabel}>F</Text>
                <View style={[styles.pointsBox, styles.locationBox]}>
                  <Ionicons name="location-outline" size={24} color={colors.textMedium} />
                </View>
              </View>
            </View>
          </View>

          {/* Today's Workout Card */}
          <View style={styles.workoutCard}>
            <Text style={styles.workoutTitle}>Today's Workout</Text>
            <View style={styles.workoutDetails}>
              <Text style={styles.workoutType}>Today is leg day</Text>
              <Text style={styles.workoutDescription}>
                Brief Summary of Today.
                Following Exercises:
                Time: ___
              </Text>
            </View>
          </View>

          {/* Inspirational Quote */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteLabel}>Inspirational Quote</Text>
            <Text style={styles.quoteText}>
              "The only bad workout is the one that didn't happen."
            </Text>
          </View>

          {/* Fitness Score */}
          <View style={styles.fitnessScoreContainer}>
            <Text style={styles.scoreLabel}>Current Fitness Score:</Text>
            <Text style={styles.scoreValue}>750</Text>
            <Text style={styles.growthChartLabel}>__GROWTH CHART__</Text>
          </View>

          {/* Retake Fitness Test Button */}
          <TouchableOpacity style={styles.retakeButton}>
            <Text style={styles.retakeButtonText}>Retake Fitness Test</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 24, // Add extra padding at the bottom for the tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
  },
  username: {
    fontWeight: '700',
  },
  notificationIcon: {
    padding: 8,
  },
  streakContainer: {
    marginBottom: 20,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streakDay: {
    alignItems: 'center',
    width: '18%',
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333333',
  },
  pointsBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  locationBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#555555',
  },
  flameIcon: {
    marginTop: 4,
  },
  workoutCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  workoutDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  workoutDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    textAlign: 'center',
  },
  quoteContainer: {
    marginBottom: 20,
  },
  quoteLabel: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
    textAlign: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333333',
    textAlign: 'center',
  },
  fitnessScoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF9500',
    marginBottom: 4,
  },
  growthChartLabel: {
    fontSize: 14,
    color: '#555555',
  },
  retakeButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  retakeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  }
});