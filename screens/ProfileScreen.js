import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Switch, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // State for profile details
  const [username, setUsername] = useState('sahil.ghost');
  const [name, setName] = useState('sahil 🚀');
  const [goals, setGoals] = useState([
    { id: 1, name: 'Build muscle', selected: true },
    { id: 2, name: 'Improve strength', selected: true },
    { id: 3, name: 'Lose weight', selected: false },
    { id: 4, name: 'Increase endurance', selected: false },
    { id: 5, name: 'Gain flexibility', selected: false }
  ]);
  
  // State for modals
  const [isUsernameModalVisible, setIsUsernameModalVisible] = useState(false);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isGoalsModalVisible, setIsGoalsModalVisible] = useState(false);
  const [isWorkoutDifficultyModalVisible, setIsWorkoutDifficultyModalVisible] = useState(false);
  
  // State for form inputs
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  
  // State for toggles
  const [isDailyRemindersOn, setIsDailyRemindersOn] = useState(true);
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(150);
  const [workoutDifficulty, setWorkoutDifficulty] = useState('Intermediate');

  // Theme colors
  const colors = {
    primaryOrange: '#FF9500',
    background: '#FFFFFF',
    textDark: '#333333',
    textMedium: '#555555',
    border: '#DDDDDD',
    inputBg: '#F8F8F8',
  };

  // Difficulty levels
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Toggle goal selection
  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, selected: !goal.selected } : goal
    ));
  };

  // Save username
  const saveUsername = () => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setIsUsernameModalVisible(false);
      setNewUsername('');
    } else {
      Alert.alert('Invalid Username', 'Please enter a valid username');
    }
  };

  // Save name
  const saveName = () => {
    if (newName.trim()) {
      setName(newName.trim());
      setIsNameModalVisible(false);
      setNewName('');
    } else {
      Alert.alert('Invalid Name', 'Please enter a valid name');
    }
  };

  // Logout function
  const handleLogout = () => {
    Alert.alert(
      'Logout', 
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => {
            // Implement actual logout logic here
            Alert.alert('Logged Out', 'You have been logged out successfully');
          }
        }
      ]
    );
  };

  // Render username change modal
  const renderUsernameModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isUsernameModalVisible}
      onRequestClose={() => setIsUsernameModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Username</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter new username"
            value={newUsername}
            onChangeText={setNewUsername}
          />
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setIsUsernameModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalConfirmButton}
              onPress={saveUsername}
            >
              <Text style={styles.modalConfirmText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render name change modal
  const renderNameModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isNameModalVisible}
      onRequestClose={() => setIsNameModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Name</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter new name"
            value={newName}
            onChangeText={setNewName}
          />
          <View style={styles.modalButtonGroup}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setIsNameModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalConfirmButton}
              onPress={saveName}
            >
              <Text style={styles.modalConfirmText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Render goals modal
  const renderGoalsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isGoalsModalVisible}
      onRequestClose={() => setIsGoalsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Fitness Goals</Text>
          {goals.map(goal => (
            <TouchableOpacity 
              key={goal.id} 
              style={styles.modalGoalItem}
              onPress={() => toggleGoal(goal.id)}
            >
              <Text style={styles.modalGoalText}>{goal.name}</Text>
              <Ionicons 
                name={goal.selected ? 'checkbox' : 'square-outline'} 
                size={24} 
                color={colors.primaryOrange} 
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.modalConfirmButton}
            onPress={() => setIsGoalsModalVisible(false)}
          >
            <Text style={styles.modalConfirmText}>Save Goals</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Render workout difficulty modal
  const renderWorkoutDifficultyModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isWorkoutDifficultyModalVisible}
      onRequestClose={() => setIsWorkoutDifficultyModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Workout Difficulty</Text>
          {difficultyLevels.map(level => (
            <TouchableOpacity 
              key={level} 
              style={styles.modalGoalItem}
              onPress={() => {
                setWorkoutDifficulty(level);
                setIsWorkoutDifficultyModalVisible(false);
              }}
            >
              <Text style={styles.modalGoalText}>{level}</Text>
              {workoutDifficulty === level && (
                <Ionicons 
                  name="checkmark" 
                  size={24} 
                  color={colors.primaryOrange} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

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
            <Text style={styles.profileName}>{name} ({username})</Text>
          </View>

          {/* Goals Section */}
          <TouchableOpacity 
            style={styles.sectionCard}
            onPress={() => setIsGoalsModalVisible(true)}
          >
            <Text style={styles.sectionTitle}>Goals:</Text>
            <Text style={styles.sectionContent}>
              {goals.filter(goal => goal.selected).map(goal => goal.name).join(', ')}
            </Text>
          </TouchableOpacity>

          {/* Streak & Points Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Streak (Points)</Text>
            <View style={styles.streakContainer}>
              <Text style={styles.sectionContent}>{streak} days</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>{points}</Text>
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

          /* Daily Reminders */}
                    <View style={styles.sectionCard}>
                      <View style={styles.preferenceRow}>
                        <Text style={styles.sectionTitle}>Daily Workout Reminders</Text>
                        <Switch
                          trackColor={{ false: colors.border, true: colors.primaryOrange }}
                          thumbColor={colors.background}
                          ios_backgroundColor={colors.border}
                          onValueChange={() => setIsDailyRemindersOn(!isDailyRemindersOn)}
                          value={isDailyRemindersOn}
                        />
                      </View>
          
                      {/* Time Selector - Only shown when reminders are enabled */}
                      {isDailyRemindersOn && (
                        <TouchableOpacity 
                          style={styles.timeSelectionRow}
                          onPress={() => setShowTimePicker(true)}
                        >
                          <Ionicons 
                            name="time-outline" 
                            size={24} 
                            color={colors.primaryOrange} 
                            style={styles.timeIcon}
                          />
                          <Text style={styles.timeText}>
                            Reminder Time: {formatTime(reminderTime)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
          
                    {/* Time Picker Modal */}
                    {showTimePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={reminderTime}
                        mode="time"
                        is24Hour={false}
                        display="default"
                        onChange={onTimeChange}
                      />
                    )}

          {/* Workout Recommendations */}
          <TouchableOpacity 
            style={styles.sectionCard}
            onPress={() => setIsWorkoutDifficultyModalVisible(true)}
          >
            <Text style={styles.sectionTitle}>Workout Recommendations</Text>
            <Text style={styles.sectionContent}>
              Difficulty: {workoutDifficulty}
            </Text>
          </TouchableOpacity>

          {/* Privacy Settings */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Privacy Settings:</Text>
            <Text style={styles.sectionContent}>Manage your data sharing preferences</Text>
          </View>

          {/* Linked Apps */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Linked Apps/V2</Text>
            <Text style={styles.sectionContent}>Connect fitness tracking apps</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setIsUsernameModalVisible(true)}
          >
            <Text style={styles.settingsButtonText}>Change Username</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setIsNameModalVisible(true)}
          >
            <Text style={styles.settingsButtonText}>Change Name</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          {/* Modals */}
          {renderUsernameModal()}
          {renderNameModal()}
          {renderGoalsModal()}
          {renderWorkoutDifficultyModal()}
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333333',
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#333333',
    fontSize: 16,
  },
  modalConfirmButton: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FF9500',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    
  },
  modalConfirmText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  modalGoalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  modalGoalText: {
    fontSize: 16,
    color: '#333333',
  },
  timeSelectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#DDDDDD',
    },
    timeIcon: {
      marginRight: 10,
    },
    timeText: {
      fontSize: 14,
      color: '#333333',
    },
});