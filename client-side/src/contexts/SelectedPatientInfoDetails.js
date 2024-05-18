// contexts/SelectedPatientInfoProvider.js
import { createContext, useState, useContext, useEffect } from "react";

const SelectedPatientInfoContext = createContext();

export const SelectedPatientInfoProvider = ({ children }) => {
  const [selectedPatientInfo, setSelectedPatientInfo] = useState(
    () => JSON.parse(localStorage.getItem("selectedPatientInfo")) || null
  );

  useEffect(() => {
    localStorage.setItem(
      "selectedPatientInfo",
      JSON.stringify(selectedPatientInfo)
    );
    localStorage.removeItem("regimen-details");
    localStorage.removeItem("regimen-details-api");
  }, [selectedPatientInfo]);

  return (
    <SelectedPatientInfoContext.Provider
      value={{ selectedPatientInfo, setSelectedPatientInfo }}
    >
      {children}
    </SelectedPatientInfoContext.Provider>
  );
};

export const useSelectedPatientInfo = () =>
  useContext(SelectedPatientInfoContext);
