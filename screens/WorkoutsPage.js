import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  FlatList,
  TextInput,
  Animated,
  Alert,
  Linking,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';


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

const exerciseLibrary = [
  {
    id: '1',
    title: 'Squats',
    image: require('../assets/WorkoutLibrary/squat.jpg'),
    description: 'A compound exercise that works multiple muscle groups in the lower body.',
    muscles: 'Quadriceps, Glutes, Hamstrings, Calves',
    steps: [
      'Stand with feet shoulder-width apart',
      'Keep back straight, bend knees and lower your body',
      'Go as low as comfortable, ideally until thighs are parallel to the floor',
      'Push through heels to return to starting position',
    ],
    videoLink: 'https://www.youtube.com/watch?v=xqvCmoLULNY',
  },
  {
    id: '2',
    title: 'Push-ups',
    image: require('../assets/WorkoutLibrary/pushup.jpg'),
    description: 'A classic bodyweight exercise that targets the upper body.',
    muscles: 'Chest, Shoulders, Triceps, Core',
    steps: [
      'Start in a plank position with hands slightly wider than shoulder-width',
      'Keep body in a straight line from head to heels',
      'Lower your body until chest nearly touches the floor',
      'Push back up to the starting position',
    ],
    videoLink: 'https://www.youtube.com/watch?v=WDIpL0pjun0',
  },
  {
    id: '3',
    title: 'Lunges',
    image: require('../assets/WorkoutLibrary/lunge.png'),
    description: 'A unilateral exercise that improves balance and leg strength.',
    muscles: 'Quadriceps, Glutes, Hamstrings',
    steps: [
      'Stand with feet hip-width apart',
      'Take a step forward with one leg',
      'Lower your body until both knees are bent at 90 degrees',
      'Push through the front heel to return to starting position',
    ],
    videoLink: 'https://www.youtube.com/watch?v=tTej-ax9XiA&pp=ygUObHVuZ2UgdHV0b3JpYWw%3D',
  },
  {
    id: '4',
    title: 'Plank',
    image: require('../assets/WorkoutLibrary/plank.jpg'),
    description: 'An isometric core exercise that improves stability.',
    muscles: 'Core, Shoulders, Back',
    steps: [
      'Start in a forearm plank position with elbows directly under shoulders',
      'Keep body in a straight line from head to heels',
      'Engage core and hold the position',
      'Breathe normally and maintain proper form',
    ],
    videoLink: 'https://www.youtube.com/watch?v=6LqqeBtFn9M&t=7s',
  },
  {
    id: '5',
    title: 'Deadlift',
    image: require('../assets/WorkoutLibrary/deadlift.jpg'),
    description: 'A compound movement that targets the posterior chain.',
    muscles: 'Hamstrings, Glutes, Lower Back, Core',
    steps: [
      'Stand with feet hip-width apart, barbell over mid-foot',
      'Bend at hips and knees to lower and grab the bar',
      'Keep back flat, chest up, and core engaged',
      'Stand up by driving hips forward while keeping the bar close to legs',
    ],
    videoLink: 'https://www.youtube.com/watch?v=r4MzxtBKyNE',
  },
  {
    id: '6',
    title: 'Bicep Curls',
    image: require('../assets/WorkoutLibrary/bicep.webp'),
    description: 'An isolation exercise focusing on the biceps.',
    muscles: 'Biceps, Forearms',
    steps: [
      'Stand with feet shoulder-width apart, holding dumbbells at your sides',
      'Keep elbows close to your torso',
      'Curl the weights up toward your shoulders',
      'Lower the weights with control back to starting position',
    ],
    videoLink: 'https://www.youtube.com/watch?v=XE_pHwbst04',
  },
];

const workoutRoutine = [
  { id: '1', name: 'Jumping Jacks', duration: 30, description: 'Full body warm-up' },
  { id: '2', name: 'Push-ups', duration: 45, description: 'Upper body strength' },
  { id: '3', name: 'Squats', duration: 60, description: 'Lower body power' },
  { id: '4', name: 'Plank', duration: 30, description: 'Core stability' },
  { id: '5', name: 'Lunges', duration: 45, description: 'Leg strength and balance' },
  { id: '6', name: 'Mountain Climbers', duration: 30, description: 'Cardio and core' },
  { id: '7', name: 'Cool Down Stretches', duration: 60, description: 'Flexibility and recovery' },
];

