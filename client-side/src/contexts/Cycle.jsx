// MyContext.js
import React, { createContext, useContext, useState } from "react";

// Create a new context
const Cycle = createContext();

// Create a provider component
export const CycleProvider = ({ children }) => {
  const [cycleID, setCycleID] = useState(1);

  return (
    <Cycle.Provider value={{ cycleID, setCycleID }}>{children}</Cycle.Provider>
  );
};

// Custom hook to use the context
export const useCycle = () => useContext(Cycle);
