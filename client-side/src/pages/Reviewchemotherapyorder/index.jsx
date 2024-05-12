import { useNavigate } from "react-router-dom";
import "./style.css";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
export default function Reviewchemotherapyorder() {
  const navigate = useNavigate();
  const { newRegimenDetails: patientOrder } = useRegimenDetails();
  console.log("order", patientOrder);

  function handleBack() {
    navigate("/order");
  }

  function handleSubmit() {
    navigate(-2);
  }

  return (
    <div className="review-container  mx-auto ">
      <div className="heading-contanier">
        <h2>Review</h2>
        <p>{patientOrder.Plan_Name}</p>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        <div className="pre-medication">
          <div className="table-name">PreMediactions</div>
          {patientOrder.PreMedications.map((med, index) => (
            <div key={index} className="table-rows">
              <p className="med-name">{med.name}</p>
              <p className="med-instruction">{med.Instructions}</p>
            </div>
          ))}
        </div>
        <div className="chemo-therapy">
          <div className="table-name">ChemoTherapy</div>
          {patientOrder.ChemotherapyMedications.map((med, index) => (
            <div key={index} className="table-rows">
              <p className="med-name">{med.name}</p>
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
        <p className="notes">{patientOrder.cycle_note}</p>
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
