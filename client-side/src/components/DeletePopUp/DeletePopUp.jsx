import { useRef } from "react";
import "./style.css";
export default function DeletePopUp({
  onClose,
  onConfirm,
  selectedOption,
  data,
  deleteIndex,
}) {
  const medication = data[selectedOption][deleteIndex].Medication;
  const DeletPopRef = useRef();
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
        <img src="images/exclamation.png" alt="icon" width={124} height={124} />
        <p className="heading">Are you sure?</p>
        <p className="text">{medication} will be removed permanently</p>

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
