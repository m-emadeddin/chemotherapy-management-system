import MiniDropMenu from "components/MiniDropMenu/MiniDropMenu";
import { useRef, useState } from "react";
import "./style.css";

export default function EditPopUp({
  onClose,
  selectedItemData,
  onSaveEdit,
  handleUnChecked,
}) {
  const [dose, setDose] = useState(selectedItemData.Dose);
  const [route, setRoute] = useState(selectedItemData.Route);
  const [instructions, setInstructions] = useState(
    selectedItemData.Instructions
  );

  const EditPopUpRef = useRef();

  const closeEditPopUp = (e) => {
    if (EditPopUpRef.current === e.target) {
      onClose();
      handleUnChecked();
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
  const handleSaveEdit = () => {
    const updatedItem = {
      ...selectedItemData,
      Dose: dose,
      Route: route,
      Instructions: instructions,
    };
    onSaveEdit(updatedItem);
    handleUnChecked();
    onClose();
  };
  const handleClose = () => {
    handleUnChecked();
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
            <p>{selectedItemData.Medication}</p>
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
          <button className="btn save" onClick={handleSaveEdit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
