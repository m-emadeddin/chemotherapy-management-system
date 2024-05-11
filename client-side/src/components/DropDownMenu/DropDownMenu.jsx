import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import RegimenDetails from "components/regimenDetails/RegimenDetails";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import { usePlanDetails } from "contexts/PlansDetails";
import Loader from "components/Loader/Loader";

export default function DropDownMenu() {
  const { newRegimenDetails } = useRegimenDetails();
  const { plansNames, plansIds, setPlanId, isLoading } = usePlanDetails();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const dropdownRef = useRef(null);

  useEffect(() => {
    newRegimenDetails && setSelectedOption(newRegimenDetails.regimenName);
  }, [newRegimenDetails]);

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
      setPlanId(planId);
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
      {selectedOption !== "none" && (
        <RegimenDetails selectedOption={selectedOption} />
      )}
    </div>
  );
}
