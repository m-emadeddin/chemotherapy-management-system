import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePlanDetails } from "./PlansDetails";
import toast from "react-hot-toast";

const PlanDataContext = createContext();

export const PlanDataProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [chemotherapyData, setChemotherapyData] = useState([]);
  const [preMedicationsData, setPreMedicationsData] = useState([]);
  const { planId } = usePlanDetails();
  const [hasPreMedications, setHasPreMedications] = useState(false);

  useEffect(() => {
    if (planId) {
      axios
        .get(`/order/chemo-medications/${planId}`)
        .then((res) => {
          setChemotherapyData(res.data.chemoMedications);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in fetching chemoMedications", err);
        });
    }
  }, [planId]);

  useEffect(() => {
    if (planId) {
      axios
        .get(`/order/pre-medications/${planId}`)
        .then((res) => {
          setPreMedicationsData(res.data.preMedications);
          setLoading(false);
          setHasPreMedications(true);
        })
        .catch((err) => {
          setHasPreMedications(false);
          toast("This regimen has no premedications");
          console.log("Error in fetching preMedications", err);
        });
    }
  }, [planId]);
  return (
    <PlanDataContext.Provider
      value={{
        chemotherapyData,
        isLoading,
        preMedicationsData,
        hasPreMedications,
      }}
    >
      {children}
    </PlanDataContext.Provider>
  );
};

export const usePlanData = () => useContext(PlanDataContext);
