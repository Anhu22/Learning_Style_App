import React, { createContext, useState } from "react";

// Create a context
export const ScoreContext = createContext();

// Provide the context to the app
export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    read: null,
    video: null,
  });

  const setReadScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, read: score }));
  };

  const setVideoScore = (score) => {
    setScores((prevScores) => ({ ...prevScores, video: score }));
  };

  return (
    <ScoreContext.Provider value={{ scores, setReadScore, setVideoScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
