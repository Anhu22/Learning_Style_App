import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ScoreContext } from "./ScoreProvider";

const PageBackground = styled.div`
  background-color: #e0f7fa;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin: 30px auto;
  padding: 30px;
  max-width: 700px;
  border-radius: 15px;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Instruction = styled.p`
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
`;

const PizzaBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 220px;
  height: 220px;
  margin: 0 auto 20px auto;
  background-color: #fff3e0;
  border: 3px dashed #ff9800;
  border-radius: 12px;
  padding: 10px;
`;

const Slice = styled.div`
  width: 80px;
  height: 80px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
`;

const AddButton = styled(ActionButton)`
  background-color: #4caf50;
  &:hover {
    background-color: #43a047;
  }
`;

const RemoveButton = styled(ActionButton)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
`;

const SubmitButton = styled(ActionButton)`
  background-color: #ff7f50;
  &:hover {
    background-color: #e96b3a;
  }
`;

const ProgressBarWrapper = styled.div`
  background: #ddd;
  border-radius: 10px;
  height: 15px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  background: #4caf50;
  height: 100%;
  width: ${(props) => props.width}%;
  transition: width 0.5s ease-in-out;
`;

const TimerText = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #d32f2f;
`;

const PizzaFractionGame = () => {
  const { setKinestheticScore } = useContext(ScoreContext);
  const [slices, setSlices] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  const questions = [
    {
      title: "🍕 Fulfill Anna’s Order!",
      instruction: "Anna is very hungry! She wants a full pizza made only of Vegetable slices.",
      correctSlices: {
        "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png": 4,
      },
    },
    {
      title: "🍕 Fulfill Ben’s Order!",
      instruction: "Ben loves pepperoni! He ordered 6/8 Pepperoni Pizza and 2/8 Vegetable Pizza.",
      correctSlices: {
        "https://www.citypng.com/public/uploads/preview/cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png": 3,
        "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png": 1,
      },
    },
    {
      title: "🍕 Fulfill Daniel’s Order!",
      instruction: "Daniel is a veggie fan! He wants 6/8 Vegetable Pizza and 3/12 Pepperoni Pizza.",
      correctSlices: {
        "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png": 3,
        "https://www.citypng.com/public/uploads/preview/cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png": 1,
      },
    },
    {
      title: "🍕 Fulfill Henry’s Order!",
      instruction: "Henry doesn’t like too much veggie. He ordered 2/8 Vegetable Pizza and 4/8 Pepperoni Pizza.",
      correctSlices: {
        "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png": 1,
        "https://www.citypng.com/public/uploads/preview/cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png": 2,
      },
    },
    {
      title: "🍕 Fulfill Tom’s Order!",
      instruction: "Tom wants to buy a 3/6 Vegetable Pizza and 3/6 Pepperoni Pizza.",
      correctSlices: {
        "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png": 2,
        "https://www.citypng.com/public/uploads/preview/cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png": 2,
      },
    },
  ];

  const sliceImages = [
    "https://clipart-library.com/newhp/Pizza-Slice-Combo-Clip-Art.png",
    "https://www.citypng.com/public/uploads/preview/cartoon-illustration-pepperoni-pizza-slice-image-png-7358116966795710nmjkar8to.png",
  ];

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      handleEndQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleAddSlice = (type) => {
    if (slices.length < 4) {
      setSlices([...slices, sliceImages[type]]);
    }
  };

  const handleRemoveSlice = () => {
    if (slices.length > 0) {
      setSlices(slices.slice(0, -1));
    }
  };

  const handleSubmit = () => {
    let points = 0;
    if (currentQuestion.correctSlices) {
      const counts = slices.reduce((acc, img) => {
        acc[img] = (acc[img] || 0) + 1;
        return acc;
      }, {});
      const isCorrect = Object.entries(currentQuestion.correctSlices).every(
        ([img, count]) => counts[img] === count
      );
    points = isCorrect ? 2 : 0;
  }

  localStorage.setItem(`pizzaFractionScore_Q${questionIndex + 1}`, points);

  setTimeout(() => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSlices([]);
    } else {
      handleEndQuiz();
    }
  }, 1000);
  };

  const handleSkip = () => {
    localStorage.setItem(`pizzaFractionScore_Q${questionIndex + 1}`, 0);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSlices([]);
    } else {
      handleEndQuiz();
    }
  };

  const handleEndQuiz = () => {
    let total = 0;
    for (let i = 1; i <= questions.length; i++) {
      total += parseInt(localStorage.getItem(`pizzaFractionScore_Q${i}`)) || 0;
    }
    localStorage.setItem("kinesthetictotalscore", total);
    setKinestheticScore(total);
    localStorage.setItem("kinestheticQuizScore3", total);
    setQuizEnded(true);
  };

  const progressPercent = ((questionIndex + 1) / questions.length) * 100;

  return (
    <PageBackground>
      <Container>
        {!quizEnded ? (
          <>
            <ProgressBarWrapper>
              <ProgressBarFill width={progressPercent} />
            </ProgressBarWrapper>

            <TimerText>⏳ Time Left: {formatTime(timeLeft)}</TimerText>

            <Title>{currentQuestion.title}</Title>
            <Instruction>{currentQuestion.instruction}</Instruction>

            <ButtonRow>
              <AddButton onClick={() => handleAddSlice(0)}>
                🍕 Vegetable Slice
              </AddButton>
              <AddButton onClick={() => handleAddSlice(1)}>
                🍕 Pepperoni Slice
              </AddButton>
              <RemoveButton onClick={handleRemoveSlice}>
                ➖ Remove Slice
              </RemoveButton>
            </ButtonRow>

            <PizzaBox>
              {slices.map((src, idx) => (
                <Slice key={idx} style={{ backgroundImage: `url(${src})` }} />
              ))}
            </PizzaBox>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "15px",
                justifyContent: "center",
              }}
            >
              <SubmitButton
                style={{ background: "#f44336" }}
                onClick={handleSkip}
              >
                Skip ⏭️
              </SubmitButton>

              <SubmitButton onClick={handleSubmit}>✅ Submit Answer</SubmitButton>
            </div>
          </>
        ) : (
          <>
            <Title>🎊 Quiz Completed!</Title>
            <Instruction>
              {timeLeft <= 0
                ? "⏰ Time’s up! Your quiz has ended."
                : "Thanks for playing the Pizza Fraction Game!"}
            </Instruction>
            <ButtonRow>
              <SubmitButton
                onClick={() => {
                  navigate("/section-result");
                }}
              >
                Get the Result
              </SubmitButton>
            </ButtonRow>
          </>
        )}
      </Container>
    </PageBackground>
  );
};

export default PizzaFractionGame;
