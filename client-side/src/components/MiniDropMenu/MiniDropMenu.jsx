import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { usePlanDetails } from "contexts/PlansDetails";

export default function MiniDropMenu({
  title,
  options,
  defaultValueCycles,
  defaultValueWeeks,
  onChange,
  defaultValue,
}) {
  const { setPlanCycles, setPlanWeeks } = usePlanDetails();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    if (title === "Weeks") {
      return defaultValueWeeks;
    } else if (title === "Cycles") {
      return defaultValueCycles;
    } else if (title === "route") {
      return defaultValue;
    } else {
      return null;
    }
  });
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
  useEffect(() => {
    if (title === "Weeks") {
      setSelectedOption(defaultValueWeeks);
    } else if (title === "Cycles") {
      setSelectedOption(defaultValueCycles);
    } else if (title === "route") {
      setSelectedOption(defaultValue);
    }
  }, [title, defaultValueWeeks, defaultValueCycles, defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
    if (title === "Cycles") setPlanCycles(option);

    if (title === "Weeks") setPlanWeeks(option);
  };
  return (
    <>
      <div className="mini-dropdown-container" ref={dropdownRef}>
        <div
          className={`mini-dropdown-header ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <span>{selectedOption}</span>
          {title === "Weeks" && (
            <span>{selectedOption === 1 ? "Week" : "Weeks"}</span>
          )}
          {title === "Cycles" && (
            <span>{selectedOption === 1 ? "Cycle" : "Cycles"}</span>
          )}
          <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
        </div>
        {isOpen && (
          <div className="mini-dropdown-list">
            {options.map((option, index) => (
              <div
                key={index}
                className="mini-dropdown-option"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
