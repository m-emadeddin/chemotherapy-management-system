import React, { useRef } from "react";
import "./Popup.css";

const Popup = ({ onClose, message }) => {
  const popupRef = useRef();

  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" ref={popupRef} onClick={closePopup}>
      <div className="popup-container">
        <img src="/images/exclamation.png" alt="icon" width={124} height={124} />
        <p className="heading">Warning</p>
        <p className="text">{message}</p>

        <div className="buttons">
          <button className="btn ok" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
