import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
import { useAuth } from "contexts/AuthContext";
export default function Reviewchemotherapyorder() {
  const navigate = useNavigate();
  const { selectedPatientInfo } = useSelectedPatientInfo();
  const id = selectedPatientInfo.Patient_ID;
  let { newRegimenDetails: patientOrder } = useRegimenDetails();

  if (!patientOrder) {
    const storedRegimenDetails =
      localStorage.getItem("regimen-details") ||
      localStorage.getItem("regimen-details-api");
    if (storedRegimenDetails) {
      patientOrder = JSON.parse(storedRegimenDetails);
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTreatmentPlan, setHasTreatmentPlan] = useState(false);
  const originalDate = patientOrder?.Start_Date;
  const dateParts = originalDate?.split("-");
  const reversedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const auth = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/has-treatmentplan/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        });
        const { exists } = await response.json();
        setHasTreatmentPlan(exists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  function handleBack() {
    if (hasTreatmentPlan) {
      navigate(`/patient/${id}`);
    } else {
      navigate(`/patient/${id}/order`);
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true);

    const apiUrl = `/review-chemotherapy/add-review/${id}`;
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
      physician_note: patientOrder.physician_note,
      Start_Date: patientOrder.Start_Date,
    };

    axios
      .post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${auth.userToken}`,
        },
      })
      .then((response) => {
        if (response.data.message === "Data inserted successfully") {
          toast.success("Data inserted successfully");

          navigate(`/patient/${id}`);
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

  return hasTreatmentPlan ? (
    <div className="review-container mx-auto">
      <div className="heading-contanier">
        <h2>Review</h2>
        <Toaster />
        <p>{patientOrder.Plan_Name}</p>
        <span className="cycles">
          {patientOrder.number_of_Cycles} Cycles over{" "}
          {patientOrder.number_of_Weeks} Weeks
        </span>
        <span>Started from:{reversedDate}</span>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        {patientOrder.PreMedications.length !== 0 && (
          <div className="pre-medication">
            <div className="table-name">PreMediactions</div>
            {patientOrder.PreMedications.map((med, index) => (
              <div key={index} className="table-rows">
                <p className="med-name">{med.Medication_Name}</p>
                <p className="med-instruction">{med.Instructions}</p>
              </div>
            ))}
          </div>
        )}
        <div className="chemo-therapy">
          <div className="table-name">ChemoTherapy</div>
          {patientOrder.ChemotherapyMedications.map((med, index) => (
            <div key={index} className="table-rows">
              <p className="med-name">{med.Medication_Name}</p>
              <div className="instructions">
                <p className="med-instruction">{med.Instructions}</p>
                <p className={med.Dosage_Reduction === null ? "" : "dose"}>
                  {med.Dosage_Reduction === null
                    ? ""
                    : `${med.Dosage_Reduction}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-container">
        <span className="heading">Physician Notes</span>
        <p className="notes">{patientOrder.physician_note}</p>
      </div>

      <div className="buttons">
        <button className="btn back" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  ) : (
    <div className="review-container mx-auto">
      <div className="heading-contanier">
        <h2>Review</h2>
        <Toaster />
        <p>{patientOrder.Plan_Name}</p>
        <span className="cycles">
          {patientOrder.number_of_Cycles} Cycles over{" "}
          {patientOrder.number_of_Weeks} Weeks
        </span>
        <span>Started from: {reversedDate}</span>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        {patientOrder.PreMedications.length !== 0 && (
          <div className="pre-medication">
            <div className="table-name">PreMediactions</div>
            {patientOrder.PreMedications.map((med, index) => (
              <div key={index} className="table-rows">
                <p className="med-name">{med.name}</p>
                <p className="med-instruction">{med.Instructions}</p>
              </div>
            ))}
          </div>
        )}
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
        <p className="notes">{patientOrder.physician_note}</p>
      </div>

      <div className="buttons">
        <button className="btn back" onClick={handleBack}>
          Back
        </button>
        {!hasTreatmentPlan ? (
          <button
            className="btn submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
