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
    Plants are living things that grow in the soil. They need sunlight, water, and air to stay alive. Plants are important because they produce food and oxygen, which help animals and humans survive.
  </p>

  <h2>How Do Plants Grow?</h2>
  <p>
    Plants grow by using sunlight, water, and air in a special way. Here’s how:
  </p>
  <ul>
    <li>🌞 Sunlight gives energy for the plant to make food.</li>
    <li>💧 Roots absorb water and nutrients from the soil.</li>
    <li>🌬️ Leaves take in carbon dioxide from the air.</li>
    <li>🌿 The plant combines these things to make its own food and grow.</li>
  </ul>
  <p>
    In short, plants turn sunlight, water, and air into food for themselves. Can you explain how each part helps the plant grow?
  </p>

  <h2>Parts of a Plant</h2>
  <p>
    Each part of a plant has a job. Understanding these jobs helps us see how plants stay alive.
  </p>
  <ul>
    <li><strong>Root</strong> – Holds the plant in the soil and absorbs water and minerals.</li>
    <li><strong>Stem</strong> – Moves water and food to different parts of the plant.</li>
    <li><strong>Leaves</strong> – Make food for the plant using sunlight.</li>
    <li><strong>Flower</strong> – Helps the plant produce seeds.</li>
    <li><strong>Fruit</strong> – Protects and carries the seeds.</li>
  </ul>
  <p>Think about this: What would happen if a plant did not have roots or leaves?</p>

  <h2>Types of Plants</h2>
  <p>
    Plants can be grouped by how they grow. Understanding their types helps us know where they might grow best.
  </p>
  <ul>
    <li><strong>Trees</strong> – Tall and strong with big stems (e.g., mango tree).</li>
    <li><strong>Shrubs</strong> – Smaller plants with many branches (e.g., rose).</li>
    <li><strong>Herbs</strong> – Small and soft (e.g., mint or coriander).</li>
    <li><strong>Climbers</strong> – Grow with support, like a rope (e.g., money plant).</li>
    <li><strong>Creepers</strong> – Spread along the ground (e.g., pumpkin).</li>
  </ul>
  <p>Can you match these types of plants to what you see around your home or garden?</p>
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