export default function WorkoutsPage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [recordMode, setRecordMode] = useState(false);
  const [facing, setFacing] = useState('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [recording, setRecording] = useState(false);
  const [jumpCount, setJumpCount] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef(null);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [challengeModalVisible, setChallengeModalVisible] = useState(false);
  
  const [buildWorkoutModalVisible, setBuildWorkoutModalVisible] = useState(false);
  const [customWorkoutName, setCustomWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([
    { id: 'pushups', name: 'Push-ups', duration: 30, description: 'Standard push-ups for upper body strength' },
    { id: 'squats', name: 'Squats', duration: 30, description: 'Body weight squats for leg strength' },
    { id: 'lunges', name: 'Lunges', duration: 30, description: 'Forward lunges for leg workout' },
    { id: 'plank', name: 'Plank', duration: 30, description: 'Core stability exercise' },
    { id: 'burpees', name: 'Burpees', duration: 30, description: 'Full body exercise' },
    { id: 'jumping_jacks', name: 'Jumping Jacks', duration: 30, description: 'Cardio exercise' },
    { id: 'mountain_climbers', name: 'Mountain Climbers', duration: 30, description: 'Core and cardio exercise' },
    { id: 'crunches', name: 'Crunches', duration: 30, description: 'Core strengthening exercise' },
    { id: 'high_knees', name: 'High Knees', duration: 30, description: 'Cardio exercise' },
    { id: 'side_planks', name: 'Side Planks', duration: 30, description: 'Core stability exercise for obliques' },
    { id: 'tricep_dips', name: 'Tricep Dips', duration: 30, description: 'Tricep strengthening exercise' },
    { id: 'wall_sit', name: 'Wall Sit', duration: 30, description: 'Isometric leg exercise' },
    { id: 'bicycle_crunches', name: 'Bicycle Crunches', duration: 30, description: 'Core exercise for abs and obliques' },
    { id: 'superman', name: 'Superman', duration: 30, description: 'Back strengthening exercise' },
    { id: 'glute_bridges', name: 'Glute Bridges', duration: 30, description: 'Exercise for glutes and hamstrings' },
  ]);
  
  const [challengeData, setChallengeData] = useState({
    friendUsername: '',
    description: '',
    expirationDays: 3,
    pointValue: 10,
  });

  const [aiCoachMessage, setAiCoachMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI fitness coach. Ask me anything about workouts, form, or nutrition!' }
  ]);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await requestCameraPermission();
    const { status: micStatus } = await requestMicrophonePermission();

    if (cameraStatus !== 'granted' || micStatus !== 'granted') {
      Alert.alert(
        'Permissions required',
        'Camera and Microphone permissions are required to record your workout.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        { cancelable: false }
      );
    }
    return cameraStatus === 'granted' && micStatus === 'granted';
  };

  const sendMessageToAiCoach = async () => {
    if (!aiCoachMessage.trim()) return;

    const userMessage = aiCoachMessage.trim();
    setAiCoachMessage('');
    setIsAiThinking(true);

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=AIzaSyBa80AkcHCRJrVLh9YYSKQHyKWMNSKqo1g', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a fitness coach assistant. Please provide a concise, helpful response to: ${userMessage}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 200,
                    topP: 0.8,
                    topK: 40
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}: ${JSON.stringify(data)}`);
        }

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.error('Unexpected API response structure:', data);
            throw new Error('Invalid API response format');
        }

        // Format the AI response to handle bold text
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        setChatHistory(prev => [...prev, { 
            role: 'assistant', 
            content: aiResponse,
            containsBold: aiResponse.includes('**') // Flag to indicate if message contains bold text
        }]);

    } catch (error) {
        console.error('AI Coach error:', error);
        setChatHistory(prev => [...prev, {
            role: 'assistant',
            content: `Sorry, I encountered an error: ${error.message}. Please try again.`
        }]);
    } finally {
        setIsAiThinking(false);
    }
};

  const startWorkout = () => setWorkoutActive(true);
  const startWorkoutTimer = () => {
    setWorkoutStarted(true);
    setTimeRemaining(workoutRoutine[0].duration);
    setTimerActive(true);
  };

  const nextExercise = () => {
    if (currentExerciseIndex < workoutRoutine.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setTimeRemaining(workoutRoutine[currentExerciseIndex + 1].duration);
    } else {
      setWorkoutActive(false);
      setWorkoutStarted(false);
      setCurrentExerciseIndex(0);
      setTimerActive(false);
      setWorkoutComplete(true);
    }
  };

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setTimeout(() => nextExercise(), 500);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [timerActive, currentExerciseIndex]);

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const startRecording = useCallback(async () => {
    if (!cameraRef.current) {
      Alert.alert('Error', 'Camera not ready');
      return;
    }

    try {
      setRecording(true);
      
      // Configure recording options
      const recordingOptions = {
        maxDuration: 60,
        quality: '360p',
        mute: false,
        videoOutput: 'mp4',
        maxFileSize: 3000000000,
      };

      // Start recording with a proper delay to initialize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const videoData = await cameraRef.current.recordAsync(recordingOptions);
      
      if (!videoData || !videoData.uri) {
        throw new Error('No video data received');
      }

      setRecording(false);
      console.log('Video saved to:', videoData.uri);
      await uploadVideo(videoData.uri);

    } catch (error) {
      console.error("Error during recording:", error);
      setRecording(false);
      Alert.alert('Recording Error', 'Failed to record video. Please try again.');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!recording || !cameraRef.current) return;

    try {
      await cameraRef.current.stopRecording();
      setRecording(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
      Alert.alert('Error', 'Failed to stop recording');
    }
  }, [recording]);

  const saveCustomWorkout = () => {
    if (customWorkoutName.trim() === '') {
      Alert.alert('Error', 'Please enter a name for your workout');
      return;
    }
  
    if (selectedExercises.length === 0) {
      Alert.alert('Error', 'Please select at least one exercise');
      return;
    }
  
    // Here you would typically save to a database or local storage
    // For now, we'll just show a confirmation and close the modal
    Alert.alert('Success', `Workout "${customWorkoutName}" has been saved!`);
    setBuildWorkoutModalVisible(false);
    setCustomWorkoutName('');
    setSelectedExercises([]);
  };

  const uploadVideo = async (uri) => {
    setIsUploading(true);
    const formData = new FormData();
    
    // Convert the Expo file URI to a blob-like object
    formData.append('file', {
      uri: uri,
      type: 'video/mp4',
      name: 'jumping_jacks.mp4'
    });

    try {
      // Replace YOUR_LOCAL_IP with your computer's IP address (e.g., 192.168.1.100)
      const res = await fetch('http://192.168.12.123:8000/upload/jumping_jacks', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      console.log('Upload response:', json); // Add this for debugging
      setJumpCount(json.jumping_jack_count);
    } catch (e) {
      console.error('Upload error:', e);
      Alert.alert(
        'Upload failed', 
        'Failed to upload video. Please check your network connection and try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const enterRecordMode = async () => {
    const hasPermissions = await requestPermissions();
    if (hasPermissions) {
      //Give the camera a moment to initialize.
      setTimeout(() => setRecordMode(true), 250);
    }
  };

  const resetView = () => setJumpCount(null);

  const renderExerciseCard = ({ item }) => (
    <TouchableOpacity style={styles.exerciseCard} onPress={() => openExerciseModal(item)}>
      <Image source={item.image} style={styles.exerciseImage} resizeMode="cover" />
      <Text style={styles.exerciseCardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderCameraView = () => (
    <View style={{ flex: 1 }}>
      <CameraView mode = "video" style={{ flex: 1 }} facing={facing} ref={cameraRef} enableZoomGesture>
        <View style={styles.cameraControlsContainer}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.cameraBtnContainer}
              onPress={() => setFacing((prev) => (prev === 'back' ? 'front' : 'back'))}
            >
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.recordButton} onPress={recording ? stopRecording : startRecording}>
              <View style={[styles.recordIndicator, recording && styles.recording]} />
            </TouchableOpacity>
          </View>
          <View style={styles.recordingInfo}>
            <Text style={styles.timerText}>{recording ? 'Recording...' : 'Tap record to start'}</Text>
          </View>
          {recording && (
            <TouchableOpacity style={styles.cancelButton} onPress={stopRecording}>
              <Text style={styles.cancelText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
      {isUploading && (
        <View style={styles.uploadOverlay}>
          <Text style={styles.uploadText}>Uploading...</Text>
        </View>
      )}
    </View>
  );

  const renderWorkoutPage = () => (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.startButtonGradient}>
            <TouchableOpacity style={styles.startButton} onPress={workoutComplete ? null : startWorkout}>
              <Text style={styles.startButtonText}>{workoutComplete ? 'Workout Completed!' : 'Start Workout'}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.sectionTitle}>Today's routine</Text>

          <View style={styles.exercisesContainer}>
            <Text style={styles.exercisesTitle}>DETAILED EXERCISES WITH TIMES...</Text>

            <View style={styles.aiCoachContainer}>
              <Text style={styles.aiCoachTitle}>AI Coach</Text>
              <ScrollView style={styles.chatHistory}>
                {chatHistory.map((message, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.messageContainer,
                      message.role === 'user' ? styles.userMessage : styles.aiMessage
                    ]}
                  >
                    {message.containsBold ? (
                      <Text style={styles.messageText}>
                        {message.content.split(/(\*\*.*?\*\*)/).map((part, index) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            // Remove ** and apply bold style
                            return (
                              <Text key={index} style={{ fontWeight: 'bold' }}>
                                {part.slice(2, -2)}
                              </Text>
                            );
                          }
                          return <Text key={index}>{part}</Text>;
                        })}
                      </Text>
                    ) : (
                      <Text style={styles.messageText}>{message.content}</Text>
                    )}
                  </View>
                ))}
                {isAiThinking && (
                  <View style={styles.aiMessage}>
                    <ActivityIndicator color={colors.primaryOrange} />
                  </View>
                )}
              </ScrollView>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={aiCoachMessage}
                  onChangeText={setAiCoachMessage}
                  placeholder="Ask your AI coach..."
                  placeholderTextColor="#999"
                  multiline
                />
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={sendMessageToAiCoach}
                  disabled={!aiCoachMessage.trim()}
                >
                  <Ionicons name="send" size={24} color={aiCoachMessage.trim() ? colors.primaryOrange : '#999'} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save This Routine</Text>
              <Ionicons name="bookmark-outline" size={16} color={colors.primaryOrange} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => setBuildWorkoutModalVisible(true)}
          >
            <Text style={styles.featureButtonText}>Build your own workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.featureButton, { backgroundColor: '#FFECEC' }]}
            onPress={() => setWorkoutComplete(false)}
          >
            <Text style={[styles.featureButtonText, { color: '#FF3B30' }]}>🔁 Reset Workout (Dev Only)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureButton} onPress={() => setChallengeModalVisible(true)}>
            <Text style={styles.featureButtonText}>Challenge your friend</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Explore More</Text>
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.libraryTitle}>Workout Library</Text>
          <Text style={styles.librarySubtitle}>
            Tap on any exercise to learn more about proper form and technique.
          </Text>

          <FlatList
            data={exerciseLibrary}
            renderItem={renderExerciseCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.exerciseRow}
            scrollEnabled={false}
          />

          <TouchableOpacity
            style={styles.exerciseCard}
            onPress={() =>
              openExerciseModal({
                id: 'jumping_jacks',
                title: 'Jumping Jacks',
                image: require('../assets/WorkoutLibrary/jumpingjack.jpeg'),
                description: 'A full-body exercise that increases cardiovascular fitness and burns calories.',
                muscles: 'Full Body, Legs, Core, Shoulders',
                steps: [
                  'Stand upright with your feet together',
                  'Jump up while spreading your feet and swinging your arms',
                  'Land softly and return immediately to the starting position',
                  'Repeat for the set duration',
                ],
                videoLink: 'https://www.youtube.com/watch?v=uLVt6u15L98',
              })
            }
          >
            <Image
              source={require('../assets/WorkoutLibrary/jumpingjack.jpeg')}
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            <Text style={styles.exerciseCardTitle}>Jumping Jacks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  const renderWorkoutActive = () => (
    <View style={styles.workoutOverlay}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#FF9500', '#FF7700']} style={styles.workoutGradient}>
          {!workoutStarted ? (
            <View style={styles.workoutPreview}>
              <View style={styles.workoutHeader}>
                <TouchableOpacity style={styles.closeWorkoutButton} onPress={() => setWorkoutActive(false)}>
                  <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.workoutTitle}>Today's Workout</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={styles.timelineContainer}>
                <View style={styles.timelineLine} />

                {workoutRoutine.map((exercise, index) => (
                  <Animated.View
                    key={exercise.id}
                    style={[
                      styles.timelineItem,
                      {
                        opacity: 1,
                        transform: [{ translateY: 0 }],
                      },
                    ]}
                  >
                    <View style={styles.timelineDot} />
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{exercise.name}</Text>
                      <Text style={styles.timelineDuration}>{exercise.duration} seconds</Text>
                      <Text style={styles.timelineDescription}>{exercise.description}</Text>
                    </View>
                  </Animated.View>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.startTimerButton} onPress={startWorkoutTimer}>
                <Text style={styles.startTimerText}>Start Timer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.activeWorkout}>
              <View style={styles.workoutHeader}>
                <TouchableOpacity
                  style={styles.closeWorkoutButton}
                  onPress={() => {
                    setWorkoutActive(false);
                    setWorkoutStarted(false);
                    setCurrentExerciseIndex(0);
                    setTimerActive(false);
                  }}
                >
                  <Ionicons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.workoutTitle}>
                  {currentExerciseIndex + 1}/{workoutRoutine.length}
                </Text>
                <TouchableOpacity style={styles.pauseButton} onPress={() => setTimerActive((prev) => !prev)}>
                  <Ionicons name={timerActive ? 'pause' : 'play'} size={24} color="#FFF" />
                </TouchableOpacity>
              </View>

              {workoutComplete && (
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>Workout Completed!</Text>
                  <Text style={{ fontSize: 20, color: 'white', marginTop: 12 }}>+10 Points 🎉</Text>
                </View>
              )}

              <View style={styles.timerContainer}>
                <Text style={styles.currentExerciseName}>{workoutRoutine[currentExerciseIndex].name}</Text>
                <Text style={styles.currentExerciseDescription}>
                  {workoutRoutine[currentExerciseIndex].description}
                </Text>

                <View style={styles.timerCircle}>
                  <Text style={styles.timerText}>{timeRemaining}</Text>
                </View>

                <TouchableOpacity style={styles.skipButton} onPress={nextExercise}>
                  <Text style={styles.skipButtonText}>Skip</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>Coming up next:</Text>
                <View style={styles.progressTimeline}>
                  {workoutRoutine.map((exercise, index) => (
                    <View
                      key={exercise.id}
                      style={[
                        styles.progressItem,
                        index < currentExerciseIndex && styles.completedExercise,
                        index === currentExerciseIndex && styles.activeExercise,
                      ]}
                    >
                      <View
                        style={[
                          styles.progressDot,
                          index < currentExerciseIndex && styles.completedDot,
                          index === currentExerciseIndex && styles.activeDot,
                        ]}
                      />
                      <Text
                        style={[
                          styles.progressText,
                          index === currentExerciseIndex && styles.activeText,
                        ]}
                      >
                        {exercise.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </LinearGradient>
      </SafeAreaView>
    </View>
  );

  const renderModalContent = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {selectedExercise && (
            <>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedExercise.title}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color={colors.textDark} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScrollView}>
                <Image source={selectedExercise.image} style={styles.modalImage} resizeMode="cover" />

                <Text style={styles.modalSectionTitle}>Description</Text>
                <Text style={styles.modalText}>{selectedExercise.description}</Text>

                <Text style={styles.modalSectionTitle}>Muscles Worked</Text>
                <Text style={styles.modalText}>{selectedExercise.muscles}</Text>

                <Text style={styles.modalSectionTitle}>How to Perform</Text>
                {selectedExercise.steps.map((step, index) => (
                  <Text key={index} style={styles.stepText}>
                    <Text style={styles.stepNumber}>{index + 1}.</Text> {step}
                  </Text>
                ))}

                <TouchableOpacity style={styles.videoButton}>
                  <Ionicons name="play-circle" size={20} color="#FFF" />
                  <Text style={styles.videoButtonText}>Watch Tutorial</Text>
                </TouchableOpacity>

                {selectedExercise && selectedExercise.title === 'Jumping Jacks' && (
                  <TouchableOpacity
                    style={styles.startRecordingButton}
                    onPress={() => {
                      setModalVisible(false);
                      enterRecordMode();
                    }}
                  >
                    <Text style={styles.startRecordingButtonText}>Begin Recording</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderBuildWorkoutModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={buildWorkoutModalVisible}
      onRequestClose={() => setBuildWorkoutModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { height: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Build Your Workout</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setBuildWorkoutModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.challengeInput, { minHeight: 40, height: 40, marginBottom: 15 }]}
            placeholder="Enter workout name"
            value={customWorkoutName}
            onChangeText={setCustomWorkoutName}
          />

          <View style={styles.workoutBuilderContainer}>
            <View style={styles.workoutColumn}>
              <Text style={styles.workoutColumnTitle}>Available Exercises</Text>
              <FlatList
                data={availableExercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.exerciseTag}
                    onPress={() => {
                      if (!selectedExercises.find(e => e.id === item.id)) {
                        setSelectedExercises([...selectedExercises, { ...item }]);
                      }
                    }}
                  >
                    <Text style={styles.exerciseTagText}>{item.name}</Text>
                    <Text style={styles.exerciseTagDuration}>{item.duration}s</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={styles.workoutColumn}>
              <Text style={styles.workoutColumnTitle}>Your Workout</Text>
              <Text style={styles.workoutInstructions}>
                Drag exercises here and reorder them
              </Text>
              <FlatList
                data={selectedExercises}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item, index }) => (
                  <View style={[styles.exerciseTag, styles.selectedExerciseTag]}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.exerciseTagText}>{item.name}</Text>
                      <Text style={styles.exerciseTagDuration}>{item.duration}s</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => {
                          const updated = [...selectedExercises];
                          updated.splice(index, 1);
                          updated.splice(index - 1, 0, item);
                          setSelectedExercises(updated);
                        }}
                        disabled={index === 0}
                      >
                        <Ionicons name="arrow-up" size={20} color={index === 0 ? '#ccc' : colors.primaryOrange} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const updated = [...selectedExercises];
                          updated.splice(index, 1);
                          updated.splice(index + 1, 0, item);
                          setSelectedExercises(updated);
                        }}
                        disabled={index === selectedExercises.length - 1}
                      >
                        <Ionicons name="arrow-down" size={20} color={index === selectedExercises.length - 1 ? '#ccc' : colors.primaryOrange} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const updated = [...selectedExercises];
                          updated.splice(index, 1);
                          setSelectedExercises(updated);
                        }}
                      >
                        <Ionicons name="close" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.saveCustomWorkoutButton} 
            onPress={saveCustomWorkout}
          >
            <Text style={styles.saveCustomWorkoutText}>Save Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderChallengeModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={challengeModalVisible}
      onRequestClose={() => setChallengeModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Challenge a Friend</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setChallengeModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScrollView}>
            <Text style={styles.modalSectionTitle}>Friend Username</Text>
            <TextInput
              style={[styles.challengeInput, { minHeight: 40, height: 40 }]}
              placeholder="Enter friend's username"
              numberOfLines={1}
              value={challengeData.friendUsername}
              onChangeText={(text) => setChallengeData({ ...challengeData, friendUsername: text })}
            />
            <Text style={styles.modalSectionTitle}>Challenge Description</Text>
            <TextInput
              style={styles.challengeInput}
              placeholder="Describe your challenge..."
              multiline
              numberOfLines={3}
              value={challengeData.description}
              onChangeText={(text) => setChallengeData({ ...challengeData, description: text })}
            />

            <Text style={styles.modalSectionTitle}>Expiration Time</Text>
            <View style={styles.expirationSelector}>
              <TouchableOpacity
                style={[
                  styles.expirationOption,
                  challengeData.expirationDays === 1 && styles.expirationSelected,
                ]}
                onPress={() => setChallengeData({ ...challengeData, expirationDays: 1 })}
              >
                <Text
                  style={[
                    styles.expirationText,
                    challengeData.expirationDays === 1 && styles.expirationTextSelected,
                  ]}
                >
                  24 hrs
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.expirationOption,
                  challengeData.expirationDays === 3 && styles.expirationSelected,
                ]}
                onPress={() => setChallengeData({ ...challengeData, expirationDays: 3 })}
              >
                <Text
                  style={[
                    styles.expirationText,
                    challengeData.expirationDays === 3 && styles.expirationTextSelected,
                  ]}
                >
                  3 days
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.expirationOption,
                  challengeData.expirationDays === 7 && styles.expirationSelected,
                ]}
                onPress={() => setChallengeData({ ...challengeData, expirationDays: 7 })}
              >
                <Text
                  style={[
                    styles.expirationText,
                    challengeData.expirationDays === 7 && styles.expirationTextSelected,
                  ]}
                >
                  7 days
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSectionTitle}>Point Value</Text>
            <View style={styles.pointSelector}>
              <TouchableOpacity
                style={styles.pointAdjust}
                onPress={() =>
                  setChallengeData({
                    ...challengeData,
                    pointValue: Math.max(5, challengeData.pointValue - 5),
                  })
                }
              >
                <Ionicons name="remove" size={24} color={colors.primaryOrange} />
              </TouchableOpacity>
              <Text style={styles.pointValue}>{challengeData.pointValue}</Text>
              <TouchableOpacity
                style={styles.pointAdjust}
                onPress={() =>
                  setChallengeData({
                    ...challengeData,
                    pointValue: Math.min(50, challengeData.pointValue + 5),
                  })
                }
              >
                <Ionicons name="add" size={24} color={colors.primaryOrange} />
              </TouchableOpacity>
            </View>

            <View style={styles.disclaimerContainer}>
              <Ionicons name="information-circle-outline" size={20} color={colors.textMedium} />
              <Text style={styles.disclaimerText}>
                If your challenge is accepted, you'll also receive 5 points!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.sendChallengeButton}
              onPress={() => {
                setChallengeModalVisible(false);
                alert('Challenge sent!');
              }}
            >
              <Text style={styles.sendChallengeText}>Send Challenge</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderResultView = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.resultContainer}>
        {isUploading ? (
          <Text style={styles.resultText}>Uploading video...</Text>
        ) : (
          <>
            <Text style={styles.resultText}>Jumping Jacks Count: {jumpCount}</Text>
            <TouchableOpacity style={styles.backButton} onPress={resetView}>
              <Text style={styles.backButtonText}>Go Back to Workouts</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );

  const renderNoPermissionsView = () => (
    <SafeAreaView style={styles.safeArea}>
      <Text>Camera or microphone permission not granted</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => setRecordMode(false)}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <>
      {!recordMode && jumpCount === null && renderWorkoutPage()}
      {recordMode && cameraPermission?.granted && micPermission?.granted
        ? renderCameraView()
        : recordMode
          ? renderNoPermissionsView()
          : null}
      {jumpCount !== null && renderResultView()}
      {workoutActive && renderWorkoutActive()}
      {renderModalContent()}
      {renderChallengeModal()}
      {renderBuildWorkoutModal()}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1 },
  container: { flex: 1, padding: 16, paddingBottom: 24 },
  startButtonGradient: {
    borderRadius: 25,
    marginVertical: 20,
    marginHorizontal: '20%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  startButton: { alignItems: 'center', justifyContent: 'center', padding: 15 },
  startButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333333',
  },
  exercisesContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 15,
  },
  aiCoachContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#eee',
    maxHeight: 400,
  },
  aiCoachTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chatHistory: {
    maxHeight: 280,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '85%',
  },
  userMessage: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#FFF5E6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coachNote: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#FF9500',
    marginRight: 5,
    fontWeight: '500',
  },
  featureButton: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureButtonText: { fontSize: 16, fontWeight: '600', color: '#333333' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#DDDDDD' },
  dividerText: {
    paddingHorizontal: 10,
    color: '#555555',
    fontSize: 14,
    fontWeight: '500',
  },
  libraryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  librarySubtitle: { fontSize: 14, color: '#666666', marginBottom: 16 },
  exerciseRow: { justifyContent: 'space-between', marginBottom: 10 },
  exerciseCard: {
    width: '48%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseImage: { width: '100%', height: 120, backgroundColor: '#DDDDDD' },
  exerciseCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#333333' },
  closeButton: { padding: 4 },
  modalScrollView: { padding: 16 },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#DDDDDD',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 12,
  },
  stepText: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 8,
    paddingLeft: 8,
  },
  stepNumber: { fontWeight: '600', color: '#FF9500' },
  videoButton: {
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 10,
  },
  videoButtonText: { color: '#FFFFFF', fontWeight: '600', marginLeft: 8 },
  startRecordingButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  startRecordingButtonText: { color: '#FFFFFF', fontWeight: '600' },
  recordingOverlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  recordingText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  cameraControlsContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  cameraBtnContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIndicator: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF0000',
  },
  recording: { width: 30, height: 30, borderRadius: 4 },
  recordingInfo: { alignItems: 'center', marginBottom: 20 },
  timerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,0,0,0.5)',
    borderRadius: 8,
    alignSelf: 'center',
  },
  cancelText: { color: 'white', fontSize: 16, fontWeight: '600' },
  uploadOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 18,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  workoutOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  workoutGradient: { flex: 1 },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  closeWorkoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
  workoutPreview: { flex: 1, paddingBottom: 20 },
  timelineContainer: { flex: 1, paddingHorizontal: 16 },
  timelineLine: {
    position: 'absolute',
    left: 23,
    top: 20,
    bottom: 20,
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
    marginTop: 5,
    marginRight: 12,
    zIndex: 1,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  timelineDuration: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  startTimerButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  startTimerText: {
    color: '#FF9500',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeWorkout: { flex: 1 },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  currentExerciseName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  currentExerciseDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  timerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: 'white',
    marginBottom: 40,
  },
  timerText: { fontSize: 60, fontWeight: 'bold', color: 'white' },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  skipButtonText: { color: 'white', marginRight: 4 },
  progressContainer: { padding: 16 },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  progressTimeline: { marginLeft: 8 },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    opacity: 0.7,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginRight: 8,
  },
  progressText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  completedExercise: { opacity: 0.4 },
  activeExercise: { opacity: 1 },
  completedDot: { backgroundColor: 'rgba(255,255,255,0.3)' },
  activeDot: {
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  activeText: { color: 'white', fontWeight: 'bold' },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  challengeInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  expirationSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  expirationOption: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  expirationSelected: {
    backgroundColor: '#FFEBCC',
    borderColor: '#FF9500',
  },
  expirationText: { color: '#555555', fontWeight: '500' },
  expirationTextSelected: { color: '#FF9500', fontWeight: 'bold' },
  pointSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pointAdjust: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  pointValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 20,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    color: '#555555',
    fontSize: 14,
  },
  sendChallengeButton: {
    backgroundColor: '#FF9500',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  sendChallengeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutBuilderContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  workoutColumn: {
    flex: 1,
    marginHorizontal: 5,
  },
  workoutColumnTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  workoutInstructions: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  exerciseTag: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  draggingExercise: {
    backgroundColor: '#e0e0e0',
    elevation: 5,
  },
  selectedExerciseTag: {
    backgroundColor: '#fff3e0',
  },
  exerciseTagText: {
    fontSize: 14,
    flex: 1,
  },
  exerciseTagDuration: {
    fontSize: 14,
    color: '#666',
  },
  durationControl: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  durationControlText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  exerciseTagControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});