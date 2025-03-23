import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  
  // Theme colors - same as in HomeScreen for consistency
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
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Profile Settings</Text>
          </View>

          {/* Profile Name Card */}
          <View style={styles.profileCard}>
            <Text style={styles.profileName}>sahil 🚀 (sahil.ghost)</Text>
          </View>

          {/* Goals Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Goals:</Text>
            <Text style={styles.sectionContent}>Build muscle, Improve strength</Text>
          </View>

          {/* Streak & Points Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Streak, Point:</Text>
            <View style={styles.streakContainer}>
              <Text style={styles.sectionContent}>5 days</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>150</Text>
                <Text style={styles.pointsLabel}>pts</Text>
                <Ionicons name="flame" size={16} color={colors.primaryOrange} style={styles.flameIcon} />
              </View>
            </View>
          </View>

          {/* Workout History & Progress */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Workout history:</Text>
            <Text style={styles.linkText}>Progress Tracking</Text>
          </View>

          {/* Daily Reminders */}
          <View style={styles.sectionCard}>
            <View style={styles.preferenceRow}>
              <Text style={styles.sectionTitle}>Daily Workout Reminders</Text>
              <Switch
                trackColor={{ false: colors.border, true: colors.primaryOrange }}
                thumbColor={colors.background}
                ios_backgroundColor={colors.border}
                onValueChange={() => {}}
                value={true}
              />
            </View>
          </View>

          {/* Workout Recommendations */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Workout Recommendations</Text>
            <Text style={styles.sectionContent}>Difficulty:</Text>
          </View>

          {/* Privacy Settings */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Privacy Settings:</Text>
          </View>

          {/* Linked Apps */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Linked Apps/V2</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Change Username</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Change Name</Text>
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
    paddingBottom: 80, // Extra padding for tab bar
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
  },
  sectionCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#FF9500',
    fontWeight: '500',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginRight: 4,
  },
  pointsLabel: {
    fontSize: 12,
    color: '#555555',
    marginRight: 4,
  },
  flameIcon: {
    marginTop: 1,
  },
  logoutButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF0000',
  },
  settingsButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});