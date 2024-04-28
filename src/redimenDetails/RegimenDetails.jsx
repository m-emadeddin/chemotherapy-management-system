import Table from "components/Table/Table";
import "./style.css";
import { useEffect, useRef, useState } from "react";
// const premedicationData = [
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
//   {
//     Medication: "SODIUM CHLORIDE",
//     Dose: 1000,
//     Route: "Intravenous",
//     Instructions: "Once 60 minutes prior to chemotherapy",
//   },
// ];
const premedicationData = {
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

export default function RegimenDetails({ selectedOption }) {
  const [premedicationheight, setPremedicationHeight] = useState(0);
  const premediactionRef = useRef(null);
  const [chemotherapyheight, setChemotherapyHeight] = useState(0);

  const chemotherapyRef = useRef(null);

  useEffect(() => {
    if (premediactionRef.current) {
      setPremedicationHeight(premediactionRef.current.clientHeight);
    }
    if (chemotherapyRef.current) {
      setChemotherapyHeight(chemotherapyRef.current.clientHeight);
    }
  }, [selectedOption]);

  return (
    <>
      <div className="cycles">
        <span className="heading">Cycles</span>
        <div className="row">
          <input type="radio" />
          <span>Every</span>
        </div>
        <div className="row">
          <input type="radio" />
          <span>Day</span>
        </div>
        <button>Check</button>
      </div>
      <div className="medications">
        <span className="heading">Mediactions</span>
        <div className="premediaction" ref={premediactionRef}>
          <div className="premediactionHeader">
            <p>PreMediactions</p>
            <div className="prebuttons">
              <button className="edit">Edit</button>
              <button className="del">Delete</button>
            </div>
          </div>
          <Table data={premedicationData} selectedOption={selectedOption} />
        </div>
        <div
          ref={chemotherapyRef}
          className="chemotherapy"
          style={{ top: premedicationheight + 120 }}
        >
          <div className="chemotherapyHeader">
            <p>ChemoTherapy</p>
            <div className="chemobuttons">
              <button className="dose">Change Dose</button>
              <button className="edit">Edit</button>
              <button className="del">Delete</button>
            </div>
          </div>
          <Table data={chemotherapyData} selectedOption={selectedOption} />
        </div>
      </div>
      <div className="notes" style={{ top: chemotherapyheight + 800 }}>
        <span className="heading">Physician Notes</span>
        <textarea defaultValue="Add your notes here..."></textarea>
        <button className="next">Next</button>
      </div>
    </>
  );
}
