import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import RegimenDetails from "components/regimenDetails/RegimenDetails";
import { usePlanDetails } from "contexts/PlansDetails";
import Loader from "components/Loader/Loader";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
import { useAuth } from "contexts/AuthContext";

export default function DropDownMenu() {
  const auth = useAuth();
  const { newRegimenDetails } = useRegimenDetails();
  const {
    plansNames,
    plansIds,
    setPlanId,
    isLoading,
    setPlanName,
    AllCycles,
    setPlanCycles,
    AllWeeks,
    setoriginalCycles,
    setoriginalWeeks,
    setPlanWeeks,
  } = usePlanDetails();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const [hasTreatmentPlan, setHasTreatmentPlan] = useState(false);
  const { selectedPatientInfo } = useSelectedPatientInfo();

  const dropdownRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/patient/has-treatmentplan/${selectedPatientInfo.Patient_ID}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.userToken}`,
            },
          }
        );
        const { exists } = await response.json();
        setHasTreatmentPlan(exists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedPatientInfo.Patient_ID]);

  const storedRegimenDetails = localStorage.getItem(
    `regimen-details-${selectedPatientInfo.Patient_ID}`
  );
  useEffect(() => {
    if (newRegimenDetails && hasTreatmentPlan) {
      setSelectedOption(newRegimenDetails?.Plan_Name);
    } else if (storedRegimenDetails) {
      console.log("kk", newRegimenDetails?.Plan_Name);
      setSelectedOption(newRegimenDetails?.Plan_Name);
    } else {
      setSelectedOption("none");
    }
  }, [hasTreatmentPlan, newRegimenDetails]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const index = plansNames.indexOf(option);
    if (index !== -1) {
      const planId = plansIds[index];
      const planName = plansNames[index];
      const planCycles = AllCycles[index];
      const planWeeks = AllWeeks[index];
      setPlanCycles(planCycles);
      setoriginalCycles(planCycles);
      setoriginalWeeks(planWeeks);
      setPlanWeeks(planWeeks);
      setPlanId(planId);
      setPlanName(planName);
      setSelectedOption(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="regimens-details-container">
      <div className="dropdown-container" ref={dropdownRef}>
        <div
          className={`dropdown-header ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <span>{selectedOption === "none" ? "None" : selectedOption}</span>
          <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {plansNames.map((regimen, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleOptionSelect(regimen)}
              >
                {regimen}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedOption !== "none" && !hasTreatmentPlan && <RegimenDetails />}
    </div>
  );
}
