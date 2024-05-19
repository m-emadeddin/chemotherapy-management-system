import React, { useRef } from "react";
import "./Popup.css";

const Popup = ({ onClose, message1, message2 }) => {
  const popupRef = useRef();

  const closePopup = (e) => {
    if (popupRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div className="edit-popup-overlay" ref={popupRef} onClick={closePopup}>
      <div className="popup-container">
        <img src="/images/exclamation.png" alt="icon" width={124} height={124} />
        <p className="heading">Warning</p>
        <p className="text inter">{message1}</p>
        <p className="text inter message">{message2}</p>

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
