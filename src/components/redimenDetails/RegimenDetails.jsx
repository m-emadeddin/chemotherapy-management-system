import Table from "components/Table/Table";
import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPopUp from "components/EditPopUp/EditPopUp";
import DeletePopUp from "components/DeletePopUp/DeletePopUp";
import DosePopUp from "components/DosePopUp/DosePopUp";

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
        Route: "Oral",
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
  const [Data, setData] = useState(apiData);
  const navigate = useNavigate();
  const [notes, setNotes] = useState("Add your notes here...");
  const [regimenDetails, setRegimenDetails] = useState({
    regimenName: selectedOption,
    preMedication: Data.preMedication[selectedOption],
    chemoTherapy: Data.preMedication[selectedOption],
    physicianNotes: notes,
  });
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [showDosePopUp, setShowDosePopUp] = useState(false);
  const [selectedItemChemo, setSelectedItemChemo] = useState(null);
  const [selectedItemPreMed, setSelectedItemPreMed] = useState(null);
  const [checkedItemsPreMed, setCheckedItemsPreMed] = useState({});
  const [checkedItemsChemo, setCheckedItemsChemo] = useState({});
  useEffect(() => {
    setNotes("Add your notes here...");
    setCheckedItemsPreMed({});
    setCheckedItemsChemo({});
  }, [selectedOption]);

  useEffect(() => {
    setNotes("Add your notes here...");
    setRegimenDetails({
      ...regimenDetails,
      preMedication: Data.preMedication[selectedOption],
      chemoTherapy: Data.chemoTherapy[selectedOption],
      regimenName: selectedOption,
    });
    setData(apiData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleCheckboxChangePreMed = (index, item) => {
    setCheckedItemsPreMed((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      updatedCheckedItems[index] = !prevCheckedItems[index];

      if (!updatedCheckedItems[index]) {
        setSelectedItemPreMed(null);
      } else {
        setSelectedItemPreMed(item);
      }

      return updatedCheckedItems;
    });
  };

  const handleCheckboxChangeChemo = (index, item) => {
    setCheckedItemsChemo((prevCheckedItems) => {
      const updatedCheckedItems = { ...prevCheckedItems };
      updatedCheckedItems[index] = !prevCheckedItems[index];

      if (!updatedCheckedItems[index]) {
        setSelectedItemChemo(null); // Remove item if unchecked
      } else {
        setSelectedItemChemo(item);
      }

      return updatedCheckedItems;
    });
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };
  const updateRegimenData = (updatedItem) => {
    const newData = {
      ...Data,
      preMedication: {
        ...Data.preMedication,
        [selectedOption]: Data.preMedication[selectedOption].map((item) =>
          item.Medication === updatedItem.Medication ? updatedItem : item
        ),
      },
      chemoTherapy: {
        ...Data.chemoTherapy,
        [selectedOption]: Data.chemoTherapy[selectedOption].map((item) =>
          item.Medication === updatedItem.Medication ? updatedItem : item
        ),
      },
    };
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      preMedication: newData.preMedication[selectedOption] || [],
      chemoTherapy: newData.chemoTherapy[selectedOption] || [],
    });
  };

  const updateRegimenDoseReduction = (updatedItem) => {
    const newData = {
      ...Data,
      chemoTherapy: {
        ...Data.chemoTherapy,
        [selectedOption]: Data.chemoTherapy[selectedOption].map((item) =>
          item.Medication === updatedItem.Medication ? updatedItem : item
        ),
      },
    };
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      preMedication: newData.preMedication[selectedOption] || [],
      chemoTherapy: newData.chemoTherapy[selectedOption] || [],
    });
  };

  const deleteRegimenItem = (deletedItem) => {
    const newData = {
      ...Data,
      preMedication: {
        ...Data.preMedication,
        [selectedOption]: Data.preMedication[selectedOption].filter(
          (item) => item.Medication !== deletedItem.Medication
        ),
      },
      chemoTherapy: {
        ...Data.chemoTherapy,
        [selectedOption]: Data.chemoTherapy[selectedOption].filter(
          (item) => item.Medication !== deletedItem.Medication
        ),
      },
    };
    setData(newData);
    setRegimenDetails({
      ...regimenDetails,
      preMedication: newData.preMedication[selectedOption] || [],
      chemoTherapy: newData.chemoTherapy[selectedOption] || [],
    });
  };

  const handleSaveEdit = (updatedItem) => {
    updateRegimenData(updatedItem);
    setShowEditPopUp(false);
  };
  const handleSaveDose = (updatedItem) => {
    updateRegimenDoseReduction(updatedItem);
    setShowDosePopUp(false);
  };
  const handleUnChecked = () => {
    setSelectedItemPreMed(null);
    setSelectedItemChemo(null);
    setCheckedItemsChemo({});
    setCheckedItemsPreMed({});
  };

  const handleNextClick = () => {
    const newRegimenDetails = {
      regimenName: selectedOption,
      preMedication: regimenDetails.preMedication || [],
      chemoTherapy: regimenDetails.chemoTherapy.map((medication) => ({
        ...medication,
        doseReduction:
          medication.doseReduction !== undefined
            ? medication.doseReduction
            : null,
      })),
      physicianNotes: notes,
    };

    navigate("reviewchemotherapyorder", { state: { newRegimenDetails } });

    console.log(newRegimenDetails);
  };
  return (
    <div className="regimen-detail">
      <div className="medications">
        <span className="heading">Mediactions</span>
        <div className="pre-mediaction">
          <div className="pre-mediaction-header">
            <p className="table-name">PreMediactions</p>
            <div className="buttons-container">
              <button
                className="edit btn"
                onClick={() => setShowEditPopUp(true)}
              >
                Edit
              </button>
              <button
                className="del btn"
                onClick={() => setShowDeletePopUp(true)}
              >
                Delete
              </button>
            </div>
          </div>
          <Table
            data={Data.preMedication}
            selectedOption={selectedOption}
            checkedItems={checkedItemsPreMed}
            onCheckboxChange={handleCheckboxChangePreMed}
          />
        </div>
        <div className="chemotherapy">
          <div className="chemotherapy-header">
            <p className="table-name">ChemoTherapy</p>
            <div className="buttons-container">
              <button
                className="dose btn"
                onClick={() => setShowDosePopUp(true)}
              >
                Change Dose
              </button>
              <button
                className="edit btn"
                onClick={() => setShowEditPopUp(true)}
              >
                Edit
              </button>
              <button
                className="del btn"
                onClick={() => setShowDeletePopUp(true)}
              >
                Delete
              </button>
            </div>
          </div>
          <Table
            data={Data.chemoTherapy}
            selectedOption={selectedOption}
            checkedItems={checkedItemsChemo}
            onCheckboxChange={handleCheckboxChangeChemo}
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
        <button onClick={handleNextClick} className="next">
          Next
        </button>
      </div>

      {showEditPopUp && selectedItemPreMed && (
        <EditPopUp
          onClose={() => setShowEditPopUp(false)}
          selectedItemData={selectedItemPreMed}
          onSaveEdit={handleSaveEdit}
          handleUnChecked={handleUnChecked}
        />
      )}
      {showEditPopUp && selectedItemChemo && (
        <EditPopUp
          onClose={() => setShowEditPopUp(false)}
          selectedItemData={selectedItemChemo}
          onSaveEdit={handleSaveEdit}
          handleUnChecked={handleUnChecked}
        />
      )}

      {showDeletePopUp && selectedItemPreMed && (
        <DeletePopUp
          selectedItemData={selectedItemPreMed}
          deleteRegimenItem={deleteRegimenItem}
          onClose={() => setShowDeletePopUp(false)}
          handleUnChecked={handleUnChecked}
        />
      )}
      {showDeletePopUp && selectedItemChemo && (
        <DeletePopUp
          selectedItemData={selectedItemChemo}
          deleteRegimenItem={deleteRegimenItem}
          onClose={() => setShowDeletePopUp(false)}
          handleUnChecked={handleUnChecked}
        />
      )}
      {showDosePopUp && selectedItemChemo && (
        <DosePopUp
          selectedItemData={selectedItemChemo}
          onClose={() => setShowDosePopUp(false)}
          handleUnChecked={handleUnChecked}
          onSaveDose={handleSaveDose}
        />
      )}
    </div>
  );
}
