// contexts/SelectedPatientProvider.js
import { createContext, useContext, useState } from "react";

const SelectedPatientContext = createContext();

export const SelectedPatientProvider = ({ children }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <SelectedPatientContext.Provider value={{ selectedPatientId, setSelectedPatientId }}>
      {children}
    </SelectedPatientContext.Provider>
  );
};

export const useSelectedPatient = () => useContext(SelectedPatientContext);
