import React, { createContext, useContext, useState, useEffect } from "react";

const RegimenDetailsContext = createContext();

export const RegimenDetailsProvider = ({ children }) => {
  const [newRegimenDetails, setNewRegimenDetails] = useState(() => {
    const savedDetails = localStorage.getItem("newRegimenDetails");
    return savedDetails ? JSON.parse(savedDetails) : null;
  });

  const [Start_Date, setStartDate] = useState(null);
  const [dateValue, setDateValue] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("newRegimenDetails", JSON.stringify(newRegimenDetails));
  }, [newRegimenDetails]);

  const updateRegimenDetails = (details) => {
    try {
      setNewRegimenDetails(details);
      setError(null); // Clear any previous errors if successful
    } catch (err) {
      console.error("Failed to update regimen details:", err);
      setError(err.message || "An unknown error occurred");
    }
  };

  const resetError = () => setError(null);

  return (
    <RegimenDetailsContext.Provider
      value={{
        newRegimenDetails,
        setNewRegimenDetails: updateRegimenDetails,
        Start_Date,
        setStartDate,
        dateValue,
        setDateValue,
        error,
        resetError,
      }}
    >
      {children}
    </RegimenDetailsContext.Provider>
  );
};

export const useRegimenDetails = () => useContext(RegimenDetailsContext);