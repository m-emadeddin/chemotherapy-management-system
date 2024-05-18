import React, { useState } from "react";
import "./style.css";
import DeletePopUp from "components/DeletePopUp/DeletePopUp";
import EditPopUp from "components/EditPopUp/EditPopUp";
import DosePopUp from "components/DosePopUp/DosePopUp";
import Loader from "components/Loader/Loader";
import { usePlanData } from "contexts/PlanDataContext";

function Table({ data, selectedOption, id, onDelete, onEdit, onChangeDose }) {
  const { isLoading } = usePlanData();
  const [expandedRows, setExpandedRows] = useState([]);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showDosePopUp, setShowDosePopUp] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [doseIndex, setDoseIndex] = useState(null);

  function toggleText(index) {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(index)
        ? prevExpandedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevExpandedRows, index]
    );
  }

  const handleDelete = (index) => {
    setShowDeletePopUp(true);
    setDeleteIndex(index);
  };
  const handleConfirmDelete = () => {
    onDelete(id, deleteIndex);
    setShowDeletePopUp(false);
  };
  const handleEdit = (index) => {
    setShowEditPopUp(true);
    setEditIndex(index);
  };
  const handleConfirmEdit = () => {
    setShowEditPopUp(false);
  };
  const handleDose = (index) => {
    setShowDosePopUp(true);
    setDoseIndex(index);
  };
  const handleConfirmDose = () => {
    setShowDosePopUp(false);
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
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
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.dose}</td>
                <td></td>
                <td>{item.route}</td>
                <td
                  className={`${
                    expandedRows.includes(index) ? "expanded" : "truncate"
                  }`}
                  onClick={() => toggleText(index)}
                >
                  {item.Instructions}
                </td>
                <td className="buttons-container">
                  <button
                    className="btn edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn del"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {id === "chemo" && (
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.dose}</td>
                <td style={{ color: "#E84853", fontWeight: "700" }}>
                  {item.doseReduction !== null ? item.doseReduction : null}
                </td>
                <td>{item.route}</td>
                <td
                  className={`${
                    expandedRows.includes(index) ? "expanded" : "truncate"
                  }`}
                  onClick={() => toggleText(index)}
                >
                  {item.Instructions}
                </td>
                <td className="buttons-container">
                  <button
                    className="btn dose"
                    onClick={() => handleDose(index)}
                  >
                    Change Dose
                  </button>
                  <button
                    className="btn edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn del"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {showDeletePopUp && (
        <DeletePopUp
          onClose={() => setShowDeletePopUp(false)}
          onConfirm={handleConfirmDelete}
          data={data}
          deleteIndex={deleteIndex}
          id={id}
        />
      )}
      {showEditPopUp && (
        <EditPopUp
          onClose={() => setShowEditPopUp(false)}
          onConfirm={handleConfirmEdit}
          data={data}
          editIndex={editIndex}
          onEdit={onEdit}
          id={id}
        />
      )}
      {showDosePopUp && (
        <DosePopUp
          onClose={() => setShowDosePopUp(false)}
          onConfirm={handleConfirmDose}
          selectedOption={selectedOption}
          data={data}
          doseIndex={doseIndex}
          onChangeDose={onChangeDose}
        />
      )}
    </>
  );
}

export default Table;
