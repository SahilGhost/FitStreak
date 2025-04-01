import cv2
import mediapipe as mp
import math
import os
import shutil
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
#python -m uvicorn ml:app --host 0.0.0.0 --port 8000 --reload
app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def process_jumping_jacks(video_path: str):
    # Open the video
    video = cv2.VideoCapture(video_path)

    # Variables for detecting body points using the mediapipe library
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(min_tracking_confidence=0.5, min_detection_confidence=0.5)
    mp_drawing = mp.solutions.drawing_utils

    # Jumping jack counter
    counter = 0
    last_state = None

    while True:
        success, img = video.read()
        if not success:
            break

        img = cv2.resize(img, (640, 360))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = pose.process(img_rgb)

        if results.pose_landmarks:
            h, w, _ = img.shape
            foot_left_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_FOOT_INDEX].y * h)
            foot_left_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_FOOT_INDEX].x * w)
            foot_right_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX].y * h)
            foot_right_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_FOOT_INDEX].x * w)
            hand_left_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_INDEX].y * h)
            hand_left_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_INDEX].x * w)
            hand_right_y = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_INDEX].y * h)
            hand_right_x = int(results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_INDEX].x * w)

            dist_hand = math.hypot(hand_left_x - hand_right_x, hand_left_y - hand_right_y)
            dist_foot = math.hypot(foot_left_x - foot_right_x, foot_left_y - foot_right_y)

            if dist_hand <= 150 and dist_foot >= 80:
                if last_state != "jumped":
                    counter += 1
                    last_state = "jumped"
            elif dist_hand > 150 and dist_foot < 80:
                last_state = "not_jumped"

    video.release()
    return counter

@app.post("/upload/jumping_jacks")
async def upload_video(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    jump_count = process_jumping_jacks(file_path)
    return JSONResponse(content={"filename": file.filename, "jumping_jack_count": jump_count})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)