import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { motion } from "framer-motion";

// === Config ===
const ITEMS = [
  { id: "water", label: "💧 Water" },
  { id: "co2", label: "🌬️ CO₂" },
  { id: "glucose", label: "🌱 Glucose" },
  { id: "oxygen", label: "O₂" }
];

const CORRECT_ORDER = ["water", "co2", "glucose", "oxygen"];

// === Styled Components ===
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #a6f3f3, #f4b4fa);
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const PlantArea = styled.div`
  position: relative;
  width: 500px;
  height: 400px;
  background: rgba(255,255,255,0.2);
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Plant = styled.div`
  font-size: 4rem;
`;

const SunCorner = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arrow = styled.div`
  width: 2px;
  height: 100px;
  background: #ffcc00;
  transform: rotate(45deg);
  margin-top: 5px;
`;

const DropZone = styled.div`
  position: absolute;
  width: 140px;
  height: 50px;
  border: 2px dashed #fff;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #fff;
`;

const DragBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const DragCard = styled(motion.div)`
  padding: 18px 24px;
  min-width: 120px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  cursor: grab;
`;

const StyledButton = styled.button`
  padding: 12px 28px;
  margin-top: 30px;
  background: linear-gradient(135deg, #4cafef, #1dd1a1);
  border: none;
  color: white;
  border-radius: 25px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover { transform: scale(1.05); }
`;

const WrongAnimation = styled(motion.div)`
  margin-top: 30px;
  color: #ff4d6d;
  text-align: center;
`;

// === Activity Component ===
const Activity = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(ITEMS.map(i => i.id));
  const [placed, setPlaced] = useState({});
  const [stage, setStage] = useState("idle");
  const [wrongAnim, setWrongAnim] = useState(false);

  const onDragEnd = (res) => {
    if (!res.destination) return;
    const np = [...inventory];
    const [item] = np.splice(res.source.index, 1);
    np.splice(res.destination.index, 0, item);
    setInventory(np);
  };

  const handleDrop = (id, key) => {
    if (id === key) {
      setPlaced(prev => ({ ...prev, [key]: ITEMS.find(x => x.id === key).label }));
      if (Object.keys(placed).length + 1 === CORRECT_ORDER.length) {
        setStage("complete");
      }
    } else {
      setWrongAnim(true);
      setTimeout(() => setWrongAnim(false), 1500);
    }
  };

  return (
    <PageWrapper>
      <Title>Photosynthesis Game 🌱</Title>

      <PlantArea>
        <Plant>🌱</Plant>

        {/* Sun in corner */}
        <SunCorner>
          ☀️
          <Arrow />
        </SunCorner>

        {/* Drop Zones */}
        <DropZone 
          style={{ bottom: 20, left: 20 }}
          onClick={() => inventory[0] && handleDrop(inventory[0], "water")}
        >
          {placed.water || "💧 Water"}
        </DropZone>

        <DropZone 
          style={{ top: 20, right: 20 }}
          onClick={() => inventory[0] && handleDrop(inventory[0], "co2")}
        >
          {placed.co2 || "🌬️ CO₂"}
        </DropZone>

        <DropZone 
          style={{ bottom: 20, right: 150 }}
          onClick={() => inventory[0] && handleDrop(inventory[0], "glucose")}
        >
          {placed.glucose || "🌱 Glucose"}
        </DropZone>

        <DropZone 
          style={{ bottom: 20, right: 20 }}
          onClick={() => inventory[0] && handleDrop(inventory[0], "oxygen")}
        >
          {placed.oxygen || "O₂"}
        </DropZone>
      </PlantArea>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="box" direction="horizontal">
          {(prov) => (
            <DragBox ref={prov.innerRef} {...prov.droppableProps}>
              {inventory.map((id, i) => (
                <Draggable draggableId={id} index={i} key={id}>
                  {(prov) => (
                    <DragCard
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      whileTap={{ scale: 0.95 }}
                    >
                      {ITEMS.find(x => x.id === id).label}
                    </DragCard>
                  )}
                </Draggable>
              ))}
              {prov.placeholder}
            </DragBox>
          )}
        </Droppable>
      </DragDropContext>

      {wrongAnim && (
        <WrongAnimation initial={{ opacity:0 }} animate={{ opacity:1 }}>
          ❌ Wrong placement! Try again.
        </WrongAnimation>
      )}

      {stage === "complete" && (
        <StyledButton onClick={() => navigate("/result")}>
          🎉 Completed! Next
        </StyledButton>
      )}
    </PageWrapper>
  );
};

export default Activity;
