import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 🌍 Global Styles (applied for this page)
const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #a6f3f3, #f4b4fa);
  }
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    gap: 20px;
  }
  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

// 🌱 Styled Components
const PageWrapper = styled.section`
  padding: 40px 0;
`;

const Card = styled(motion.div)`
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
  &:hover {
    background-color: #45a049;
  }
`;

// 🌱 Component
const Kinesthetic2 = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <PageWrapper className="container">
        <div className="grid grid-2">
          {/* Left Section */}
          <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>🌿 Kinesthetic Learning - Activity 2</h1>
            <p style={{ fontSize: "18px" }}>
              Let’s do a hands-on activity! Imagine you are building a model of the solar system
              using paper, colors, and string. This helps you understand how planets revolve around the sun.
            </p>
            <StyledButton onClick={() => navigate("/Kinesthetic_quiz2")}>
              Try the quiz ➡️
            </StyledButton>
          </Card>

          {/* Right Section */}
          <Card initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <h2>🎨 Try it Yourself!</h2>
            <ul>
              <li>Cut out circles of different sizes for planets.</li>
              <li>Arrange them around the sun with strings.</li>
              <li>Observe how they move around!</li>
            </ul>
          </Card>
        </div>
      </PageWrapper>
    </>
  );
};

export default Kinesthetic2;
