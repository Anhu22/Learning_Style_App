import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgb(166, 243, 243), rgb(244, 180, 250));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 20px;
`;

const AudioContainer = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

const PlantAudioPage = () => {
  const text = `
Welcome to Learning Fractions!

What Are Fractions?
A fraction shows a part of a whole. It has two numbers:

Numerator – the top number, which tells how many parts you have.

Denominator – the bottom number, which tells how many equal parts the whole is divided into.

Example:
If a pizza is cut into 4 equal slices and you eat 1 slice:
Numerator = 1 (the slice you ate)
Denominator = 4 (total slices)
Fraction = 1/4
Fractions are used in daily life whenever we divide something into parts, like sharing food, measuring ingredients, or tracking progress.

Applying Fractions in Real Life
Now that you understand what fractions are, let’s apply them to solve real-world problems.


Example 1:
You baked a cake and cut it into 8 equal slices. If you ate 3 slices, what fraction of the cake did you eat?

Step 1: Total slices = 8  denominator.
Step 2: Slices you ate = 3  numerator.
Step 3: Fraction = 3/8.

So, you ate 3/8 of the cake.

Example 2:
You ran 6 kilometers out of your 10 km goal. What fraction of your goal have you completed?

Step 1: Total distance = 10  denominator.
Step 2: Distance run = 6  numerator.
Step 3: Fraction = 6/10.
Step 4: Simplify  divide numerator and denominator by 2  3/5.

So, you completed 3/5 of your goal.

Challenge Task:
Imagine you are making lemonade. The recipe needs 3/4 cup of sugar. If you only have a 1/4 cup measuring spoon, how many times will you fill it to measure the sugar?

Hint: Each spoon is 1/4. Keep adding:
  1/4 + 1/4 + 1/4 = 3/4.

So, you will need to fill the spoon 3 times.

  `;

  const speakText = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };

  const pauseAudio = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <Wrapper>
      <Title>
        <h1>Let's Learn About Fraction!</h1>
      </Title>

      <AudioContainer>
        <Button onClick={speakText}>🔊 Play Audio</Button>
      </AudioContainer>

      <ButtonContainer>
        <Link to="/a_quiz3" onClick={pauseAudio}>
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PlantAudioPage;
