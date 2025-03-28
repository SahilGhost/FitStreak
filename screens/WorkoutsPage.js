import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image,
  Modal,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function WorkoutsPage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [recordMode, setRecordMode] = useState(false);
  const [facing, setFacing] = useState('back'); // 'front' or 'back'
  const [permission, requestPermission] = useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [jumpCount, setJumpCount] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);

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
  
  // Sample exercise library data
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
        'Push through heels to return to starting position'
      ],
      videoLink: 'https://www.youtube.com/watch?v=xqvCmoLULNY'
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
        'Push back up to the starting position'
      ],
      videoLink: 'https://www.youtube.com/watch?v=WDIpL0pjun0'
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
        'Push through the front heel to return to starting position'
      ],
      videoLink: 'https://www.youtube.com/watch?v=tTej-ax9XiA&pp=ygUObHVuZ2UgdHV0b3JpYWw%3D'
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
        'Breathe normally and maintain proper form'
      ],
      videoLink: 'https://www.youtube.com/watch?v=6LqqeBtFn9M&t=7s'
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
        'Stand up by driving hips forward while keeping the bar close to legs'
      ],
      videoLink: 'https://www.youtube.com/watch?v=r4MzxtBKyNE'
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
        'Lower the weights with control back to starting position'
      ],
      videoLink: 'https://www.youtube.com/watch?v=XE_pHwbst04'
    },
  ];

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // When recordMode becomes true, start recording automatically (max 60 sec)
  useEffect(() => {
    if (recordMode && cameraRef.current && !recording) {
      (async () => {
        setRecording(true);
        try {
          const videoData = await cameraRef.current.recordAsync({ maxDuration: 60 });
          // After recording stops, exit record mode and upload the video
          setRecording(false);
          setRecordMode(false);
          await uploadVideo(videoData.uri);
        } catch (e) {
          console.error(e);
          setRecording(false);
          setRecordMode(false);
        }
      })();
    }
  }, [recordMode]);

  const startRecordingMode = async () => {
    const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
    if (!permission?.granted || audioStatus !== 'granted') {
      alert('Camera or Microphone permission not granted');
      requestPermission();
      return;
    }
    setRecordMode(true);
  };

  const uploadVideo = async (uri) => {
    setIsUploading(true);
    let formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'jumping_jacks.mp4',
      type: 'video/mp4'
    });
    try {
      let res = await fetch("http://localhost:8000/upload/jumping_jacks", {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      let json = await res.json();
      setJumpCount(json.jumping_jack_count);
    } catch (e) {
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const resetView = () => {
    setJumpCount(null);
  };

  const renderExerciseCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.exerciseCard}
      onPress={() => openExerciseModal(item)}
    >
      <Image 
        source={item.image} 
        style={styles.exerciseImage}
        resizeMode="cover"
      />
      <Text style={styles.exerciseCardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {!recordMode && jumpCount === null && (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              {/* Start Workout Button */}
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                style={styles.startButtonGradient}
              >
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Start Workout</Text>
                </TouchableOpacity>
              </LinearGradient>

              {/* Today's Routine Section */}
              <Text style={styles.sectionTitle}>Today's routine</Text>

              {/* Detailed Exercises Section */}
              <View style={styles.exercisesContainer}>
                <Text style={styles.exercisesTitle}>DETAILED EXERCISES WITH TIMES...</Text>
                
                <Text style={styles.coachNote}>
                  Include AI Coach Tips/Suggestions in between
                </Text>
                
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save This Routine</Text>
                  <Ionicons 
                    name="bookmark-outline" 
                    size={16} 
                    color={colors.primaryOrange} 
                  />
                </TouchableOpacity>
              </View>

              {/* Additional Feature Buttons */}
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Build your own workout</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.featureButton}>
                <Text style={styles.featureButtonText}>Challenge your friend</Text>
              </TouchableOpacity>
              
              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Explore More</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Workout Library Section */}
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

              {/* Additional Jumping Jacks Card */}
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
                      'Repeat for the set duration'
                    ],
                    videoLink: 'https://www.youtube.com/watch?v=uLVt6u15L98'
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
      )}

      {/* Recording view */}
      {recordMode && permission !== null && (
        permission.granted ? (
          <View style={{ flex: 1 }}>
            <CameraView
              style={{ flex: 1 }}
              facing={facing}
              ref={cameraRef}
              enableZoomGesture
            >
              <View style={styles.cameraControlsContainer}>
                {/* Camera controls */}
                <View style={styles.cameraButtons}>
                  <TouchableOpacity 
                    style={styles.cameraBtnContainer}
                    onPress={() => {
                      setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
                    }}
                  >
                    <Ionicons name="camera-reverse" size={24} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.recordButton}
                    onPress={() => {
                        if (recording && cameraRef.current) {
                            cameraRef.current.stopRecording();
                        }
                    }}
                  >
                    <View style={[
                        styles.recordIndicator,
                        recording && styles.recording
                    ]} />
                  </TouchableOpacity>
                </View>

                {/* Recording timer and cancel button */}
                <View style={styles.recordingInfo}>
                  {recording && (
                    <Text style={styles.timerText}>Recording...</Text>
                  )}
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => {
                      setRecordMode(false);
                      setRecording(false);
                    }}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CameraView>
          </View>
        ) : (
          <SafeAreaView style={styles.safeArea}>
            <Text>No access to camera</Text>
          </SafeAreaView>
        )
      )}

      {/* Jumping jacks result view */}
      {jumpCount !== null && (
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
      )}

      {/* Exercise Detail Modal */}
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
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color={colors.textDark} />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScrollView}>
                  <Image 
                    source={selectedExercise.image}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  
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
                        navigation.navigate('RecordingScreen');
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
    </>
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
    paddingBottom: 24, // Extra padding for tab bar
  },
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
  startButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
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
  featureButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
  },
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
  librarySubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  exerciseRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
  exerciseImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#DDDDDD',
  },
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    padding: 16,
  },
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
  stepNumber: {
    fontWeight: '600',
    color: '#FF9500',
  },
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
  videoButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  startRecordingButton: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  startRecordingButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  recordingOverlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  recordingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
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
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
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
  recording: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
  recordingInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
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
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});