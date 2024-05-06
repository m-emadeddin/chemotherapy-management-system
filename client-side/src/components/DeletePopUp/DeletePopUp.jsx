import { useRef } from "react";
import "./style.css";
export default function DeletePopUp({
  onClose,
  deleteRegimenItem,
  selectedItemData,
  handleUnChecked,
}) {
  const DeletPopRef = useRef();

  const closeDeletePopUp = (e) => {
    if (DeletPopRef.current === e.target) {
      onClose();
      handleUnChecked();
    }
  };
  const handleDelete = () => {
    deleteRegimenItem(selectedItemData);
    onClose();
    handleUnChecked();
  };
  const handleClose = () => {
    handleUnChecked();
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
        <p className="text">Medication will be removed permanently</p>

        <div className="buttons">
          <button className="btn cancel" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn yes" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
