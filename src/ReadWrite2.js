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
        <h1>Let's Learn About Plants!</h1>
      </Title>
      <HomeContainer>
      <h2>What Are Plants?</h2>
          <p>
           Plants are living things that grow in the soil and need sunlight, water, and air to live. They are very important because they make food for us and give us oxygen to breathe.
          </p>

          <h2>How Do Plants Grow?</h2>
          <ul>
                <li>🌞 Sunlight helps the plant make food.</li>
                <li>💧 The roots take in water from the soil.</li>
                <li>🌬️ The leaves take in air (carbon dioxide).</li>
                <li>🌿 The plant uses these things to make its own food!</li>
          </ul>

          <h2>Parts of a Plant:</h2> 
          <ul>
            <li>1. Root - holds the plant in the soil and takes in water and minerals.</li>
            <li>2. Stem – carries water and food to different parts of the plant.</li>
            <li>3. Leaves – make food for the plant using sunlight.</li>
            <li>4. Flower – helps the plant make seeds.</li>
            <li>5. Fruit – holds the seeds of the plant.</li>
            </ul>
        <h2>Types of Plants</h2>
  <ul>
    <li><strong>Trees</strong> – Big plants with strong stems (e.g., mango or banyan trees).</li>
    <li><strong>Shrubs</strong> – Smaller than trees, with many branches (e.g., rose plants).</li>
    <li><strong>Herbs</strong> – Small, soft plants (e.g., mint or coriander).</li>
    <li><strong>Climbers</strong> – Need support to grow (e.g., money plant or grapevine).</li>
    <li><strong>Creepers</strong> – Grow along the ground (e.g., pumpkin or watermelon).</li>
  </ul>
      </HomeContainer>

      <ButtonContainer>
        <Link to="/rw_quiz2">
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Home;
