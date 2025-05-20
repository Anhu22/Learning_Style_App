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
      question: "1. What is the fraction that represents half?",
      options: ["1/2", "1/3", "1/4", "2/3"],
      correctAnswer: "1/2",
    },
    {
      question: "2. Which of the following is an improper fraction?",
      options: ["3/5", "7/4", "1/3", "2/8"],
      correctAnswer: "7/4",
    },
    {
      question: "3. What is the simplified form of 6/8?",
      options: ["2/3", "3/4", "1/2", "4/5"],
      correctAnswer: "3/4",
    },
    {
      question: "4. What is the mixed number form of 5/2?",
      options: ["2 1/2", "3 1/2", "1 1/2", "2 3/4"],
      correctAnswer: "2 1/2",
    },
    {
      question: "5. Which of the following fractions is equivalent to 1/2?",
      options: ["2/3", "4/8", "5/6", "1/3"],
      correctAnswer: "4/8",
    },
  ];

  return (
    <QuizContainer>
      <Title><h1>🔢 Fractions Quiz</h1></Title>

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
              navigate("/visual2");
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
