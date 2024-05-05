import { useRef } from "react";
import "./style.css";
export default function ResetPopUp({ onClose, resetState }) {
  const ResetPopRef = useRef();

  const closeDeletePopUp = (e) => {
    if (ResetPopRef.current === e.target) {
      onClose();
    }
  };
  const handleReset = () => {
    resetState();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="reset-popup-overlay"
      ref={ResetPopRef}
      onClick={closeDeletePopUp}
    >
      <div className="reset-popup-container">
        <img src="images/exclamation.png" alt="icon" width={124} height={124} />
        <p className="heading">Are you sure?</p>
        <p className="text">
          All modifications from pre-medication & chemotherapy tables will be
          reset to its original state!
        </p>

        <div className="buttons">
          <button className="btn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn yes" onClick={handleReset}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
