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

const SectionResult = () => {
  const navigate = useNavigate();
  const chosenSection = localStorage.getItem("chosenSection");
  const [flowTimeTaken, setFlowTimeTaken] = useState("");

  // Only run effect if chosenSection exists
  useEffect(() => {
    if (!chosenSection) return;

    const flowStartTime = localStorage.getItem(`${chosenSection}StartTime`);
    if (flowStartTime) {
      const endTime = Date.now();
      const durationMs = endTime - parseInt(flowStartTime, 10);
      const minutes = Math.floor(durationMs / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      setFlowTimeTaken(`${minutes}m ${seconds}s`);
      localStorage.setItem(`${chosenSection}FlowDuration`, durationMs.toString());
    }
  }, [chosenSection]);

  if (!chosenSection) {
    return (
      <ResultContainer>
        <h1>No section chosen</h1>
        <SubmitButton onClick={() => navigate("/choose")}>
          Choose a Quiz Section
        </SubmitButton>
      </ResultContainer>
    );
  }

  // Calculate total score from all quizzes
  const score1 = parseInt(localStorage.getItem(`${chosenSection}QuizScore1`) || "0", 10);
  const score2 = parseInt(localStorage.getItem(`${chosenSection}QuizScore2`) || "0", 10);
  const score3 = parseInt(localStorage.getItem(`${chosenSection}QuizScore3`) || "0", 10);
  const totalScore = score1 + score2 + score3;

  // Calculate total time from individual quizzes
  const time1 = parseInt(localStorage.getItem(`${chosenSection}QuizTime1`) || "0", 10);
  const time2 = parseInt(localStorage.getItem(`${chosenSection}QuizTime2`) || "0", 10);
  const time3 = parseInt(localStorage.getItem(`${chosenSection}QuizTime3`) || "0", 10);
  const totalTime = time1 + time2 + time3; // in seconds

  // Capitalize first letter for display
  const displaySection = chosenSection.charAt(0).toUpperCase() + chosenSection.slice(1);

  return (
    <ResultContainer>
      <h1>{displaySection} Quiz Result</h1>
      <p>Score: {totalScore}</p>
      {flowTimeTaken && <p>Total Time for Flow: {flowTimeTaken}</p>}
      <SubmitButton onClick={() => navigate("/choose")}>
        Take Other Quizzes
      </SubmitButton>
    </ResultContainer>
  );
};

export default SectionResult;
