import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import RegimenDetails from "components/redimenDetails/RegimenDetails";

const regimens = [
  "CHOP: Protocol for Non Hodgkin Lymphoma",
  "AC - Regimen for Non-Metastatic, Locally-Advanced Breast Cancer. Before or after Taxol",
  "CMF-Breast Cancer Regimen",
  "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma",
];

export default function DropDownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const dropdownRef = useRef(null);

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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
            {regimens.map((regimen, index) => (
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
