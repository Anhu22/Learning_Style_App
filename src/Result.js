import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ResultContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  min-height: 100vh;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e55347;
  }
`;

const Result = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState("");

  // ✅ Fetch total scores & times from localStorage
  const readScore = parseInt(localStorage.getItem("readTotalScore")) || 0;
  const visualScore = parseInt(localStorage.getItem("visualTotalScore")) || 0;
  const audioScore = parseInt(localStorage.getItem("audioTotalScore")) || 0;
  const kinestheticScore = parseInt(localStorage.getItem("kinestheticTotalScore")) || 0;

  const readTime = parseInt(localStorage.getItem("readTotalTime")) || 0;
  const visualTime = parseInt(localStorage.getItem("visualTotalTime")) || 0;
  const audioTime = parseInt(localStorage.getItem("audioTotalTime")) || 0;
  const kinestheticTime = parseInt(localStorage.getItem("kinestheticTotalTime")) || 0;

  // ✅ Get user info
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const schoolname = user.schoolname || "";
  const rollno = user.rollno || "";
  const password = ""; // Not stored for security

  // ✅ Determine predicted learning style
  const scoreMap = {
    Read: readScore,
    Visual: visualScore,
    Auditory: audioScore,
    Kinesthetic: kinestheticScore,
  };

  const predictedStyle = Object.keys(scoreMap).reduce((a, b) =>
    scoreMap[a] > scoreMap[b] ? a : b
  );

  // ✅ Automatically push results when data available
  useEffect(() => {
    const pushResults = async () => {
      try {
        await axios.post("http://localhost:5000/api/results/save", {
          schoolname,
          rollno,
          password,
          readWriteScore: readScore,
          readWriteTime: readTime,
          visualScore,
          visualTime,
          audioScore,
          audioTime,
          kinestheticScore,
          kinestheticTime,
          predictedStyle,
        });
        console.log("Results pushed successfully!");
      } catch (error) {
        console.error("Failed to save results:", error);
      }
    };

    if (schoolname && rollno) {
      pushResults();
    }
  }, [
    schoolname,
    rollno,
    password,
    readScore,
    readTime,
    visualScore,
    visualTime,
    kinestheticScore,
    kinestheticTime,
    audioScore,
    audioTime,
    predictedStyle,
  ]);

  // ✅ Manual Save Button
  const handleSaveResults = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollno,
          readScore,
          visualScore,
          audioScore,
          kinestheticScore,
          predictedStyle,
          readTime,
          visualTime,
          audioTime,
          kinestheticTime,
        }),
      });

      if (response.ok) {
        setSaveStatus("✅ Results saved successfully!");
        // 🧹 Clear localStorage after successful save
        localStorage.clear();
      } else {
        setSaveStatus("❌ Failed to save results.");
      }
    } catch (error) {
      setSaveStatus("⚠️ Error saving results.");
    }
  };

  return (
    <ResultContainer>
      <h1>Your Final Result</h1>

      <p>📖 Read Score: {readScore} (Time: {readTime}s)</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {visualTime}s)</p>
      <p>🔊 Audio Score: {audioScore} (Time: {audioTime}s)</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {kinestheticTime}s)</p>

      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>

      {saveStatus && <p>{saveStatus}</p>}

      <SubmitButton onClick={handleSaveResults}>Save Results</SubmitButton>
      <SubmitButton onClick={() => navigate("/")}>Return Home</SubmitButton>
    </ResultContainer>
  );
};

export default Result;
