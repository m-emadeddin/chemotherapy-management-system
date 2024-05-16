import { useEffect, useRef, useState } from "react";
import "./style.css";
export default function DeletePopUp({
  onClose,
  onConfirm,
  data,
  deleteIndex,
  id,
}) {
  const [medicationName, setMedicationName] = useState();
  const DeletPopRef = useRef();

  useEffect(() => {
    if (id === "pre-med") {
      setMedicationName(data[deleteIndex].name);
    } else if (id === "chemo") {
      setMedicationName(data[deleteIndex].name);
    }
  }, [deleteIndex, id, data]);

  const closeDeletePopUp = (e) => {
    if (DeletPopRef.current === e.target) {
      onClose();
    }
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="delete-popup-overlay"
      ref={DeletPopRef}
      onClick={closeDeletePopUp}
    >
      <div className="delete-popup-container">
        <img
          src="/images/exclamation.png"
          alt="icon"
          width={124}
          height={124}
        />
        <p className="heading">Are you sure?</p>
        <p className="text">{medicationName} will be removed permanently</p>

        <div className="buttons">
          <button className="btn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn yes" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
