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

const HomeContainer = styled.div`
  margin: 20px;
  padding: 20px;
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

const Home = () => {
  return (
    <Wrapper>
      <Title>
        <h1>Welcome to Learning Fractions!</h1>
      </Title>
      <HomeContainer>
        {/* Fractions Section */}
        <h2>Understanding Fractions</h2>
        <p>
          A <strong>fraction</strong> is a way to represent a part of a whole. It is written as
          <em> a / b</em>, where:
        </p>
        <ul>
          <li><strong>a</strong> is the numerator (the number of parts you have)</li>
          <li><strong>b</strong> is the denominator (the total number of parts)</li>
        </ul>

        <p><strong>Examples:</strong></p>
        <ul>
          <li><strong>1/2</strong> means one part out of two equal parts.</li>
          <li><strong>3/4</strong> means three parts out of four equal parts.</li>
          <li><strong>5/8</strong> means five parts out of eight equal parts.</li>
        </ul>

        <p>Here are more examples:</p>
        <ul>
          <li><strong>2/5</strong> means two parts out of five equal parts. Imagine splitting a cake into 5 pieces, and you take 2 of them.</li>
          <li><strong>7/10</strong> means seven parts out of ten equal parts. If a chocolate bar is divided into 10 pieces and you eat 7, you have eaten 7/10 of it.</li>
          <li><strong>9/12</strong> can be simplified to 3/4. This means nine parts out of twelve equal parts, which is the same as three parts out of four.</li>
          <li><strong>1/3</strong> means one part out of three equal parts. Think of cutting a pizza into 3 slices, and you eat one of them.</li>
          <li><strong>11/15</strong> means eleven parts out of fifteen equal parts. If you have a pizza sliced into 15 slices and you eat 11, you’ve eaten 11/15.</li>
        </ul>

        <p><strong>Different Types of Fractions:</strong></p>
        <ul>
          <li><strong>Proper Fractions:</strong> The numerator is smaller than the denominator (e.g., 2/5, 3/4).</li>
          <li><strong>Improper Fractions:</strong> The numerator is greater than or equal to the denominator (e.g., 7/4, 11/8).</li>
          <li><strong>Mixed Numbers:</strong> A whole number and a proper fraction together (e.g., 1 1/2, 2 3/4).</li>
        </ul>

        <p>
          Fractions are useful in everyday life. For example, when measuring ingredients for a recipe, dividing something into equal parts, or even calculating time.
        </p>

        <p><strong>Fun Tip:</strong> Fractions can be converted into decimals and percentages. For example, 1/2 is equivalent to 0.5 or 50%!</p>
      </HomeContainer>

      <ButtonContainer>
        <Link to="/rw_quiz3">
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Home;
