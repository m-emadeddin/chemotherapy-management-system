import React from "react";
import "./style.css";

function Table({ data, selectedOption, checkedItems, onCheckboxChange }) {
  return (
    <table className="medications-table">
      <thead>
        <tr>
          <th className="checkboxCell"></th>
          <th className="med-cell">Mediaction</th>
          <th className="dose-cell">Dose</th>
          <th className="reduction-cell"></th>
          <th className="route-cell">Route</th>
          <th>Instructions</th>
        </tr>
      </thead>
      <tbody>
        {selectedOption &&
          data[selectedOption]?.map((item, index) => (
            <tr key={index}>
              <td className="checkboxCell">
                <label className="container">
                  <input
                    type="checkbox"
                    checked={checkedItems[index] || false}
                    onChange={() => onCheckboxChange(index, item)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td>{item.Medication}</td>
              <td>{item.Dose}</td>
              <td style={{ color: "#E84853", fontWeight: "700" }}>
                {item.doseReduction !== null ? item.doseReduction : null}
              </td>
              <td>{item.Route}</td>
              <td>{item.Instructions}</td>{" "}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
