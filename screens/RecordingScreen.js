import React, { useState, useRef, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    SafeAreaView, 
    Alert,
    StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, requestCameraPermissionsAsync, requestMicrophonePermissionsAsync } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecordingScreen({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [recording, setRecording] = useState(false);
    const [facing, setFacing] = useState('back');
    const [isUploading, setIsUploading] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status: camStatus } = await requestCameraPermissionsAsync();
            const { status: micStatus } = await requestMicrophonePermissionsAsync();
            if (camStatus !== 'granted' || micStatus !== 'granted') {
                Alert.alert('Permissions not granted', 'Camera or Microphone permission not granted');
            }
        })();
    }, []);

    const startRecording = async () => {
        if (cameraRef.current) {
            try {
                setRecording(true);
                const videoData = await cameraRef.current.recordAsync({ maxDuration: 60 });
                setRecording(false);
                await uploadVideo(videoData.uri);
            } catch (e) {
                console.error(e);
                setRecording(false);
            }
        }
    };

    const stopRecording = () => {
        if (recording && cameraRef.current) {
            cameraRef.current.stopRecording();
        }
    };

    const uploadVideo = async (uri) => {
        setIsUploading(true);
        let formData = new FormData();
        formData.append('file', {
            uri: uri,
            name: 'jumping_jacks.mp4',
            type: 'video/mp4',
        });
        try {
            const res = await fetch("http://localhost:8000/upload/jumping_jacks", {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const json = await res.json();
            // After uploading, navigate back to WorkoutsPage and pass the jump count
            navigation.navigate('WorkoutsPage', { jumpCount: json.jumping_jack_count });
        } catch (e) {
            Alert.alert('Upload failed', 'Failed to upload video');
        } finally {
            setIsUploading(false);
        }
    };

    if (!permission?.granted) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>No access to camera</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                style={{ flex: 1 }}
                facing={facing}
                ref={cameraRef}
                enableZoomGesture
            >
                <View style={styles.cameraControlsContainer}>
                    <View style={styles.cameraButtons}>
                        <TouchableOpacity 
                            style={styles.cameraBtnContainer}
                            onPress={() => setFacing((prev) => (prev === 'back' ? 'front' : 'back'))}
                        >
                            <Ionicons name="camera-reverse" size={24} color="white" />
                        </TouchableOpacity>
                        {!recording ? (
                            <TouchableOpacity 
                                style={styles.recordButton}
                                onPress={startRecording}
                            >
                                <View style={styles.recordIndicator}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity 
                                style={styles.recordButton}
                                onPress={stopRecording}
                            >
                                <View style={[styles.recordIndicator, styles.recording]}/>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.recordingInfo}>
                        {recording ? (
                            <Text style={styles.timerText}>Recording...</Text>
                        ) : (
                            <Text style={styles.timerText}>Tap record to start</Text>
                        )}
                    </View>
                    {recording && (
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={stopRecording}
                        >
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
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        alignSelf: 'center',
    },
    cancelText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
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
});