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
  Let's Learn About Plants!

  What Are Plants?
  Plants are living things that grow in the soil. They need sunlight, water, and air to stay alive. Plants are important because they produce food and oxygen, which help animals and humans survive.

  How Do Plants Grow?
  Plants grow by using sunlight, water, and air in a special way. Here’s how:

  Sunlight gives energy for the plant to make food.
  Roots absorb water and nutrients from the soil.
  Leaves take in carbon dioxide from the air.
  The plant combines these things to make its own food and grow.

  In short, plants turn sunlight, water, and air into food for themselves. Can you explain how each part helps the plant grow?

  Parts of a Plant
  Each part of a plant has a job. Understanding these jobs helps us see how plants stay alive.

  Root – Holds the plant in the soil and absorbs water and minerals.
  Stem – Moves water and food to different parts of the plant.
  Leaves – Make food for the plant using sunlight.
  Flower – Helps the plant produce seeds.
  Fruit – Protects and carries the seeds.

  Think about this: What would happen if a plant did not have roots or leaves?

  Types of Plants
  Plants can be grouped by how they grow. Understanding their types helps us know where they might grow best.

  Trees – Tall and strong with big stems (e.g., mango tree).
  Shrubs – Smaller plants with many branches (e.g., rose).
  Herbs – Small and soft (e.g., mint or coriander).
  Climbers – Grow with support, like a rope (e.g., money plant).
  Creepers – Spread along the ground (e.g., pumpkin).
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
        <h1>🌿 Let's Learn About Plants!</h1>
      </Title>

      <AudioContainer>
        <Button onClick={speakText}>🔊 Play Audio</Button>
      </AudioContainer>

      <ButtonContainer>
        <Link to="/a_quiz2" onClick={pauseAudio}>
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PlantAudioPage;
