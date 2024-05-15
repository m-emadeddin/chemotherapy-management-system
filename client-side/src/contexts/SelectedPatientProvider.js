// contexts/SelectedPatientProvider.js
import { createContext, useContext, useState, useEffect } from "react";

const SelectedPatientContext = createContext();

export const SelectedPatientProvider = ({ children }) => {
  const [selectedPatientId, setSelectedPatientId] = useState(
    () => JSON.parse(localStorage.getItem("selectedPatientId")) || null
  );

  useEffect(() => {
    localStorage.setItem("selectedPatientId", JSON.stringify(selectedPatientId));
  }, [selectedPatientId]);

  return (
    <SelectedPatientContext.Provider value={{ selectedPatientId, setSelectedPatientId }}>
      {children}
    </SelectedPatientContext.Provider>
  );
};

export const useSelectedPatient = () => useContext(SelectedPatientContext);
