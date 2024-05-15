import React, { createContext, useContext, useState } from "react";

const RegimenDetailsContext = createContext();

export const RegimenDetailsProvider = ({ children }) => {
  const [newRegimenDetails, setNewRegimenDetails] = useState(null);
  const [Start_Date, setStartDate] = useState(null);
  const [dateValue, setDateValue] = useState(null);

  return (
    <RegimenDetailsContext.Provider
      value={{
        newRegimenDetails,
        setNewRegimenDetails,
        Start_Date,
        setStartDate,
        setDateValue,
        dateValue,
      }}
    >
      {children}
    </RegimenDetailsContext.Provider>
  );
};

export const useRegimenDetails = () => useContext(RegimenDetailsContext);

// Code With Save Into Local Storage = > Give Error when i press back while presisting in review && when i submit order and order a new one again
// But Thanks God Problem of Reloading review Page is resolved ههاء

/*
// contexts/RegimenDetailsProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";

const RegimenDetailsContext = createContext();

export const RegimenDetailsProvider = ({ children }) => {
  const [newRegimenDetails, setNewRegimenDetails] = useState(
    () => JSON.parse(localStorage.getItem("newRegimenDetails")) || null
  );
  const [Start_Date, setStartDate] = useState(
    () => JSON.parse(localStorage.getItem("Start_Date")) || null
  );
  const [dateValue, setDateValue] = useState(
    () => JSON.parse(localStorage.getItem("dateValue")) || null
  );

  useEffect(() => {
    localStorage.setItem("newRegimenDetails", JSON.stringify(newRegimenDetails));
  }, [newRegimenDetails]);

  useEffect(() => {
    localStorage.setItem("Start_Date", JSON.stringify(Start_Date));
  }, [Start_Date]);

  useEffect(() => {
    localStorage.setItem("dateValue", JSON.stringify(dateValue));
  }, [dateValue]);

  return (
    <RegimenDetailsContext.Provider
      value={{
        newRegimenDetails,
        setNewRegimenDetails,
        Start_Date,
        setStartDate,
        setDateValue,
        dateValue,
      }}
    >
      {children}
    </RegimenDetailsContext.Provider>
  );
};

export const useRegimenDetails = () => useContext(RegimenDetailsContext);

*/