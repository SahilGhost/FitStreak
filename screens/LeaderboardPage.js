import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Modal } from 'react-native';
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
  
  const leaderboardData = [
    { rank: 1, name: 'pannu_doggy', points: 200, isCurrentUser: false },
    { rank: 2, name: 'sahil 🚀', points: 180, isCurrentUser: true },
    { rank: 3, name: 'Sammy', points: 170, isCurrentUser: false },
    { rank: 4, name: 'Amogh', points: 160, isCurrentUser: false },
    { rank: 5, name: 'Vaibhav', points: 150, isCurrentUser: false },
    { rank: 6, name: 'Sid.leaks', points: 140, isCurrentUser: false },
    { rank: 7, name: 'aswath', points: 130, isCurrentUser: false },
    { rank: 8, name: 'anay', points: 120, isCurrentUser: false },
    { rank: 9, name: 'soham_skis', points: 110, isCurrentUser: false },
    { rank: 10, name: 'Vita Ashwin', points: 100, isCurrentUser: false },
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
    { id: 1, name: 'Consistency Champion', icon: 'trophy' },
    { id: 2, name: 'Early Bird', icon: 'time' },
    { id: 3, name: 'Strength Master', icon: 'barbell' },
    { id: 4, name: 'Cardio King', icon: 'heart' },
    { id: 5, name: 'Workout Warrior', icon: 'fitness' },
    { id: 6, name: 'Wellness Wizard', icon: 'leaf' },
    { id: 7, name: 'Social Star', icon: 'people' },
    { id: 8, name: 'Goal Getter', icon: 'flag' },
  ];

  const openChallengeModal = (challenge) => {
    setCurrentChallenge(challenge);
    setChallengeModalVisible(true);
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
                <Text style={styles.rankValue}>5</Text>
              </View>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>Score</Text>
                <Text style={styles.rankValue}>150</Text>
              </View>
              <View style={styles.rankItem}>
                <Text style={styles.rankLabel}>Streak</Text>
                <View style={styles.streakValue}>
                  <Text style={styles.rankValue}>5</Text>
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
                <View key={badge.id} style={styles.badgeItem}>
                  <View style={styles.badgeCircle}>
                    <Ionicons name={badge.icon} size={24} color={colors.primaryOrange} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Add Friends */}
          <TouchableOpacity style={styles.addFriendButton}>
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
  }
});