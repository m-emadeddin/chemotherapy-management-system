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
  const [planId, setPlanId] = useState();
  const [planName, setPlanName] = useState();
  const [AllCycles, setAllCycles] = useState([]);
  const [planCycles, setPlanCycles] = useState(1);
  const [AllWeeks, setAllWeeks] = useState([]);
  const [planWeeks, setPlanWeeks] = useState(1);
  const [originalCycles, setoriginalCycles] = useState();
  const [originalWeeks, setoriginalWeeks] = useState();

  useEffect(() => {
    if (selectedPatientInfo) {
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
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in fetching PlansDetails", err);
        });
    }
  }, [selectedPatientInfo]);

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
