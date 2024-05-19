import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelectedPatientInfo } from "./SelectedPatientInfoDetails";
import { useAuth } from "./AuthContext";

const PlanDetailsContext = createContext();

export const PlansDetailsProvider = ({ children }) => {
  const { selectedPatientInfo } = useSelectedPatientInfo();
  const auth = useAuth();

  const [isLoading, setLoading] = useState(true);
  const [plansNames, setPlansNames] = useState([]);
  const [plansIds, setPlansIds] = useState([]);
  const [planId, setPlanId] = useState(null);
  const [planName, setPlanName] = useState(null);
  const [AllCycles, setAllCycles] = useState([]);
  const [planCycles, setPlanCycles] = useState(1);
  const [AllWeeks, setAllWeeks] = useState([]);
  const [planWeeks, setPlanWeeks] = useState(1);
  const [originalCycles, setoriginalCycles] = useState(null);
  const [originalWeeks, setoriginalWeeks] = useState(null);

  // Function to save data to local storage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Function to get data from local storage
  const getFromLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  useEffect(() => {
    // Retrieve data from local storage on mount
    const storedPlanId = getFromLocalStorage('planId');
    const storedPlanName = getFromLocalStorage('planName');
    const storedPlansNames = getFromLocalStorage('plansNames');
    const storedPlansIds = getFromLocalStorage('plansIds');
    const storedAllCycles = getFromLocalStorage('AllCycles');
    const storedAllWeeks = getFromLocalStorage('AllWeeks');
    const storedPlanCycles = getFromLocalStorage('planCycles');
    const storedPlanWeeks = getFromLocalStorage('planWeeks');
    const storedOriginalCycles = getFromLocalStorage('originalCycles');
    const storedOriginalWeeks = getFromLocalStorage('originalWeeks');

    if (storedPlanId) setPlanId(storedPlanId);
    if (storedPlanName) setPlanName(storedPlanName);
    if (storedPlansNames) setPlansNames(storedPlansNames);
    if (storedPlansIds) setPlansIds(storedPlansIds);
    if (storedAllCycles) setAllCycles(storedAllCycles);
    if (storedAllWeeks) setAllWeeks(storedAllWeeks);
    if (storedPlanCycles) setPlanCycles(storedPlanCycles);
    if (storedPlanWeeks) setPlanWeeks(storedPlanWeeks);
    if (storedOriginalCycles) setoriginalCycles(storedOriginalCycles);
    if (storedOriginalWeeks) setoriginalWeeks(storedOriginalWeeks);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (selectedPatientInfo) {
      setLoading(true);
      axios
        .get(`/order/get-regimen/${selectedPatientInfo?.Patient_ID}`, {
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        })
        .then((res) => {
          const regimensData = res.data.regimenName;
          const newRegimens = regimensData.map((regimenData) => {
            return {
              planId: regimenData.Plan_ID,
              planName: regimenData.Plan_Name,
              planCycles: regimenData.number_of_Cycles,
              planWeeks: regimenData.number_of_Weeks,
            };
          });
          const plansIds = newRegimens.map((regimen) => regimen.planId);
          const plansNames = newRegimens.map((regimen) => regimen.planName);
          const AllCycles = newRegimens.map((regimen) => regimen.planCycles);
          const AllWeeks = newRegimens.map((regimen) => regimen.planWeeks);
          setAllWeeks(AllWeeks);
          setAllCycles(AllCycles);
          setPlansIds(plansIds);
          setPlansNames(plansNames);
          saveToLocalStorage('plansNames', plansNames);
          saveToLocalStorage('plansIds', plansIds);
          saveToLocalStorage('AllCycles', AllCycles);
          saveToLocalStorage('AllWeeks', AllWeeks);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in fetching PlansDetails", err);
        });
    }
  }, [selectedPatientInfo]);

  // Save to local storage whenever the state changes
  useEffect(() => {
    saveToLocalStorage('planId', planId);
  }, [planId]);

  useEffect(() => {
    saveToLocalStorage('planName', planName);
  }, [planName]);

  useEffect(() => {
    saveToLocalStorage('planCycles', planCycles);
  }, [planCycles]);

  useEffect(() => {
    saveToLocalStorage('planWeeks', planWeeks);
  }, [planWeeks]);

  useEffect(() => {
    saveToLocalStorage('originalCycles', originalCycles);
  }, [originalCycles]);

  useEffect(() => {
    saveToLocalStorage('originalWeeks', originalWeeks);
  }, [originalWeeks]);

  return (
    <PlanDetailsContext.Provider
      value={{
        plansNames,
        plansIds,
        setPlanId,
        setPlansNames,
        planId,
        isLoading,
        planName,
        setPlanName,
        planCycles,
        setPlanCycles,
        AllCycles,
        AllWeeks,
        planWeeks,
        setPlanWeeks,
        originalCycles,
        originalWeeks,
        setoriginalCycles,
        setoriginalWeeks,
      }}
    >
      {children}
    </PlanDetailsContext.Provider>
  );
};

export const usePlanDetails = () => useContext(PlanDetailsContext);
