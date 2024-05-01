import Table from "components/Table/Table";
import "./style.css";
import MiniDropMenu from "components/MiniDropMenu/MiniDropMenu";
const premedicationData = {
  "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma": [
    { NumOfCycles: 3, CycleCount: 2 },
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
};
const chemotherapyData = {
  "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma": [
    {
      Medication: "Prednisone",
      Dose: 100,
      Route: "Oral",
      Instructions: "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy.",
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
      Instructions: "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy",
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
};
const cyclesData = {
  "COP - Regimen for Non-Metastatic Non Hodgkin Lymphoma": [
    { NumOfCycles: 3, CycleCount: 2 },
  ],
  "AC - Regimen for Non-Metastatic, Locally-Advanced Breast Cancer. Before or after Taxol":
    [{ NumOfCycles: 8, CycleCount: 5 }],
  "CHOP: Protocol for Non Hodgkin Lymphoma": [
    { NumOfCycles: 2, CycleCount: 3 },
  ],
  "CMF-Breast Cancer Regimen": [{ NumOfCycles: 4, CycleCount: 4 }],
};

const Weeks = ["None", "1", "2", "3", "4", "5", "6"];

const Cycles = [1, 2, 3, 4, 5, 6, 7, 8];

const Days = Array.from({ length: 28 }, (_, index) => index + 1);

const fieldsNum = [1, 2, 3];

const Weeks = [
  "None",
  "1 Weeks",
  "2 Weeks",
  "3 Weeks",
  "4 Weeks",
  "5 Weeks",
  "6 Weeks",
];

const Cycles = [1, 2, 3, 4, 5, 6];

const Days = Array.from({ length: 28 }, (_, index) => index + 1);

export default function RegimenDetails({ selectedOption }) {
  return (
    <div className="regimen-detail">
      <div className="cycles-container">
        <span className="heading">Cycles</span>
        <div className="cyles-rows">
          <form>
            {" "}
            <div className="cycles-row">
              <input type="radio" name="type" value="weeks" />
              <span>Every</span>
              <MiniDropMenu
                title="Weeks"
                options={Weeks}
                defaultValue={cyclesData[selectedOption][0].CycleCount}
              />
              <span>X</span>
              <MiniDropMenu
                title="Cycles"
                options={Cycles.map(String)}
                defaultValue={cyclesData[selectedOption][0].NumOfCycles}
              />
              <span>Cycles</span>
            </div>
            <div className="cycles-row">
              <input type="radio" name="type" value="days" />
              <span style={{ width: "40px" }}>Day</span>
              <MiniDropMenu title="fieldsNum" options={fieldsNum.map(String)} />

              <span>of</span>
              <MiniDropMenu title="Days" options={Days.map(String)} />
              <span>day cycle</span>
              <span>X</span>
              <MiniDropMenu
                title="Cycles"
                options={Cycles.map(String)}
                defaultValue={cyclesData[selectedOption][0].NumOfCycles}
              />
              <span>Cycles</span>
            </div>
          </form>
        </div>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        <div className="pre-mediaction">
          <div className="pre-mediaction-header">
            <p className="table-name">PreMediactions</p>
            <div className="buttons-container">
              <button className="edit btn">Edit</button>
              <button className="del btn">Delete</button>
            </div>
          </div>
          <Table data={premedicationData} selectedOption={selectedOption} />
        </div>
        <div className="chemotherapy">
          <div className="chemotherapy-header">
            <p className="table-name">ChemoTherapy</p>
            <div className="buttons-container">
              <button className="dose btn">Change Dose</button>
              <button className="edit btn">Edit</button>
              <button className="del btn">Delete</button>
            </div>
          </div>
          <Table data={chemotherapyData} selectedOption={selectedOption} />
        </div>
      </div>
      <div className="notes">
        <span className="heading">Physician Notes</span>
        <textarea
          defaultValue="Add your notes here..."
          className="notes-area"
        ></textarea>
        <button className="next">Next</button>
      </div>
    </div>
  );
}
