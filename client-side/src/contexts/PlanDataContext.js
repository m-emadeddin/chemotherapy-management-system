import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePlanDetails } from "./PlansDetails";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const PlanDataContext = createContext();

export const PlanDataProvider = ({ children }) => {
  const auth = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [chemotherapyData, setChemotherapyData] = useState([]);
  const [preMedicationsData, setPreMedicationsData] = useState([]);
  const { planId } = usePlanDetails();

  useEffect(() => {
    if (planId) {
      axios
        .get(`/order/chemo-medications/${planId}`, {
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        })
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
        .get(`/order/pre-medications/${planId}`, {
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        })
        .then((res) => {
          setPreMedicationsData(res.data.preMedications);
          setLoading(false);
        })
        .catch((err) => {
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
      }}
    >
      {children}
    </PlanDataContext.Provider>
  );
};

export const usePlanData = () => useContext(PlanDataContext);
