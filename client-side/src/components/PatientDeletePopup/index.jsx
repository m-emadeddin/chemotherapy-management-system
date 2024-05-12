import { useRef } from "react";
import "./patientdeletepopup.css";
export default function PatientDeletePopUp({ onClose, onConfirm }) {
  const PatientDeletPopRef = useRef();

  const closeDeletePopUp = (e) => {
    if (PatientDeletPopRef.current === e.target) {
      onClose();
    }
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="delete-popup-overlay"
      ref={PatientDeletPopRef}
      onClick={closeDeletePopUp}
    >
      <div className="delete-popup-container">
        <img src="images/exclamation.png" alt="icon" width={124} height={124} />
        <p className="heading">Are you sure?</p>
        <p className="text">Patient will be removed permanently</p>

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
