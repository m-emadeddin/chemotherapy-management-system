import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const PatientsInfoContext = createContext();


export const PatientsInfoProvider = ({ children }) => {
  const auth = useAuth();
  const [patientsInfo, setPatientsInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("patientsInfo")) || null;
  });
  const [fetchAttempted, setFetchAttempted] = useState(false);

  const fetchPatientsInfo = async (type = "all") => {
    try {
      let url = "";
      switch(type){
        case "active":
          url = "/patient/active-patients";
          break;
        case "non-active":
          url = "/patient/non-active-patients";
          break;
        default:
          url = "/patient/all-patients"
      }
      const response = await fetch(url, { 
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.userToken}`,
        },
      });
  
      if (!response.ok) {
        console.log(`Failed to fetch patient details: ${response.status}`);
        setFetchAttempted(true);
      }
  
      const data = await response.json();
      setPatientsInfo(data);
      localStorage.setItem("patientsInfo", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch patient details");
      setFetchAttempted(true);
    }
  };

  useEffect(() => {
    if ((patientsInfo === null || patientsInfo.error) && !fetchAttempted) {
      fetchPatientsInfo();
    }
  }, [patientsInfo, fetchAttempted]);

  const deletePatient = async (patientId) => {
    try {
      const response = await fetch(`/patient/delete-patient/${patientId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.userToken}`,
        },
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
    fetchPatientsInfo,
  };

  return (
    <PatientsInfoContext.Provider value={patientsInfoValues}>
      {patientsInfo !== null ? children : null}
      <Toaster />
    </PatientsInfoContext.Provider>
  );
};

export const usePatientsInfo = () => {
  const context = useContext(PatientsInfoContext);
  if (!context) {
    throw new Error("usePatientsInfo must be used within a PatientsInfoProvider");
  }

  const { fetchPatientsInfo } = context;

  const fetchPatientsByType = async (type) => {
    await fetchPatientsInfo(type);
  };

  return {
    ...context,
    fetchPatientsByType,
  };
};