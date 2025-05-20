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
  // Get all quiz scores from localStorage
  const readScore = parseInt(localStorage.getItem("readQuizScore")) || 0;
  const visualScore = parseInt(localStorage.getItem("visualQuizScore")) || 0;
  const audioScore = parseInt(localStorage.getItem("audioQuizScore")) || 0;
  const kinestheticScore = parseInt(localStorage.getItem("pizzaFractionTotalScore")) || 0;

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
      <p>📖 Read Score: {readScore}</p>
      <p>🖼️ Visual Score: {visualScore}</p>
      <p>🔊 Audio Score: {audioScore}</p>
      <p>🧩 Kinesthetic Score: {kinestheticScore}</p>
      <h2>🎯 Predicted Learning Style: {predictedStyle} Learner</h2>
    {/*
<SubmitButton
  onClick={() => {
    if (predictedStyle === "Visual") {
      navigate("/Vsearch");
    } else if (predictedStyle === "Read") {
      navigate("/Rsearch");
    } else {
      navigate("/search");
    }
  }}
>
  Continue to Search
</SubmitButton>
*/}

        <SubmitButton onClick={() => navigate("/")}>
            Return Home
          </SubmitButton>
      </ResultContainer>
  );
};

export default Result;
