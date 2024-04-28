import React from "react";
import "./style.css";

function Table({ data, selectedOption }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="checkboxCell">
            <input type="checkbox" />{" "}
          </th>
          <th style={{ width: "240px" }}>Mediaction</th>
          <th style={{ width: "130px" }}>Dose</th>
          <th style={{ width: "160px" }}>Route</th>
          <th>Instructions</th>
        </tr>
      </thead>
      <tbody>
        {selectedOption &&
          data[selectedOption].map((item, index) => (
            <tr key={index}>
              <td className="checkboxCell">
                <input type="checkbox" />
              </td>
              {Object.values(item).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
