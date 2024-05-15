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
