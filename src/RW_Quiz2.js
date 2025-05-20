import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const QuizContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250)); 
`;

const Title = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const Question = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const AnswerOption = styled.label`
  display: block;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
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

const Quiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (e, index) => {
    let newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.length < questions.length || answers.includes(undefined)) {
    alert("Please answer all questions before submitting the quiz.");
    return;
  }
    let calculatedScore = 0;

    // Calculate the score by checking the user's answers
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1; // Add 1 for correct answer
      }
    });

    // Set the calculated score in the state
    setScore(calculatedScore);
    setSubmitted(true);

    // After completing the read questionnaire and calculating the score
    localStorage.setItem("readQuizScore", calculatedScore); // Store the score in localStorage
  };

  const questions = [
    {
      question: "1. Which part of the plant makes food?",
      options: ["Root", "Stem", "Leaves", "Flower"],
      correctAnswer: "Leaves",
    },
    {
      question: "2. Which plant is a climber?",
      options: ["Pumpkin", "Mango", "Money plant", "Mint"],
      correctAnswer: "Money plant",
    },
    {
      question: "3. What is the function of the roots?",
      options: [
        "Make seeds",
        "Hold the plant and absorb water",
        "Carry food",
        "Make flowers",
      ],
      correctAnswer: "Hold the plant and absorb water",
    },
    {
      question: "4. What are small and soft plants called?",
      options: ["Shrubs", "Herbs", "Trees", "Climbers"],
      correctAnswer: "Herbs",
    },
    {
      question: "5. Which part of the plant holds the seeds?",
      options: ["Stem", "Root", "Fruit", "Leaf"],
      correctAnswer: "Fruit",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🌿 Plants Quiz</h1></Title>

      {questions.map((q, index) => (
        <QuestionContainer key={index}>
          <Question>{q.question}</Question>
          {q.options.map((option, i) => (
            <AnswerOption key={i}>
              <input
                type="radio"
                name={`question${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={(e) => handleChange(e, index)}
              />
              {option}
            </AnswerOption>
          ))}
        </QuestionContainer>
      ))}

      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      {submitted && (
        <div>
        <br></br>
        <SubmitButton
          onClick={() => {
            // Redirect to the next page (Video Questionnaire) <h2>Your score: {score}/{questions.length}</h2>
            navigate("/visual1");
          }}
        >
          Proceed to Video Quiz
        </SubmitButton>
      </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
