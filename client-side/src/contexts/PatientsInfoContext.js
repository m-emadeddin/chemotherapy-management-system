import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const PatientsInfoContext = createContext();

export const PatientsInfoProvider = ({ children }) => {
  const [patientsInfo, setPatientsInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("patientsInfo")) || null;
  });

  const fetchPatientsInfo = async () => {
    try {
      const response = await fetch("/patient/all-patients");
      if (!response.ok) {
        throw new Error("Failed to fetch patient details");
      }
      const data = await response.json();
      setPatientsInfo(data);
      localStorage.setItem("patientsInfo", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch patient details");
    }
  };

  useEffect(() => {
    if (!patientsInfo) {
      fetchPatientsInfo();
    }
  }, [patientsInfo]);

  const deletePatient = async (patientId) => {
    try {
      const response = await fetch(`/patient/delete-patient/${patientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to delete patient");
        throw new Error("Failed to delete patient");
      }
      fetchPatientsInfo();
      toast.success("Patient deleted successfully", { duration: 900 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete patient");
    }
  };

  const patientsInfoValues = {
    patientsInfo,
    deletePatient,
  };

  return (
    <PatientsInfoContext.Provider value={patientsInfoValues}>
      {patientsInfo !== null ? children : null}
      <Toaster />
    </PatientsInfoContext.Provider>
  );
};

export const usePatientsInfo = () => useContext(PatientsInfoContext);
