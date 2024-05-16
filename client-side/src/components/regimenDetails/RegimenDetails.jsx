import Table from "components/Table/Table";
import "./style.css";
import { useEffect, useState } from "react";
import ResetPopUp from "components/ResetPopup/ResetPopUp";
import { usePlanData } from "contexts/PlanDataContext";
import { usePlanDetails } from "contexts/PlansDetails";
import { useNavigate } from "react-router-dom";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import MiniDropMenu from "components/MiniDropMenu/MiniDropMenu";
import Date from "components/Date/Date";
import toast, { Toaster } from "react-hot-toast";
import { setDate } from "components/Date/Date";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
export default function RegimenDetails() {
  let {
    newRegimenDetails,
    setNewRegimenDetails,
    Start_Date,
    setStartDate,
    dateValue,
  } = useRegimenDetails();

  const { selectedPatientInfo } = useSelectedPatientInfo();
  const Patient_ID = selectedPatientInfo.Patient_ID;

  const { preMedicationsData, chemotherapyData, hasPreMedications } =
    usePlanData();
  const { planName, planCycles, planWeeks, originalCycles, originalWeeks } =
    usePlanDetails();
  const navigate = useNavigate();

  const [defaultValueWeeks, setDefaultValueWeeks] = useState(planWeeks);
  const [defaultValueCycles, setDefaultValueCycles] = useState(planCycles);
  const [notes, setNotes] = useState("");
  const [showResetPopUp, setShowResetPopUp] = useState(false);
  const [initialRegimenDetails, setInitialRegimenDetails] = useState({});
  const [regimenDetails, setRegimenDetails] = useState(initialRegimenDetails);

  const [initialData, setInitialData] = useState({
    preMedicationsData: [],
    chemotherapyData: [],
  });
  const [Data, setData] = useState({
    ...initialData,
  });

  useEffect(() => {
    if (preMedicationsData.length > 0 || chemotherapyData.length > 0) {
      setInitialData({ ...initialData, preMedicationsData, chemotherapyData });
      setData({ preMedicationsData, chemotherapyData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chemotherapyData, preMedicationsData]);

  useEffect(() => {
    if (
      planName &&
      originalWeeks &&
      originalCycles &&
      preMedicationsData &&
      chemotherapyData
    ) {
      const initialDetails = {
        Plan_Name: planName,
        number_of_Weeks: originalWeeks,
        number_of_Cycles: originalCycles,
        PreMedications: preMedicationsData,
        ChemotherapyMedications: chemotherapyData,
        cycle_note: notes,
        Start_Date: null,
      };
      setInitialRegimenDetails(initialDetails);
      setRegimenDetails(initialDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    planName,
    originalWeeks,
    originalCycles,
    preMedicationsData,
    chemotherapyData,
    notes,
  ]);

  useEffect(() => {
    setNotes("");
    setStartDate(null);
    setDate(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planName]);

  useEffect(() => {
    setRegimenDetails({
      ...regimenDetails,
      Plan_Name: planName,
      number_of_Weeks: planWeeks,
      number_of_Cycles: planCycles,
      PreMedications: preMedicationsData,
      ChemotherapyMedications: chemotherapyData,
      cycle_note: notes,
      Start_Date: Start_Date,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planName, planCycles, planWeeks, preMedicationsData, chemotherapyData]);

  useEffect(() => {
    if (newRegimenDetails) {
      setData({
        preMedicationsData: newRegimenDetails.PreMedications,
        chemotherapyData: newRegimenDetails.ChemotherapyMedications,
      });
      setNotes(newRegimenDetails.cycle_note);
      setRegimenDetails(newRegimenDetails);
      setStartDate(Start_Date);
      setDate(dateValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRegimenDetails]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleDelete = (id, index) => {
    let newPreMedication = Data.preMedicationsData;
    let newChemoTherapy = Data.chemotherapyData;

    if (id === "pre-med") {
      newPreMedication = newPreMedication.filter((_, i) => i !== index);
    } else if (id === "chemo") {
      newChemoTherapy = newChemoTherapy.filter((_, i) => i !== index);
    }

    const newData = {
      ...Data,
      preMedicationsData: newPreMedication,
      chemotherapyData: newChemoTherapy,
    };

    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      PreMedications: newPreMedication || [],
      ChemotherapyMedications: newChemoTherapy || [],
    });
  };

  const handleEdit = (id, editIndex, updatedItem) => {
    let newData = { ...Data };

    if (id === "pre-med") {
      newData = {
        ...newData,
        preMedicationsData: newData.preMedicationsData.map((item, index) =>
          index === editIndex ? updatedItem : item
        ),
      };
    }

    if (id === "chemo") {
      newData = {
        ...newData,
        chemotherapyData: newData.chemotherapyData.map((item, index) =>
          index === editIndex ? updatedItem : item
        ),
      };
    }

    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      PreMedications: newData.preMedicationsData || [],
      ChemotherapyMedications: newData.chemotherapyData || [],
    });
  };

  const handleChangeDose = (doseIndex, updatedItem) => {
    let newData = { ...Data };

    newData = {
      ...newData,
      chemotherapyData: newData.chemotherapyData.map((item, index) =>
        index === doseIndex ? updatedItem : item
      ),
    };
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      PreMedications: newData.preMedicationsData || [],
      ChemotherapyMedications: newData.chemotherapyData || [],
    });
  };
  const resetState = () => {
    setData(initialData);
    setRegimenDetails(initialRegimenDetails);
    setNotes("");
    setDefaultValueWeeks(originalWeeks);
    setDefaultValueCycles(originalCycles);
    setStartDate(null);
    setDate(null);
  };

  const handleNext = () => {
    if (Start_Date === null) {
      toast.error("You have to choose date first!");
    } else {
      newRegimenDetails = {
        Plan_Name: planName,
        number_of_Weeks: regimenDetails.number_of_Weeks,
        number_of_Cycles: regimenDetails.number_of_Cycles,
        PreMedications: regimenDetails.PreMedications || [],
        ChemotherapyMedications: regimenDetails?.ChemotherapyMedications?.map(
          (medication) => ({
            ...medication,
            doseReduction:
              medication.doseReduction !== undefined
                ? medication.doseReduction
                : null,
          })
        ),
        cycle_note:
          notes === "Add your notes here..." || notes.trim() === ""
            ? "There isn't any notes"
            : notes,
        Start_Date: Start_Date,
      };
      setNotes(regimenDetails.cycle_note);
      setNewRegimenDetails(newRegimenDetails);
      const newRegimenDetailsWithId = {
        ...newRegimenDetails,
        id: Patient_ID,
      };

      localStorage.setItem(
        `regimen-details-${Patient_ID}`,
        JSON.stringify(newRegimenDetailsWithId)
      );
      navigate("review-order");
    }
  };
  const weeks = Array.from({ length: 30 }, (_, index) => index + 1);
  const cycles = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="regimen-detail">
      <Toaster />
      <div className="cycles-container">
        <span className="heading">Cycles</span>{" "}
        <div className="cycles-row">
          <MiniDropMenu
            title="Cycles"
            options={cycles}
            defaultValueCycles={defaultValueCycles}
            onChange={(defaultValueCycles) =>
              setDefaultValueCycles(defaultValueCycles)
            }
          />
          <span>Over</span>
          <MiniDropMenu
            title="Weeks"
            options={weeks}
            defaultValueWeeks={defaultValueWeeks}
            onChange={(defaultValueWeeks) =>
              setDefaultValueWeeks(defaultValueWeeks)
            }
          />
          <Date />
        </div>
      </div>
      <div className="medications">
        <div className="header">
          <span className="heading" style={{ alignSelf: "center" }}>
            Mediactions
          </span>
          <button
            style={{ marginRight: "15px" }}
            className="reset"
            onClick={() => setShowResetPopUp(true)}
          >
            Reset All
          </button>
        </div>
        {hasPreMedications && (
          <div className="pre-mediaction">
            <div className="pre-mediaction-header">
              <p className="table-name">PreMediactions</p>
            </div>
            <Table
              id="pre-med"
              data={Data.preMedicationsData}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        )}
        <div className="chemotherapy">
          <div className="chemotherapy-header">
            <p className="table-name">ChemoTherapy</p>
          </div>
          <Table
            id="chemo"
            onDelete={handleDelete}
            data={Data.chemotherapyData}
            onEdit={handleEdit}
            onChangeDose={handleChangeDose}
          />
        </div>
      </div>
      <div className="notes">
        <span className="heading">Physician Notes</span>
        <textarea
          value={notes}
          className="notes-area"
          onChange={handleNotesChange}
          placeholder="Add your notes here ..."
        ></textarea>
        <button onClick={handleNext} className="next">
          Next
        </button>
      </div>

      {showResetPopUp && (
        <ResetPopUp
          onClose={() => setShowResetPopUp(false)}
          resetState={resetState}
        />
      )}
    </div>
  );
}
