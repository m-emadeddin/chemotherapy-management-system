import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import "./style.css";

export default function Reviewchemotherapyorder() {
  const location = useLocation();
  const patiantOrder = location.state.newRegimenDetails;

  function handleBack() {
    return;
  }
  function handleSubmit() {
    console.log(patiantOrder);
  }
  return (
    <div className="flex w-full flex-col items-center gap-[15px] bg-gray-100 ">
      {/* header section */}
      <Header className="flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs" />

      {/* main content */}
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
    </div>
  );
}
