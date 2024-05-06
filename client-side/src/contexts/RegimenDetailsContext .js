import React, { createContext, useContext, useState } from "react";

const RegimenDetailsContext = createContext();

export const RegimenDetailsProvider = ({ children }) => {
  const [newRegimenDetails, setNewRegimenDetails] = useState(null);

  return (
    <RegimenDetailsContext.Provider
      value={{ newRegimenDetails, setNewRegimenDetails }}
    >
      {children}
    </RegimenDetailsContext.Provider>
  );
};

export const useRegimenDetails = () => useContext(RegimenDetailsContext);
