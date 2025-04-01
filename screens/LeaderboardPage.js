import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LeaderboardPage() {
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

  const [timeframe, setTimeframe] = useState('Weekly');
  const [challengeModalVisible, setChallengeModalVisible] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [addFriendModalVisible, setAddFriendModalVisible] = useState(false);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  
  const leaderboardData = [
    { rank: 1, name: 'gymboy', points: 200, isCurrentUser: false },
    { rank: 2, name: 'ironman 🚀', points: 180, isCurrentUser: true },
    { rank: 3, name: 'marshmello', points: 170, isCurrentUser: false },
    { rank: 4, name: 'boo', points: 160, isCurrentUser: false },
    { rank: 5, name: 'Vai', points: 150, isCurrentUser: false },
    { rank: 6, name: 'Sid', points: 140, isCurrentUser: false },
    { rank: 7, name: 'Aishu', points: 130, isCurrentUser: false },
    { rank: 8, name: 'anda', points: 120, isCurrentUser: false },
    { rank: 9, name: 'Solana', points: 110, isCurrentUser: false },
    { rank: 10, name: 'Vitamindel', points: 100, isCurrentUser: false },
  ];

  const challenges = [
    { 
      id: 1, 
      from: 'Alice', 
      description: 'Complete 50 pushups in a single day', 
      points: 30,
      deadline: '2 days left'
    },
    { 
      id: 2, 
      from: 'Bob', 
      description: 'Run 5km under 30 minutes', 
      points: 50,
      deadline: '4 days left'
    }
  ];

  const badges = [
    { id: 1, name: 'Consistency Champion', icon: 'trophy', unlocked: true, description: 'Worked out 7 days in a row' },
    { id: 2, name: 'Early Bird', icon: 'time', unlocked: true, description: 'Completed 5 workouts before 8am' },
    { id: 3, name: 'Strength Master', icon: 'barbell', unlocked: true, description: 'Lifted a total of 1000kg in a week' },
    { id: 4, name: 'Cardio King', icon: 'heart', unlocked: false, description: 'Run a total of 50km in a month' },
    { id: 5, name: 'Workout Warrior', icon: 'fitness', unlocked: true, description: 'Completed 20 workouts in a month' },
    { id: 6, name: 'Wellness Wizard', icon: 'leaf', unlocked: false, description: 'Track nutrition for 14 days straight' },
    { id: 7, name: 'Social Star', icon: 'people', unlocked: false, description: 'Connect with 10 friends on the app' },
    { id: 8, name: 'Goal Getter', icon: 'flag', unlocked: true, description: 'Achieved 5 personal goals' },
  ];

  const openChallengeModal = (challenge) => {
    setCurrentChallenge(challenge);
    setChallengeModalVisible(true);
  };

  const openBadgeModal = (badge) => {
    setCurrentBadge(badge);
    setBadgeModalVisible(true);
  };

  const handleAddFriend = () => {
    // Here you would typically handle the API call to add friend
    console.log(`Adding friend: ${newFriendUsername}`);
    setNewFriendUsername('');
    setAddFriendModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Leaderboard</Text>
          </View>

          {/* User Rank & Score */}
          <View style={styles.yourRankCard}>
            <Text style={styles.sectionTitle}>Your Rank & Score</Text>
            <View style={styles.rankDetails}>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>Rank</Text>
                <Text style={styles.rankValue}>2</Text>
              </View>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>Score</Text>
                <Text style={styles.rankValue}>180</Text>
              </View>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>Streak</Text>
                <View style={styles.streakValue}>
                  <Text style={styles.rankValue}>4</Text>
                  <Ionicons name="flame" size={16} color={colors.primaryOrange} style={styles.streakIcon} />
                </View>
              </View>
            </View>
          </View>

          {/* Challenges Section */}
          <View style={styles.challengesContainer}>
            <Text style={styles.sectionTitle}>Challenges</Text>
            {challenges.length > 0 ? (
              challenges.map(challenge => (
                <TouchableOpacity 
                  key={challenge.id} 
                  style={styles.challengeItem}
                  onPress={() => openChallengeModal(challenge)}
                >
                  <View style={styles.challengeHeader}>
                    <View style={styles.challengeNameContainer}>
                      <Ionicons name="trophy" size={18} color={colors.primaryOrange} style={styles.challengeIcon} />
                      <Text style={styles.challengeTitle}>{challenge.from} challenges you!</Text>
                    </View>
                    <Text style={styles.challengePoints}>+{challenge.points} pts</Text>
                  </View>
                  <Text style={styles.challengeDescription}>{challenge.description}</Text>
                  <View style={styles.challengeFooter}>
                    <Text style={styles.challengeDeadline}>{challenge.deadline}</Text>
                    <Ionicons name="chevron-forward" size={18} color={colors.textMedium} />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noChallenge}>
                <Text style={styles.noChallengeText}>No challenges right now</Text>
              </View>
            )}
          </View>

          {/* Top 10 Leaderboard */}
          <View style={styles.leaderboardContainer}>
            <Text style={styles.sectionTitle}>Top 10 Leaderboard ({timeframe})</Text>
            {leaderboardData.map((user) => (
              <View 
                key={user.rank} 
                style={[
                  styles.leaderboardRow, 
                  user.isCurrentUser && styles.currentUserRow
                ]}
              >
                <View style={styles.rankContainer}>
                  <Text style={styles.rankNumber}>{user.rank}</Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userPoints}>{user.points} pts</Text>
              </View>
            ))}
          </View>

          {/* Badges & Achievements */}
          <View style={styles.badgesContainer}>
            <Text style={styles.sectionTitle}>Badges & Achievements</Text>
            <View style={styles.badgesGrid}>
              {badges.map((badge) => (
                <TouchableOpacity 
                  key={badge.id} 
                  style={styles.badgeItem}
                  onPress={() => openBadgeModal(badge)}
                >
                  <View style={[
                    styles.badgeCircle, 
                    !badge.unlocked && styles.badgeCircleLocked
                  ]}>
                    <Ionicons 
                      name={badge.icon} 
                      size={24} 
                      color={badge.unlocked ? colors.primaryOrange : '#AAAAAA'} 
                    />
                    {!badge.unlocked && (
                      <View style={styles.lockIconContainer}>
                        <Ionicons name="lock-closed" size={12} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Add Friends */}
          <TouchableOpacity 
            style={styles.addFriendButton}
            onPress={() => setAddFriendModalVisible(true)}
          >
            <Ionicons name="person-add" size={20} color={colors.background} style={styles.addFriendIcon} />
            <Text style={styles.addFriendText}>Add New Friend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Challenge Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={challengeModalVisible}
        onRequestClose={() => setChallengeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {currentChallenge && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Challenge from {currentChallenge.from}</Text>
                  <TouchableOpacity
                    onPress={() => setChallengeModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color={colors.textDark} />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <View style={styles.challengePointsContainer}>
                    <Text style={styles.challengePointsLabel}>Reward</Text>
                    <Text style={styles.challengePointsValue}>{currentChallenge.points} pts</Text>
                  </View>
                  
                  <Text style={styles.modalDescription}>{currentChallenge.description}</Text>
                  
                  <View style={styles.challengeTimeContainer}>
                    <Ionicons name="time-outline" size={18} color={colors.textMedium} style={styles.timeIcon} />
                    <Text style={styles.challengeTimeText}>{currentChallenge.deadline}</Text>
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity 
                    style={styles.declineButton}
                    onPress={() => setChallengeModalVisible(false)}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.acceptButton}
                    onPress={() => setChallengeModalVisible(false)}
                  >
                    <Text style={styles.acceptButtonText}>Accept Challenge</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Badge Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={badgeModalVisible}
        onRequestClose={() => setBadgeModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={0.9}
          onPress={() => setBadgeModalVisible(false)}
        >
          <View style={styles.badgeModalContent}>
            {currentBadge && (
              <TouchableOpacity activeOpacity={1}>
                <View style={styles.badgeModalHeader}>
                  <View style={[
                    styles.badgeCircleLarge, 
                    !currentBadge.unlocked && styles.badgeCircleLocked
                  ]}>
                    <Ionicons 
                      name={currentBadge.icon} 
                      size={46} 
                      color={currentBadge.unlocked ? colors.primaryOrange : '#AAAAAA'} 
                    />
                    {!currentBadge.unlocked && (
                      <View style={styles.lockIconContainerLarge}>
                        <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.badgeModalTitle}>{currentBadge.name}</Text>
                  {currentBadge.unlocked ? (
                    <View style={styles.badgeStatusContainer}>
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" style={styles.badgeStatusIcon} />
                      <Text style={styles.badgeStatusText}>Unlocked</Text>
                    </View>
                  ) : (
                    <View style={styles.badgeStatusContainer}>
                      <Ionicons name="lock-closed" size={16} color="#AAAAAA" style={styles.badgeStatusIcon} />
                      <Text style={[styles.badgeStatusText, {color: '#AAAAAA'}]}>Locked</Text>
                    </View>
                  )}
                  
                  <Text style={styles.badgeModalDescription}>{currentBadge.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add Friend Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addFriendModalVisible}
        onRequestClose={() => setAddFriendModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Friend</Text>
              <TouchableOpacity
                onPress={() => setAddFriendModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Enter username</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Friend's username"
                value={newFriendUsername}
                onChangeText={setNewFriendUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.declineButton}
                onPress={() => setAddFriendModalVisible(false)}
              >
                <Text style={styles.declineButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.acceptButton,
                  !newFriendUsername.trim() && styles.disabledButton
                ]}
                onPress={handleAddFriend}
                disabled={!newFriendUsername.trim()}
              >
                <Text style={styles.acceptButtonText}>Add Friend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  yourRankCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  rankDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankItem: {
    alignItems: 'center',
  },
  rankLabel: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  rankValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
  },
  streakValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    marginLeft: 4,
  },
  challengesContainer: {
    marginBottom: 20,
  },
  challengeItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeIcon: {
    marginRight: 6,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  challengePoints: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF9500',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 10,
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeDeadline: {
    fontSize: 12,
    color: '#666666',
  },
  noChallenge: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  noChallengeText: {
    fontSize: 14,
    color: '#555555',
    fontStyle: 'italic',
  },
  leaderboardContainer: {
    marginBottom: 20,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  currentUserRow: {
    backgroundColor: '#FFF5E6',
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  rankContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  userPoints: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF9500',
  },
  badgesContainer: {
    marginBottom: 20,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '24%',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  badgeCircleLocked: {
    backgroundColor: '#E0E0E0',
    borderColor: '#CCCCCC',
  },
  lockIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '80%',
    padding: 24,
    alignItems: 'center',
  },
  badgeCircleLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 16,
  },
  lockIconContainerLarge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeModalHeader: {
    alignItems: 'center',
  },
  badgeModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeStatusIcon: {
    marginRight: 6,
  },
  badgeStatusText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  badgeModalDescription: {
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 22,
  },
  addFriendButton: {
    flexDirection: 'row',
    backgroundColor: '#FF9500',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addFriendIcon: {
    marginRight: 8,
  },
  addFriendText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 20,
  },
  challengePointsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  challengePointsLabel: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  challengePointsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF9500',
  },
  modalDescription: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  challengeTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeIcon: {
    marginRight: 6,
  },
  challengeTimeText: {
    fontSize: 14,
    color: '#555555',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FF9500',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#FFD9A8',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 12,
    fontSize: 16,
    color: '#333333',
    width: '100%',
  },
});