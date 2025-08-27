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

const ReadWrite3 = () => {
  return (
    <Wrapper>
      <Title>
        <h1>Welcome to Learning Fractions!</h1>
      </Title>
      <HomeContainer>
       <h2>What Are Fractions?</h2>
<p>A fraction shows a part of a whole. It has two numbers:

Numerator – the top number, which tells how many parts you have.

Denominator – the bottom number, which tells how many equal parts the whole is divided into.

Example:
If a pizza is cut into 4 equal slices and you eat 1 slice:

Numerator = 1 (the slice you ate)

Denominator = 4 (total slices)

Fraction = 1/4

Fractions are used in daily life whenever we divide something into parts, like sharing food, measuring ingredients, or tracking progress.</p>
        <h2>Applying Fractions in Real Life</h2>
        <p>
          Now that you understand what fractions are, let’s <strong>apply</strong> them to
          solve real-world problems.
        </p>

        <p><strong>Example 1:</strong></p>
        <ul>
          <li>
            You baked a cake and cut it into 8 equal slices. If you ate 3 slices, what fraction of the cake did you eat? 
            <br /><br />
            <em>Step 1:</em> Total slices = 8 → denominator. <br />
            <em>Step 2:</em> Slices you ate = 3 → numerator. <br />
            <em>Step 3:</em> Fraction = 3/8. <br />
            ✅ So, you ate <strong>3/8 of the cake</strong>.
          </li>
        </ul>

        <p><strong>Example 2:</strong></p>
        <ul>
          <li>
            A class has 20 students. 5 of them are wearing glasses. What fraction of the students wear glasses? 
            <br /><br />
            <em>Step 1:</em> Total students = 20 → denominator. <br />
            <em>Step 2:</em> Students with glasses = 5 → numerator. <br />
            <em>Step 3:</em> Fraction = 5/20. <br />
            <em>Step 4:</em> Simplify → divide numerator and denominator by 5 → 1/4. <br />
            ✅ So, <strong>1/4 of the class</strong> wears glasses.
          </li>
        </ul>

        <p><strong>Example 3:</strong></p>
        <ul>
          <li>
            You ran 6 kilometers out of your 10 km goal. What fraction of your goal have you completed? 
            <br /><br />
            <em>Step 1:</em> Total distance = 10 → denominator. <br />
            <em>Step 2:</em> Distance run = 6 → numerator. <br />
            <em>Step 3:</em> Fraction = 6/10. <br />
            <em>Step 4:</em> Simplify → divide numerator and denominator by 2 → 3/5. <br />
            ✅ So, you completed <strong>3/5 of your goal</strong>.
          </li>
        </ul>

        <h3>Practice Questions:</h3>
        <ol>
          <li>If you drink 2 cups of water out of 5 in a day, what fraction have you drunk?</li>
          <li>A pizza has 12 slices. If your friend eats 9 slices, what fraction of the pizza did they eat? Can you simplify it?</li>
          <li>A fruit basket has 15 fruits: 6 apples, 5 oranges, and 4 bananas. Write the fraction of fruits that are apples.</li>
        </ol>

        <p><strong>Challenge Task:</strong>  
          Imagine you are making lemonade. The recipe needs 3/4 cup of sugar. If you only have a 1/4 cup measuring spoon, how many times will you fill it to measure the sugar?  
          <br /><br />
          <em>Hint:</em> Each spoon is 1/4. Keep adding:  
          1/4 + 1/4 + 1/4 = 3/4.  
          ✅ So, you will need to fill the spoon <strong>3 times</strong>.
        </p>
      </HomeContainer>

      <ButtonContainer>
        <Link to="/rw_quiz3">
          <Button>Start the Quiz</Button>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ReadWrite3;
