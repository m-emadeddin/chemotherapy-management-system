import MiniDropMenu from "components/MiniDropMenu/MiniDropMenu";
import { useRef, useState } from "react";
import "./style.css";

export default function EditPopUp({
  onClose,
  onConfirm,
  selectedOption,
  data,
  editIndex,
  onEdit,
  id,
}) {
  const [dose, setDose] = useState(data[selectedOption][editIndex].Dose);
  const [route, setRoute] = useState(data[selectedOption][editIndex].Route);
  const [instructions, setInstructions] = useState(
    data[selectedOption][editIndex].Instructions
  );

  const EditPopUpRef = useRef();

  const closeEditPopUp = (e) => {
    if (EditPopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleDoseChange = (e) => {
    setDose(Number(e.target.value));
  };
  const handleRouteChange = (selectedOption) => {
    setRoute(selectedOption);
  };
  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };
  const handleConfirm = () => {
    const updatedItem = {
      ...data[selectedOption][editIndex],
      Dose: dose,
      Route: route,
      Instructions: instructions,
    };
    onConfirm(updatedItem);
    onEdit(id, selectedOption, editIndex, updatedItem);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="edit-popup-overlay"
      ref={EditPopUpRef}
      onClick={closeEditPopUp}
    >
      <div className="edit-popup-container">
        <div className="popup-heading">
          <div className="text">
            <img src="images/pop-icon.png" alt="icon" width={74} height={74} />
            <p>{data[selectedOption][editIndex].Medication}</p>
          </div>
          <div className="x-icon" onClick={handleClose}>
            <img src="images/x.svg" alt="x-icon" />
          </div>
        </div>
        <div className="edit-values">
          <p>Please enter the updated values:</p>
          <table>
            <thead>
              <tr>
                <th style={{ width: "150px" }}>Dose</th>
                <th style={{ width: "180px" }}>Route</th>
                <th>Instructions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="number"
                    className="dose-input"
                    value={dose}
                    onChange={handleDoseChange}
                  />
                </td>
                <td>
                  <MiniDropMenu
                    title="route"
                    options={["Oral", "Intravenous"]}
                    defaultValue={route}
                    onChange={handleRouteChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={instructions}
                    onChange={handleInstructionsChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <button className="btn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn save" onClick={handleConfirm}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
