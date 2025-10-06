import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 40px;
  text-align: center;
  background: linear-gradient(to bottom, #001d3d, #003566);
  color: #fff;
  font-family: "Poppins", sans-serif;
  line-height: 1.8;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #ffd60a;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 30px;
  width: 80%;
  max-width: 800px;
  line-height: 1.8;
  color: #333;
  font-size: 18px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  margin-top: 25px;
  color: #4b0082;
`;

const Paragraph = styled.p`
  margin: 10px 0;
`;

const FunFact = styled.div`
  background: #f77f00;
  color: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-top: 40px;
  width: 80%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const Emoji = styled.span`
  font-size: 1.6rem;
  margin-right: 8px;
`;

const SolarSystem = () => {
  return (
    <Container>
      <Title>Learning About Plants 🌱</Title>
      <ContentBox>
        <SectionTitle>1. Leaves 🍃</SectionTitle>
        <Paragraph>
          Leaves make food for the plant using sunlight, water, and air in a process called photosynthesis.
        </Paragraph>
        <Paragraph>
          You can think of leaves as the plant’s kitchen, where it cooks food to grow and stay healthy.
        </Paragraph>
        <Paragraph>
          Without leaves, a plant wouldn’t get the energy it needs to survive.
        </Paragraph>

        <SectionTitle>2. Stem 🌿</SectionTitle>
        <Paragraph>
          The stem holds the plant upright and makes sure it doesn’t fall over.
        </Paragraph>
        <Paragraph>
          It carries water and nutrients from the roots to the leaves and other parts of the plant.
        </Paragraph>
        <Paragraph>
          Some plants, like money plants, need strong stems to grow tall and healthy.
        </Paragraph>

        <SectionTitle>3. Roots 🌱</SectionTitle>
        <Paragraph>
          Roots anchor the plant in the soil so it stays in place.
        </Paragraph>
        <Paragraph>
          They absorb water and minerals from the soil to help the plant grow.
        </Paragraph>
        <Paragraph>
          Roots are like the plant’s drinking straw, taking in the things it needs to survive.
        </Paragraph>

        <SectionTitle>4. Flowers 🌸</SectionTitle>
        <Paragraph>
          Flowers are often bright and colorful to attract insects and birds.
        </Paragraph>
        <Paragraph>
          They help the plant make seeds, which grow into new plants.
        </Paragraph>
        <Paragraph>
          Flowers are like the plant’s reproduction center.
        </Paragraph>

        <SectionTitle>5. Fruits 🍎</SectionTitle>
        <Paragraph>
          Fruits protect the seeds and help them spread to grow into new plants.
        </Paragraph>
        <Paragraph>
          Some fruits are sweet or tasty, which encourages animals and humans to eat them and spread the seeds.
        </Paragraph>

        <SectionTitle>6. Herbs 🌿</SectionTitle>
        <Paragraph>
          Small, soft plants like mint or coriander are called herbs.
        </Paragraph>
        <Paragraph>
          Herbs are useful in cooking, medicine, and even for smell.
        </Paragraph>
        <Paragraph>
          They show that not all plants need to grow big to be helpful.
        </Paragraph>

        <SectionTitle>Why Plants Are Important 🌈</SectionTitle>
        <Paragraph>
          Plants make food for themselves and produce oxygen for humans and animals.
        </Paragraph>
        <Paragraph>
          They help the environment by keeping the air clean and the soil healthy.
        </Paragraph>
        <Paragraph>
          Every part of a plant has a specific job to help it live and grow.
        </Paragraph>

        <FunFact>
          Fun Tip 💡: If a plant didn’t have roots, stems, leaves, flowers, or fruits, it couldn’t survive or make new plants. By understanding how each part works, we can explain why plants are so important in our world.
        </FunFact>
      </ContentBox>
    </Container>
  );
};

export default SolarSystem;
