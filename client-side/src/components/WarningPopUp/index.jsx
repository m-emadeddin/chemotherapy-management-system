import { useRef } from "react";
import "./style.css";

const WarningPopUp = ({ onClose, message }) => {
  const DeletPopRef = useRef();

  const closeWarningPopUp = (e) => {
    if (DeletPopRef.current === e.target) {
      onClose();
    }
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div
      className="warning-popup-overlay"
      ref={DeletPopRef}
      onClick={closeWarningPopUp}
    >
      <div className="warning-popup-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/exclamation.png`}
          alt="icon"
          width={124}
          height={124}
        />
        <p className="heading">{message}</p>

        <div className="buttons">
          <button className="btn cancel" onClick={handleClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
export { WarningPopUp };
