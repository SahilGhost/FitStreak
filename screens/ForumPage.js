import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the styles outside the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 80, // Space for the create post button
  },
  postCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  postTypeTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF9500',
  },
  postTypeText: {
    color: '#FF9500',
    fontSize: 12,
    fontWeight: '500',
  },
  postContent: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 12,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  postActions: {
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 4,
    color: '#555555',
    fontSize: 14,
  },
  participateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participateButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    width: '30%',
  },
  declineText: {
    color: '#555555',
    fontSize: 14,
    fontWeight: '500',
  },
  acceptButton: {
    backgroundColor: '#FF9500',
    width: '65%',
  },
  acceptText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  repliesContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
    paddingTop: 12,
  },
  repliesHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 12,
  },
  replyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  miniUserAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF9500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  miniAvatarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  replyUsername: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginRight: 8,
  },
  replyTimestamp: {
    fontSize: 12,
    color: '#AAAAAA',
  },
  replyContent: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  proofContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  proofText: {
    color: '#FF9500',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  addReplyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333333',
    marginRight: 8,
  },
  attachProofButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#FF9500',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  postTypeSelection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#DDDDDD',
  },
  typeButtonActive: {
    borderBottomColor: '#FF9500',
  },
  typeButtonText: {
    fontSize: 16,
    color: '#555555',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#FF9500',
  },
  inputField: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pointsInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsInputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    width: 80,
  },
  pointsInputField: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  proofRequirementContainer: {
    marginBottom: 16,
  },
  proofRequirementLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  proofTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proofTypeButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  proofTypeButtonActive: {
    borderColor: '#FF9500',
    backgroundColor: '#FFF5E6',
  },
  proofTypeText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 4,
  },
  proofTypeTextActive: {
    color: '#FF9500',
  },
  postButton: {
    backgroundColor: '#FF9500',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  postButtonDisabled: {
    backgroundColor: '#FFD3A3',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Suggestions Button
  suggestionsButton: {
    backgroundColor: '#FF9500',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  suggestionsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  // Suggestions Modal
  suggestionsModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  suggestionsModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  suggestionsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  suggestionsModalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
  },
  suggestionsModalSubtitle: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 16,
  },
  suggestionsList: {
    paddingBottom: 40,
  },
  suggestionCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  suggestionContent: {
    flexDirection: 'row',
  },
  suggestionTextContent: {
    flex: 3,
    marginRight: 12,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  suggestionDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 12,
  },
  helpfulLinksHeader: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  linksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#555555',
    marginLeft: 4,
  },
  suggestionImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function ForumPage() {
  // State variables
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [postType, setPostType] = useState('activity');
  const [expandedPost, setExpandedPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [newPostPoints, setNewPostPoints] = useState('');
  const [proofType, setProofType] = useState('photo');
  const [replyText, setReplyText] = useState('');
  const currentUsername = "ironman 🚀"; // Your username
  
  // Theme colors (same as HomeScreen)
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

  // Activity suggestions data
  const activitySuggestions = [
    {
      id: 1,
      title: "Park Yoga Session",
      description: "Host a morning yoga session at your local park. Great for all levels and a wonderful way to connect with nature while improving flexibility and mindfulness.",
      links: [
        "Yoga for beginners",
        "Best park locations",
        "Group fitness tips", 
        "Morning routine benefits", 
        "Outdoor yoga equipment"
      ]
    },
    {
      id: 2,
      title: "Community 5K Run",
      description: "Organize a casual 5K run through scenic routes in your neighborhood. Perfect for runners of all levels and a great way to build community while getting exercise.",
      links: [
        "5K training plans", 
        "Neighborhood running routes", 
        "Group running safety", 
        "Post-run stretches", 
        "Running motivation"
      ]
    },
    {
      id: 3,
      title: "Beach Volleyball Tournament",
      description: "Set up a beach volleyball tournament with teams of 2-4 players. A fun way to enjoy the beach while getting a full-body workout and building teamwork skills.",
      links: [
        "Volleyball basics", 
        "Beach tournament setup", 
        "Volleyball techniques", 
        "Beach safety tips", 
        "Team building activities"
      ]
    },
    {
      id: 4,
      title: "Weekend Hiking Adventure",
      description: "Plan a group hiking trip to explore local trails and natural landmarks. Great for connecting with nature, taking photos, and enjoying fresh air while getting exercise.",
      links: [
        "Beginner hiking trails", 
        "Hiking safety essentials", 
        "Trail photography tips", 
        "Group hiking etiquette", 
        "What to pack"
      ]
    },
    {
      id: 5,
      title: "Cycling City Tour",
      description: "Lead a bike tour exploring hidden gems and landmarks in your city. Perfect for sightseeing, photography enthusiasts, and anyone looking to combine exercise with exploration.",
      links: [
        "Urban cycling safety", 
        "City landmarks guide", 
        "Group cycling tips", 
        "Bike maintenance basics", 
        "Photography on the go"
      ]
    },
    {
      id: 6,
      title: "Outdoor Boot Camp",
      description: "Organize a high-intensity boot camp workout using park equipment and bodyweight exercises. Great for those looking for a challenging workout and motivation from a group setting.",
      links: [
        "Bodyweight exercises", 
        "Outdoor workout spaces", 
        "Boot camp routines", 
        "Exercise modifications", 
        "Group fitness motivation"
      ]
    },
    {
      id: 7,
      title: "Paddleboarding Excursion",
      description: "Host a paddleboarding session on a local lake or calm waterway. Perfect for building core strength and enjoying nature from a unique perspective, suitable for beginners.",
      links: [
        "Paddleboarding basics", 
        "Water safety tips", 
        "Best paddleboarding locations", 
        "Core strengthening exercises", 
        "Water sports equipment"
      ]
    },
    {
      id: 8,
      title: "Rock Climbing Workshop",
      description: "Arrange a beginner-friendly rock climbing session at a local climbing gym or outdoor spot. Great for building strength, problem-solving skills, and overcoming personal challenges.",
      links: [
        "Climbing basics", 
        "Safety equipment guide", 
        "Indoor vs outdoor climbing", 
        "Upper body exercises", 
        "Mental focus techniques"
      ]
    },
    {
      id: 9,
      title: "Community Garden Day",
      description: "Organize a day of planting and maintaining a community garden. Combines light physical activity with environmental benefits and the satisfaction of growing your own food.",
      links: [
        "Urban gardening basics", 
        "Seasonal planting guide", 
        "Community garden etiquette", 
        "Sustainable gardening tips", 
        "Harvest celebration ideas"
      ]
    },
    {
      id: 10,
      title: "Dance Fitness Party",
      description: "Host a dance workout session with upbeat music and simple choreography. Fun for all fitness levels and a great way to burn calories while having a blast with friends.",
      links: [
        "Simple dance moves", 
        "Playlist creation tips", 
        "Group dance warmups", 
        "Space requirements", 
        "Post-dance stretches"
      ]
    }
  ];

  // Sample data for forum posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Alex',
      type: 'activity',
      title: 'Morning Run at Central Park',
      description: 'Join me for a 5K run around the park tomorrow at 7 AM!',
      points: 30,
      likes: 5,
      liked: false,
      replies: [
        { id: 1, username: 'Jamie', content: 'Count me in!', timestamp: '2h ago' },
        { id: 2, username: 'Taylor', content: 'Sounds fun, I will be there!', timestamp: '1h ago' }
      ]
    },
    {
      id: 2,
      username: 'Morgan',
      type: 'challenge',
      title: '100 Push-ups Challenge',
      description: 'Complete 100 push-ups in under 10 minutes. Submit your video as proof!',
      points: 75,
      likes: 12,
      liked: false,
      replies: [
        { 
          id: 3, 
          username: 'Jordan', 
          content: 'Done! That was tough!', 
          timestamp: '5h ago',
          hasProof: true
        }
      ]
    },
    {
      id: 3,
      username: 'Casey',
      type: 'activity',
      title: 'Weekend Hiking Trip',
      description: 'Planning a hike to Eagle Mountain this Saturday. Anyone interested?',
      points: 50,
      likes: 8,
      liked: false,
      replies: []
    }
  ]);

  // Handle post creation
  const handleCreatePost = () => {
    if (newPostTitle.trim() === '' || newPostDescription.trim() === '') {
      return; // Don't create empty posts
    }
    
    const newPost = {
      id: Date.now(), // Use timestamp as unique ID
      username: currentUsername,
      type: postType,
      title: newPostTitle,
      description: newPostDescription,
      points: parseInt(newPostPoints) || 0,
      likes: 0,
      liked: false,
      replies: []
    };
    
    // Add to beginning of array for newest first
    setPosts([newPost, ...posts]);
    
    // Reset form and close modal
    setNewPostTitle('');
    setNewPostDescription('');
    setNewPostPoints('');
    setShowPostModal(false);
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setNewPostTitle(suggestion.title);
    setNewPostDescription(suggestion.description);
    setShowSuggestionsModal(false);
  };

  // Handle like/unlike post
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Handle adding a reply
  const handleAddReply = (postId) => {
    if (replyText.trim() === '') {
      return; // Don't add empty replies
    }
    
    const timestamp = 'Just now';
    const newReply = {
      id: Date.now(),
      username: currentUsername,
      content: replyText,
      timestamp
    };
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    }));
    
    setReplyText('');
  };

  // Render a single post
  const renderPost = (post) => {
    return (
      <View key={post.id} style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>{post.username.charAt(0)}</Text>
            </View>
            <Text style={styles.username}>{post.username}</Text>
          </View>
          <View style={styles.postTypeTag}>
            <Text style={styles.postTypeText}>
              {post.type === 'activity' ? 'Activity' : 'Challenge'}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.postContent}
          onPress={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
        >
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          
          <View style={styles.pointsContainer}>
            <Ionicons name="flame" size={16} color={colors.primaryOrange} />
            <Text style={styles.pointsText}>{post.points} points</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.postActions}>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleLikePost(post.id)}
            >
              <Ionicons 
                name={post.liked ? "heart" : "heart-outline"} 
                size={22} 
                color={post.liked ? colors.primaryOrange : colors.textMedium} 
              />
              <Text 
                style={[
                  styles.actionText, 
                  post.liked && {color: colors.primaryOrange}
                ]}
              >
                {post.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
            >
              <Ionicons name="chatbubble-outline" size={22} color={colors.textMedium} />
              <Text style={styles.actionText}>{post.replies.length}</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.participateButtons}>
            <TouchableOpacity style={[styles.participateButton, styles.declineButton]}>
              <Text style={styles.declineText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.participateButton, styles.acceptButton]}>
              <Text style={styles.acceptText}>
                {post.type === 'challenge' ? 'Accept Challenge' : 'Join Activity'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {expandedPost === post.id && (
          <View style={styles.repliesContainer}>
            <Text style={styles.repliesHeader}>
              {post.replies.length > 0 ? 'Replies' : 'No replies yet'}
            </Text>
            
            {post.replies.map(reply => (
              <View key={reply.id} style={styles.replyItem}>
                <View style={styles.replyHeader}>
                  <View style={styles.miniUserAvatar}>
                    <Text style={styles.miniAvatarText}>{reply.username.charAt(0)}</Text>
                  </View>
                  <Text style={styles.replyUsername}>{reply.username}</Text>
                  <Text style={styles.replyTimestamp}>{reply.timestamp}</Text>
                </View>
                <Text style={styles.replyContent}>{reply.content}</Text>
                
                {reply.hasProof && (
                  <TouchableOpacity style={styles.proofContainer}>
                    <Ionicons name="videocam" size={16} color={colors.primaryOrange} />
                    <Text style={styles.proofText}>View Proof</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            <View style={styles.addReplyContainer}>
              <TextInput
                style={styles.replyInput}
                placeholder="Add a reply..."
                placeholderTextColor={colors.placeholder}
                value={replyText}
                onChangeText={setReplyText}
              />
              {post.type === 'challenge' && (
                <TouchableOpacity style={styles.attachProofButton}>
                  <Ionicons name="attach" size={20} color={colors.textMedium} />
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => handleAddReply(post.id)}
              >
                <Ionicons 
                  name="send" 
                  size={20} 
                  color={replyText.trim() ? colors.primaryOrange : colors.placeholder} 
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  // Add this helper function above renderSuggestionItem
  const getActivityImage = (id) => {
    const images = {
      1: require('../assets/Activities/park_yoga.jpg'),
      2: require('../assets/Activities/community_run.jpg'),
      3: require('../assets/Activities/beach_volleyball.webp'),
      4: require('../assets/Activities/hiking.webp'),
      5: require('../assets/Activities/city_cyling.jpg'),
      6: require('../assets/Activities/boot_camp.jpg'),
      7: require('../assets/Activities/paddleboarding.jpg'),
      8: require('../assets/Activities/rock_climbing.jpg'),
      9: require('../assets/Activities/community_garden.jpg'),
      10: require('../assets/Activities/dance_fitness.jpg'),
    };
    return images[id];
  };

  // Render a suggestion item
  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.suggestionCard}
      onPress={() => handleSelectSuggestion(item)}
    >
      <View style={styles.suggestionContent}>
        <View style={styles.suggestionTextContent}>
          <Text style={styles.suggestionTitle}>{item.title}</Text>
          <Text style={styles.suggestionDescription}>{item.description}</Text>
          
          <Text style={styles.helpfulLinksHeader}>Helpful Links:</Text>
          <View style={styles.linksList}>
            {item.links.map((link, index) => (
              <View key={index} style={styles.linkItem}>
                <Ionicons name="link" size={12} color={colors.primaryOrange} />
                <Text style={styles.linkText}>{link}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.suggestionImageContainer}>
          <Image
            source={getActivityImage(item.id)}
            style={{
              width: 70,
              height: 70,
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  // Handle the suggestion button press - key fix!
  const handleSuggestionsPress = () => {
    setShowPostModal(false); // Close the post modal first
    setTimeout(() => {
      setShowSuggestionsModal(true); // Open the suggestions modal after a slight delay
    }, 300);
  };

  // Render suggestions modal
  const renderSuggestionsModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuggestionsModal}
        onRequestClose={() => setShowSuggestionsModal(false)}
      >
        <View style={styles.suggestionsModalContainer}>
          <View style={styles.suggestionsModalContent}>
            <View style={styles.suggestionsModalHeader}>
              <Text style={styles.suggestionsModalTitle}>Activity Suggestions</Text>
              <TouchableOpacity onPress={() => {
                setShowSuggestionsModal(false);
                setTimeout(() => {
                  setShowPostModal(true); // Reopen the post modal after a delay
                }, 300);
              }}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.suggestionsModalSubtitle}>
              Select an activity suggestion to use as your post
            </Text>
            
            <FlatList
              data={activitySuggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsList}
            />
          </View>
        </View>
      </Modal>
    );
  };

  // New Post Modal
  const renderNewPostModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPostModal}
        onRequestClose={() => setShowPostModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Post</Text>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <Ionicons name="close" size={24} color={colors.textDark} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.postTypeSelection}>
              <TouchableOpacity 
                style={[
                  styles.typeButton, 
                  postType === 'activity' && styles.typeButtonActive
                ]}
                onPress={() => setPostType('activity')}
              >
                <Text style={[
                  styles.typeButtonText,
                  postType === 'activity' && styles.typeButtonTextActive
                ]}>Activity</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.typeButton, 
                  postType === 'challenge' && styles.typeButtonActive
                ]}
                onPress={() => setPostType('challenge')}
              >
                <Text style={[
                  styles.typeButtonText,
                  postType === 'challenge' && styles.typeButtonTextActive
                ]}>Challenge</Text>
              </TouchableOpacity>
            </View>
            
            {/* Suggestions button - only show for activity type */}
            {postType === 'activity' && (
              <TouchableOpacity 
                style={styles.suggestionsButton}
                onPress={handleSuggestionsPress} // Using our new handler
              >
                <Ionicons name="bulb-outline" size={20} color="#FFFFFF" />
                <Text style={styles.suggestionsButtonText}>See Suggestions</Text>
              </TouchableOpacity>
            )}
            
            <TextInput
              style={styles.inputField}
              placeholder="Title"
              placeholderTextColor={colors.placeholder}
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />
            
            <TextInput
              style={[styles.inputField, styles.textArea]}
              placeholder="Description"
              placeholderTextColor={colors.placeholder}
              multiline={true}
              numberOfLines={4}
              value={newPostDescription}
              onChangeText={setNewPostDescription}
            />
            
            <View style={styles.pointsInput}>
              <Text style={styles.pointsInputLabel}>Points:</Text>
              <TextInput
                style={styles.pointsInputField}
                placeholder="0"
                placeholderTextColor={colors.placeholder}
                keyboardType="number-pad"
                value={newPostPoints}
                onChangeText={setNewPostPoints}
              />
            </View>
            
            {postType === 'challenge' && (
              <View style={styles.proofRequirementContainer}>
                <Text style={styles.proofRequirementLabel}>Proof Required:</Text>
                <View style={styles.proofTypeRow}>
                  <TouchableOpacity 
                    style={[
                      styles.proofTypeButton,
                      proofType === 'photo' && styles.proofTypeButtonActive
                    ]}
                    onPress={() => setProofType('photo')}
                  >
                    <Ionicons 
                      name="camera" 
                      size={20} 
                      color={proofType === 'photo' ? colors.primaryOrange : colors.textMedium} 
                    />
                    <Text 
                      style={[
                        styles.proofTypeText,
                        proofType === 'photo' && styles.proofTypeTextActive
                      ]}
                    >
                      Photo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.proofTypeButton,
                      proofType === 'video' && styles.proofTypeButtonActive
                    ]}
                    onPress={() => setProofType('video')}
                  >
                    <Ionicons 
                      name="videocam" 
                      size={20} 
                      color={proofType === 'video' ? colors.primaryOrange : colors.textMedium} 
                    />
                    <Text 
                      style={[
                        styles.proofTypeText,
                        proofType === 'video' && styles.proofTypeTextActive
                      ]}
                    >
                      Video
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.proofTypeButton,
                      proofType === 'location' && styles.proofTypeButtonActive
                    ]}
                    onPress={() => setProofType('location')}
                  >
                    <Ionicons 
                      name="location" 
                      size={20} 
                      color={proofType === 'location' ? colors.primaryOrange : colors.textMedium} 
                    />
                    <Text 
                      style={[
                        styles.proofTypeText,
                        proofType === 'location' && styles.proofTypeTextActive
                      ]}
                    >
                      Location
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            <TouchableOpacity 
              style={[
                styles.postButton,
                (!newPostTitle.trim() || !newPostDescription.trim()) && styles.postButtonDisabled
              ]}
              onPress={handleCreatePost}
              disabled={!newPostTitle.trim() || !newPostDescription.trim()}
            >
              <Text style={styles.postButtonText}>
                {postType === 'activity' ? 'Post Activity' : 'Post Challenge'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity Feed</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={22} color={colors.textDark} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {posts.map(post => renderPost(post))}
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={() => setShowPostModal(true)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.createPostText}>Create Post</Text>
      </TouchableOpacity>
      
      {renderNewPostModal()}
      {renderSuggestionsModal()}
    </SafeAreaView>
  );
}