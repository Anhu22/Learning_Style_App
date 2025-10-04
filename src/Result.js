import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  const [learningStyle, setLearningStyle] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  // Get all quiz scores from localStorage
const readScore = (parseInt(localStorage.getItem("readQuizScore1")) || 0) + (parseInt(localStorage.getItem("readQuizScore2")) || 0) + (parseInt(localStorage.getItem("readQuizScore3")) || 0);
const visualScore = (parseInt(localStorage.getItem("visualQuizScore1")) || 0) + (parseInt(localStorage.getItem("visualQuizScore2")) || 0) + (parseInt(localStorage.getItem("visualQuizScore3")) || 0);
const audioScore = (parseInt(localStorage.getItem("audioQuizScore1")) || 0) + (parseInt(localStorage.getItem("audioQuizScore2")) || 0) + (parseInt(localStorage.getItem("audioQuizScore3")) || 0);
const kinestheticScore = (parseInt(localStorage.getItem("kinestheticQuizScore1")) || 0) + (parseInt(localStorage.getItem("kinestheticQuizScore2")) || 0) + (parseInt(localStorage.getItem("kinestheticQuizScore3")) || 0);

const readTime = (parseInt(localStorage.getItem("readQuizTime1")) || 0) + (parseInt(localStorage.getItem("readQuizTime2")) || 0) + (parseInt(localStorage.getItem("readQuizTime3")) || 0);
const visualTime = (parseInt(localStorage.getItem("visualQuizTime1")) || 0) + (parseInt(localStorage.getItem("visualQuizTime2")) || 0) + (parseInt(localStorage.getItem("visualQuizTime3")) || 0);
const audioTime = (parseInt(localStorage.getItem("audioQuizTime1")) || 0) + (parseInt(localStorage.getItem("audioQuizTime2")) || 0) + (parseInt(localStorage.getItem("audioQuizTime3")) || 0);
const kinestheticTime = (parseInt(localStorage.getItem("kinestheticQuizTime1")) || 0) + (parseInt(localStorage.getItem("kinestheticQuizTime2")) || 0) + (parseInt(localStorage.getItem("kinestheticQuizTime3")) || 0);

  //const totalScore = readScore + visualScore + audioScore + kinestheticScore;

  // Determine the learning style based on highest score
  const scoreMap = {
    Read: readScore,
    Visual: visualScore,
    Auditory: audioScore,
    Kinesthetic: kinestheticScore,
  };

  const predictedStyle = Object.keys(scoreMap).reduce((a, b) =>
    scoreMap[a] > scoreMap[b] ? a : b
  );

  return (
    <ResultContainer>
      <h1>Your Result</h1>
      <p>📖 Read Score: {readScore} (Time: {readTime}s)</p>
      <p>🖼️ Visual Score: {visualScore} (Time: {visualTime}s)</p>
      <p>🔊 Audio Score: {audioScore} (Time: {audioTime}s)</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore} (Time: {kinestheticTime}s)</p>
      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>
      {saveStatus && <p>{saveStatus}</p>}
      <SubmitButton
        onClick={async () => {
          try {
            const user = JSON.parse(localStorage.getItem('user'));
            const rollno = user.rollno;
            const response = await fetch('http://localhost:5000/api/results', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
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
              setSaveStatus('Results saved successfully!');
            } else {
              setSaveStatus('Failed to save results.');
            }
          } catch (error) {
            setSaveStatus('Error saving results.');
          }
        }}
      >
        Save Results
      </SubmitButton>
      <SubmitButton onClick={() => navigate('/')}>Return Home</SubmitButton>
    </ResultContainer>
  );
};

export default Result;
