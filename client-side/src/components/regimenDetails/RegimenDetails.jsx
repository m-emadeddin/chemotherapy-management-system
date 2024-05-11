import Table from "components/Table/Table";
import "./style.css";
import { useEffect, useState } from "react";
import ResetPopUp from "components/ResetPopup/ResetPopUp";
import { usePlanData } from "contexts/PlanDataContext";

export default function RegimenDetails({ selectedOption }) {
  const { preMedicationsData, chemotherapyData } = usePlanData();
  const [notes, setNotes] = useState("Add your notes here...");
  const [showResetPopUp, setShowResetPopUp] = useState(false);
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

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleDelete = (id, index) => {
    const newPreMedication =
      id === "pre-med"
        ? Data.preMedicationsData.filter((_, i) => i !== index)
        : Data.preMedicationsData;

    const newChemoTherapy =
      id === "chemo"
        ? Data.chemotherapyData.filter((_, i) => i !== index)
        : Data.chemotherapyData;

    const newData = {
      ...Data,
      preMedicationsData: newPreMedication,
      chemotherapyData: newChemoTherapy,
    };

    setData(newData);
  };

  const resetState = () => {
    setData(initialData);
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
            data={Data.preMedicationsData}
            onDelete={handleDelete}
            // onEdit={handleEdit}
            // onChangeDose={handleChangeDose}
          />
        </div>
        <div className="chemotherapy">
          <div className="chemotherapy-header">
            <p className="table-name">ChemoTherapy</p>
          </div>
          <Table
            id="chemo"
            onDelete={handleDelete}
            data={Data.chemotherapyData}
            // onEdit={handleEdit}
            // onChangeDose={handleChangeDose}
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
        {/* <button onClick={handleNext} className="next">
          Next
        </button> */}
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
