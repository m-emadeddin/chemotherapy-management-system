import React, { useState } from "react";
import "./style.css";

function Table({ data, selectedOption, checkedItems, onCheckboxChange, id }) {
  const [expandedRows, setExpandedRows] = useState([]);

  function toggleText(index) {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevExpandedRows, index]
    );
  }
  return (
    <table className="medications-table">
      <thead>
        <tr>
          <th className="med-cell">Mediaction</th>
          <th className="dose-cell">Dose</th>
          <th className="reduction-cell"></th>
          <th className="route-cell">Route</th>
          <th>Instructions</th>
          <td className="buttons-cell"></td>
        </tr>
      </thead>
      {id === "pre-med" && (
        <tbody>
          {selectedOption &&
            data[selectedOption]?.map((item, index) => (
              <tr key={index}>
                <td>{item.Medication}</td>
                <td>{item.Dose}</td>
                <td></td>
                <td>{item.Route}</td>
                <td
                  className={` ${
                    expandedRows.includes(index) ? "expanded" : "truncate"
                  }`}
                  onClick={() => toggleText(index)}
                >
                  {item.Instructions}
                </td>{" "}
                <td className="buttons-container">
                  <button className="btn edit">Edit</button>
                  <button className="btn del">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      )}
      {id === "chemo" && (
        <tbody>
          {selectedOption &&
            data[selectedOption]?.map((item, index) => (
              <tr key={index}>
                <td>{item.Medication}</td>
                <td>{item.Dose}</td>
                <td style={{ color: "#E84853", fontWeight: "700" }}>
                  {item.doseReduction !== null ? item.doseReduction : null}
                </td>
                <td>{item.Route}</td>
                <td
                  className={` ${
                    expandedRows.includes(index) ? "expanded" : "truncate"
                  }`}
                  onClick={() => toggleText(index)}
                >
                  {item.Instructions}
                </td>{" "}
                <td className="buttons-container">
                  <button className="btn dose">Change Dose</button>
                  <button className="btn edit">Edit</button>
                  <button className="btn del">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      )}
    </table>
  );
}

export default Table;
