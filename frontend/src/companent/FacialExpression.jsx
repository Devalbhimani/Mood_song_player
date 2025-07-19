import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import './facialexpression.css'


const FaceMoodDetector = () => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // make sure models are in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };

    loadModels();

    // Start webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  }, []);

  const detectMood = async () => {
    if (!modelsLoaded || !videoRef.current) return;

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections && detections.expressions) {
      const expressions = detections.expressions;
      const topMood = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      console.log("Detected mood:", topMood);
    } else {
      console.log("No face detected");
    }
  };

  return (
    <div className="mood-element">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="user-video-feed"
      />
      <br />
      <button
        onClick={detectMood}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Detect Mood
      </button>
    </div>
  );
};

export default FaceMoodDetector;
