import { useRef, useState } from "react";
import "./style.css";

export default function DosePopUp({
  onClose,
  onConfirm,
  data,
  doseIndex,
  onChangeDose,
}) {
  const DosePopUpRef = useRef();
  const values = ["0%", "-10%", "-20%", "-30%", "-40%", "-50%"];
  const initialDoseReduction = data[doseIndex].doseReduction;
  const initialIndex = values.indexOf(initialDoseReduction);
  const [value, setValue] = useState(initialIndex !== -1 ? initialIndex : 0);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  const calculatePosition = (value) => {
    const index = parseInt(value);
    const percent = (index / (values.length - 1)) * 98.5;
    return {
      left: `calc(${percent}% )`,
      zIndex: index === 0 ? -1 : 1,
    };
  };
  const closeDosePopUp = (e) => {
    if (DosePopUpRef.current === e.target) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    let doseReduction = null;
    if (value !== 0) {
      doseReduction = `-${value * 10}%`;
    }
    const updatedItem = {
      ...data[doseIndex],
      doseReduction: doseReduction,
    };
    onConfirm(updatedItem);
    onChangeDose(doseIndex, updatedItem);
    onClose();
  };

  return (
    <div
      className="dose-popup-overlay"
      ref={DosePopUpRef}
      onClick={closeDosePopUp}
    >
      <div className="dose-popup-container">
        <div className="popup-heading">
          <div className="text">
            <img src="images/pop-icon.png" alt="icon" width={74} height={74} />
            <p>Change Dosage</p>
          </div>
          <div className="x-icon" onClick={handleClose}>
            <img src="images/x.svg" alt="x-icon" />
          </div>
        </div>
        <div className="dose-data">
          <div className="data">
            <p>{data[doseIndex].name}</p>
            <span>{data[doseIndex].Instructions}</span>
          </div>
          <span>{value === 0 ? "No reduction" : `- ${value * 10}%`}</span>
        </div>
        <div className="dose-values">
          <img src="images/reduceicon.svg" alt="icon" width={14} height={14} />
          <p>Reduce the dosage by</p>
        </div>
        <div className="range-container">
          <input
            type="range"
            min="0"
            max="5"
            value={value}
            onChange={handleChange}
            step="1"
            className="dose-range"
          />
          {values.map((val, index) => (
            <div key={index}>
              <span
                className="circle"
                style={{ ...calculatePosition(index) }}
              />
              <span
                className="text"
                style={{
                  left: `calc(${(index / (values.length - 1)) * 98.5}% )`,
                }}
              >
                {val}
              </span>
            </div>
          ))}
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
