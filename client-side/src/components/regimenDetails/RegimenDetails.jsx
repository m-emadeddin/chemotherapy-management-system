import Table from "components/Table/Table";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import ResetPopUp from "components/ResetPopup/ResetPopUp";

const apiData = {
  preMedication: {
    "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma": [
      {
        Medication: "SODIUM CHLORIDE",
        Dose: 1000,
        Route: "Intravenous",
        Instructions: "Once prior to chemotherapy",
      },
      {
        Medication: "Ondansetron",
        Dose: 8,
        Route: "Oral",
        Instructions: "Once 60 minutes prior to chemotherapy",
      },
    ],
    "AC - Regimen for Non-Metastatic, Locally-Advanced Breast Cancer. Before or after Taxol":
      [
        {
          Medication: "SODIUM CHLORIDE",
          Dose: 100,
          Route: "Intravenous",
          Instructions: "Once prior to chemotherapy",
        },
        {
          Medication: "Dexamethasone",
          Dose: 16,
          Route: "Oral",
          Instructions: "Once 60 minutes prior to chemotherapy",
        },
        {
          Medication: "Ondansetron",
          Dose: 8,
          Route: "Intravenous",
          Instructions: "Once 60 minutes prior to chemotherapy",
        },
      ],
    "CHOP: Protocol for Non Hodgkin Lymphoma": [
      {
        Medication: "SODIUM CHLORIDE",
        Dose: 100,
        Route: "Oral",
        Instructions: "Once prior to chemotherapy",
      },
      {
        Medication: "Ondansetron",
        Dose: 8,
        Route: "Oral",
        Instructions: "Once 60 minutes prior to chemotherapy",
      },
    ],
    "CMF-Breast Cancer Regimen": [
      {
        Medication: "SODIUM CHLORIDE",
        Dose: 1000,
        Route: "Intravenous",
        Instructions: "Once  minutes prior to chemotherapy",
      },
      {
        Medication: "Dexamethasone",
        Dose: 16,
        Route: "Oral",
        Instructions: "Once 60 minutes prior to chemotherapy",
      },
      {
        Medication: "Ondansetron",
        Dose: 8,
        Route: "Oral",
        Instructions: "Once 60 minutes prior to chemotherapy",
      },
    ],
  },
  chemoTherapy: {
    "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma": [
      {
        Medication: "Prednisone",
        Dose: 100,
        Route: "Oral",
        Instructions:
          "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy.",
      },
      {
        Medication: "Vincristine",
        Dose: 1.4,
        Route: "Intravenous",
        Instructions: "IV Push over 1-2 minutes",
      },
      {
        Medication: "Cyclophosphamide",
        Dose: 750,
        Route: "Intravenous",
        Instructions: "IV Push over 1-2 hours",
      },
    ],
    "AC - Regimen for Non-Metastatic, Locally-Advanced Breast Cancer. Before or after Taxol":
      [
        {
          Medication: "Doxorubici",
          Dose: 60,
          Route: "Intravenous",
          Instructions: "IV Push over 15 minutes",
        },
        {
          Medication: "Cyclophosphamide",
          Dose: 600,
          Route: "Intravenous",
          Instructions: "Infuse over 1-2 hours",
        },
      ],
    "CHOP: Protocol for Non Hodgkin Lymphoma": [
      {
        Medication: "Prednisone",
        Dose: 100,
        Route: "Oral",
        Instructions:
          "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy",
      },
      {
        Medication: "Doxorubicin",
        Dose: 50,
        Route: "Oral",
        Instructions: "IV Push over 15 minutes",
      },
      {
        Medication: "Vincristine",
        Dose: 1.4,
        Route: "Intravenous",
        Instructions: "IV Push over 1-2 minutes",
      },
      {
        Medication: "Cyclophosphamide",
        Dose: 750,
        Route: "Oral",
        Instructions: "IV Push over 1-2 hours",
      },
    ],
    "CMF-Breast Cancer Regimen": [
      {
        Medication: "Fluorouracil",
        Dose: 600,
        Route: "Intravenous",
        Instructions: "IV push over 10 minutes",
      },
      {
        Medication: "Methotrexate",
        Dose: 40,
        Route: "Oral",
        Instructions: "IV push over 10 mg/min",
      },
      {
        Medication: "Cyclophosphamide",
        Dose: 600,
        Route: "Oral",
        Instructions: "Infuse over 1-2 hours",
      },
    ],
  },
};
export default function RegimenDetails({ selectedOption }) {
  let { newRegimenDetails, setNewRegimenDetails } = useRegimenDetails();

  const navigate = useNavigate();
  const initialData = { ...apiData };
  const [Data, setData] = useState(initialData);
  const [initialRegimenDetails] = useState({
    regimenName: selectedOption,
    preMedication: initialData.preMedication[selectedOption] || [],
    chemoTherapy: initialData.chemoTherapy[selectedOption] || [],
    physicianNotes: "Add your notes here...",
  });
  const [regimenDetails, setRegimenDetails] = useState(initialRegimenDetails);
  const [notes, setNotes] = useState("Add your notes here...");
  const [showResetPopUp, setShowResetPopUp] = useState(false);
  useEffect(() => {
    setNotes("Add your notes here...");
    setData(initialData);
    setRegimenDetails(initialRegimenDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  useEffect(() => {
    setRegimenDetails({
      ...regimenDetails,
      preMedication: Data.preMedication[selectedOption],
      chemoTherapy: Data.chemoTherapy[selectedOption],
      regimenName: selectedOption,
      physicianNotes: notes,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, notes]);

  useEffect(() => {
    if (newRegimenDetails && newRegimenDetails.regimenName) {
      const { regimenName, preMedication, chemoTherapy, physicianNotes } =
        newRegimenDetails;
      setData((prevData) => ({
        ...prevData,
        preMedication: {
          ...prevData.preMedication,
          [regimenName]: preMedication || [],
        },
        chemoTherapy: {
          ...prevData.chemoTherapy,
          [regimenName]: chemoTherapy || [],
        },
      }));
      setNotes(physicianNotes);
      setRegimenDetails(newRegimenDetails);
    }
  }, [newRegimenDetails]);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const handleDelete = (id, selectedOption, index) => {
    const preMedication = Data.preMedication[selectedOption];
    const chemoTherapy = Data.chemoTherapy[selectedOption];

    const newPreMedication =
      id === "pre-med"
        ? preMedication.filter((_, i) => i !== index)
        : preMedication;
    const newChemoTherapy =
      id === "chemo"
        ? chemoTherapy.filter((_, i) => i !== index)
        : chemoTherapy;

    const newData = {
      ...Data,
      preMedication: {
        ...Data.preMedication,
        [selectedOption]: newPreMedication,
      },
      chemoTherapy: {
        ...Data.chemoTherapy,
        [selectedOption]: newChemoTherapy,
      },
    };

    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      preMedication: newPreMedication || [],
      chemoTherapy: newChemoTherapy || [],
    });
  };

  const handleEdit = (id, selectedOption, editIndex, updatedItem) => {
    let newData = { ...Data };

    if (id === "pre-med") {
      newData = {
        ...newData,
        preMedication: {
          ...newData.preMedication,
          [selectedOption]: newData.preMedication[selectedOption].map(
            (item, index) => (index === editIndex ? updatedItem : item)
          ),
        },
      };
    }
    if (id === "chemo") {
      newData = {
        ...newData,
        chemoTherapy: {
          ...newData.chemoTherapy,
          [selectedOption]: newData.chemoTherapy[selectedOption].map(
            (item, index) => (index === editIndex ? updatedItem : item)
          ),
        },
      };
    }
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      preMedication: newData.preMedication[selectedOption] || [],
      chemoTherapy: newData.chemoTherapy[selectedOption] || [],
    });
  };
  const handleChangeDose = (selectedOption, doseIndex, updatedItem) => {
    let newData = { ...Data };

    newData = {
      ...newData,
      chemoTherapy: {
        ...newData.chemoTherapy,
        [selectedOption]: newData.chemoTherapy[selectedOption].map(
          (item, index) => (index === doseIndex ? updatedItem : item)
        ),
      },
    };
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      chemoTherapy: newData.chemoTherapy[selectedOption] || [],
    });
  };

  const handleNext = () => {
    newRegimenDetails = {
      regimenName: selectedOption,
      preMedication: regimenDetails.preMedication || [],
      chemoTherapy: regimenDetails.chemoTherapy.map((medication) => ({
        ...medication,
        doseReduction:
          medication.doseReduction !== undefined
            ? medication.doseReduction
            : null,
      })),
      physicianNotes: regimenDetails.physicianNotes,
    };
    setNotes(regimenDetails.physicianNotes);
    setNewRegimenDetails(newRegimenDetails);
    navigate("review-order");
  };

  const resetState = () => {
    setData(initialData);
    setRegimenDetails(initialRegimenDetails);
    setNotes("Add your notes here...");
  };

  return (
    <div className="regimen-detail">
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

        <div className="pre-mediaction">
          <div className="pre-mediaction-header">
            <p className="table-name">PreMediactions</p>
          </div>
          <Table
            id="pre-med"
            data={Data.preMedication}
            selectedOption={selectedOption}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onChangeDose={handleChangeDose}
          />
        </div>
        <div className="chemotherapy">
          <div className="chemotherapy-header">
            <p className="table-name">ChemoTherapy</p>
          </div>
          <Table
            id="chemo"
            data={Data.chemoTherapy}
            selectedOption={selectedOption}
            onDelete={handleDelete}
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
