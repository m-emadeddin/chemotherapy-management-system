import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const PlanDetailsContext = createContext();

export const PlansDetailsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [plansNames, setPlansNames] = useState([]);
  const [plansIds, setPlansIds] = useState([]);
  const [planId, setPlanId] = useState();
  const [planName, setPlanName] = useState();
  const [AllCycles, setAllCycles] = useState([]);
  const [planCycles, setPlanCycles] = useState(1);
  const [AllWeeks, setAllWeeks] = useState([]);
  const [planWeeks, setPlanWeeks] = useState(1);

  // id will be taken later from patient page or something
  const patientId = 2; // or 2 for now

  useEffect(() => {
    axios
      .get(`/order/get-regimen/${patientId}`)
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
  }, [patientId]);

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
      }}
    >
      {children}
    </PlanDetailsContext.Provider>
  );
};

export const usePlanDetails = () => useContext(PlanDetailsContext);
