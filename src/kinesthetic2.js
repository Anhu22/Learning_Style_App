import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// ================= Styled Components =================
const Wrapper = styled.div`
  min-height: 100vh;
  background: #e0f7fa;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #00796b;
  margin-bottom: 20px;
`;

const Steps = styled.ol`
  max-width: 800px;
  font-size: 18px;
  line-height: 1.8;
  color: #004d40;
  padding-left: 20px;
`;

const StepItem = styled.li`
  margin-bottom: 15px;
`;

const ExampleImage = styled.img`
  width: 500px;
  margin: 20px 0;
  border: 3px solid #004d40;
  border-radius: 12px;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 12px 25px;
  font-size: 18px;
  background: #00796b;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #004d40;
  }
`;

const PracticeContainer = styled.div`
  margin-top: 40px;
  background: #b2dfdb;
  padding: 20px;
  border-radius: 12px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Diagram = styled.div`
  position: relative;
  background: url("/image/Photosynthesis.png") no-repeat center/contain;
  width: 400px;
  height: 300px;
  margin-top: 20px;
`;

const DropZone = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  border: 3px dashed #004d40;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #004d40;
  background: #fff;
`;

const WordBank = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Word = styled.div`
  padding: 8px 12px;
  background: #fff;
  border: 2px solid #004d40;
  border-radius: 8px;
  cursor: grab;
`;

// ================= Tutorial Component =================
const TutorialPage = () => {
  const navigate = useNavigate();
  
  // Mini Practice State
  const initialPracticeWords = ["Sunlight", "Water"];
  const [bank, setBank] = useState(initialPracticeWords);
  const [zones, setZones] = useState({
    sunlight: null,
    water: null,
  });

  const onStart = () => {
    navigate('/kinesthetic_Quiz2'); // Navigate to the quiz page
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    // From bank → to zone
    if (source.droppableId === "bank" && destination.droppableId in zones) {
      setBank(bank.filter((w) => w !== draggableId));
      setZones({ ...zones, [destination.droppableId]: draggableId });
    }
    // From zone → back to bank
    else if (source.droppableId in zones && destination.droppableId === "bank") {
      setZones({ ...zones, [source.droppableId]: null });
      setBank([...bank, draggableId]);
    }
  };

  const allPlaced = Object.values(zones).every((z) => z !== null);

  return (
    <Wrapper>
      <Title>🌿 How to Play: Photosynthesis Drag & Drop</Title>
      
      <Steps>
        <StepItem>Look at the diagram of photosynthesis shown below.</StepItem>
        <StepItem>You will see a <strong>word bank</strong> containing terms like Sunlight, Water, Oxygen, Carbon dioxide, and Sugars.</StepItem>
        <StepItem><strong>Drag</strong> each word from the word bank and drop it into the correct circle in the diagram.</StepItem>
        <StepItem>Each circle corresponds to a component of photosynthesis (e.g., sunlight entering the plant, carbon dioxide absorbed, oxygen released).</StepItem>
        <StepItem>Once all words are placed correctly, the <strong>Submit</strong> button will appear.</StepItem>
        <StepItem>Click <strong>Submit</strong> to check your answers and complete the activity.</StepItem>
      </Steps>

      <ExampleImage src="image\Photosynthesis1.png" alt="Photosynthesis Diagram" />

      <PracticeContainer>
        <h2>📝 Practice!</h2>
        <p>Try placing these two words on the diagram:</p>

        <DragDropContext onDragEnd={onDragEnd}>
          <Diagram>
            <Droppable droppableId="sunlight">
              {(provided) => (
                <DropZone
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ top: "40px", left: "60px" }}
                >
                  {zones.sunlight && (
                    <Draggable draggableId={zones.sunlight} index={0}>
                      {(provided) => (
                        <Word
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {zones.sunlight}
                        </Word>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </DropZone>
              )}
            </Droppable>

            <Droppable droppableId="water">
              {(provided) => (
                <DropZone
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ top: "230px", left: "50px" }}
                >
                  {zones.water && (
                    <Draggable draggableId={zones.water} index={0}>
                      {(provided) => (
                        <Word
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {zones.water}
                        </Word>
                      )}
                    </Draggable>
                  )}
                  {provided.placeholder}
                </DropZone>
              )}
            </Droppable>
          </Diagram>

          <Droppable droppableId="bank" direction="horizontal">
            {(provided) => (
              <WordBank ref={provided.innerRef} {...provided.droppableProps}>
                {bank.map((word, index) => (
                  <Draggable key={word} draggableId={word} index={index}>
                    {(provided) => (
                      <Word
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {word}
                      </Word>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </WordBank>
            )}
          </Droppable>
        </DragDropContext>

        {allPlaced && <p style={{ marginTop: "15px", color: "#004d40", fontWeight: "bold" }}>✅ Great! You placed all correctly!</p>}
      </PracticeContainer>

      <Button onClick={onStart}>Start Playing 🎮</Button>
    </Wrapper>
  );
};

export default TutorialPage;
