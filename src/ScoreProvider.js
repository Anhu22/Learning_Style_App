import React, { createContext, useState } from "react";

// Create a context
export const ScoreContext = createContext();

// Provide the context to the app
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    read: null,
    video: null,
    kinesthetic: null,
  });

  const setReadScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, read: score }));
  };

  const setVideoScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, video: score }));
  };

  const setKinestheticScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, kinesthetic: score }));
  };

  return (
    <ScoreContext.Provider value={{ scores, setReadScore, setVideoScore, setKinestheticScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
