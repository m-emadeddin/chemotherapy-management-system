import React, { useState, useEffect, useRef } from "react";
import "./style.css";

export default function MiniDropMenu({ title, options, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || " ");
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
    setSelectedOption(defaultValue || " ");
  }, [defaultValue, options]);
 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="mini-dropdown-container" ref={dropdownRef}>
        <div
          className={`mini-dropdown-header ${isOpen ? "open" : ""}`}
          onClick={toggleDropdown}
        >
          <span>{selectedOption}</span>
          {title === "Weeks" && selectedOption !== "None" && <span>Weeks</span>}
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
      {title === "fieldsNum" && selectedOption && (
        <div className="inputs-container">
          {Array.from({ length: parseInt(selectedOption) }, (_, index) => (
            <input required key={index} type="number" className="day-input" />
          ))}
        </div>
      )}
    </>
  );
}
