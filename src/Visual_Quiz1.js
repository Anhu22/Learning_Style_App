import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
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
  const navigate = useNavigate(); // Use useNavigate hook instead
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

    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        calculatedScore += 1; // Add 1 for correct answer
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    // Store the score in localStorage
    localStorage.setItem("visualQuizScore", calculatedScore);
  };

  const questions = [
    {
      question: "1. What is the name of our planet?",
      options: ["Earth", "Mars", "Venus", "Saturn"],
      correctAnswer: "Earth",
    },
    {
      question: "2. Which planet is known as the 'Red Planet'?",
      options: ["Earth", "Mars", "Jupiter", "Mercury"],
      correctAnswer: "Mars",
    },
    {
      question: "3. What is the name of the star at the center of our solar system?",
      options: ["The Moon", "The Sun", "The Earth", "The North Star"],
      correctAnswer: "The Sun",
    },
    {
      question: "4. Which planet is closest to the Sun?",
      options: ["Mercury", "Earth", "Mars", "Saturn"],
      correctAnswer: "Mercury",
    },
    {
      question: "5. What is the name of the biggest planet in the solar system?",
      options: ["Saturn", "Jupiter", "Venus", "Mars"],
      correctAnswer: "Jupiter",
    },
  ];

  return (
    <QuizContainer>
      <Title>
        <h1>Solar System Quiz</h1>
      </Title>

      <div>
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
      </div>

      {submitted && (
        <div>
          <br></br>
          <SubmitButton
            onClick={() => {
              navigate("/kinesthetic");
            }}
          >
            Proceed a Gamified Quiz
          </SubmitButton>
        </div>
      )}
    </QuizContainer>
  );
};

export default Quiz;
