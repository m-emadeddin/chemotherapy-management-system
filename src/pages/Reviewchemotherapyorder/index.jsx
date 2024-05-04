import { useLocation } from "react-router-dom";
import "./style.css";

export default function Reviewchemotherapyorder() {
  const location = useLocation();
  const patiantOrder = location.state.newRegimenDetails;
  console.log(patiantOrder);

  function handleBack() {
    return;
  }
  function handleSubmit() {
    console.log(patiantOrder);
  }
  return (
    <div className="review-container  mx-auto ">
      <div className="heading-contanier">
        <h2>Review</h2>
        <p>{patiantOrder.regimenName}</p>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        <div className="pre-medication">
          <div className="table-name">PreMediactions</div>
          {patiantOrder.preMedication.map((med, index) => (
            <div key={index} className="table-rows">
              <p className="med-name">{med.Medication}</p>
              <p className="med-instruction">{med.Instructions}</p>
            </div>
          ))}
        </div>
        <div className="chemo-therapy">
          <div className="table-name">ChemoTherapy</div>
          {patiantOrder.chemoTherapy.map((med, index) => (
            <div key={index} className="table-rows">
              <p className="med-name">{med.Medication}</p>
              <div className="instructions">
                <p className="med-instruction">{med.Instructions}</p>
                <p className={med.doseReduction === null ? "" : "dose"}>
                  {med.doseReduction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-container">
        <span className="heading">Physician Notes</span>
        <p className="notes">{patiantOrder.physicianNotes}</p>
      </div>
      <div className="buttons ">
        <button className="btn back" onClick={handleBack}>
          Back
        </button>
        <button className="btn submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
