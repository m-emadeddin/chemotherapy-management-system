import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import { useSelectedPatient } from "contexts/SelectedPatientProvider";

export default function Reviewchemotherapyorder() {
  const { selectedPatientId } = useSelectedPatient();
  const { newRegimenDetails: patientOrder } = useRegimenDetails();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  console.log(patientOrder);
  function handleBack() {
    navigate("/order");
  }

  const handleSubmit = () => {
    setIsSubmitting(true);

    const apiUrl = `/review-chemotherapy/${selectedPatientId}`;
    const Chemotherapy = patientOrder.ChemotherapyMedications.map(
      (medication) => {
        return {
          Medication_Name: medication.name,
          Dose: medication.dose,
          Route: medication.route,
          Instructions: medication.Instructions,
          Dosage_Reduction:
            medication.doseReduction !== undefined
              ? medication.doseReduction
              : null,
        };
      }
    );
    const PreMedications = patientOrder.PreMedications.map((medication) => {
      return {
        Medication_Name: medication.name,
        Dose: medication.dose,
        Route: medication.route,
        Instructions: medication.Instructions,
      };
    });
    const requestBody = {
      Plan_Name: patientOrder.Plan_Name,
      number_of_Weeks: patientOrder.number_of_Weeks,
      number_of_Cycles: patientOrder.number_of_Cycles,
      PreMedications: PreMedications,
      ChemotherapyMedications: Chemotherapy,
      cycle_note: patientOrder.cycle_note,
      Start_Date: patientOrder.Start_Date,
    };

    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.message === "Data inserted successfully") {
          toast.success("Data inserted successfully");
          setTimeout(() => {
            // navigate(`/patient/${selectedPatientId}`);
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("There's an error while inserting treatment plan.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="review-container mx-auto">
      <div className="heading-contanier">
        <h2>Review</h2>
        <Toaster />
        <p>{patientOrder.Plan_Name}</p>
        <span className="cycles">
          {patientOrder.number_of_Cycles} Cycles over{" "}
          {patientOrder.number_of_Weeks} Weeks
        </span>
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
      <div className="buttons">
        <button className="btn back" onClick={handleBack}>
          Back
        </button>
        <button
          className="btn submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
