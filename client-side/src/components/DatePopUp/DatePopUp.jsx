import { useRef } from "react";
import "./style.css";

export default function DatePopUp({
  onClose,
  onConfirm,
  clearDate,
  patientsNumber,
}) {
  const DatePopRef = useRef();

  const closeDatePopUp = (e) => {
    if (DatePopRef.current === e.target) {
      clearDate();
      onClose();
    }
  };

  const handleClose = () => {
    clearDate();
    onClose();
  };

  return (
    <div
      className="date-popup-overlay"
      ref={DatePopRef}
      onClick={closeDatePopUp}
    >
      <div className="date-popup-container">
        <img
          src="/images/exclamation.png"
          alt="icon"
          width={124}
          height={124}
        />
        <p className="heading">Are you sure?</p>
        <p className="text">
          <span>{patientsNumber}</span> Patients ordered a chemotherapy at this
          day.
        </p>

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
