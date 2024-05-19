import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PatientTable from "components/PatientTable";
import PatientInfo from "components/PatientInfo";
import Popup from "components/Popup/Popup";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
import Sidebar from "components/Sidebar/Sidebar";
import { usePatientsInfo } from "contexts/PatientsInfoContext";

export default function Dashboard() {
  const [tab, setTab] = useState("all");
  const { fetchPatientsByType } = usePatientsInfo();

  useEffect(() => {
    console.log(`tab from dashboard: ${tab}`);
  }, [tab]);

  const handleTabChange = (value) => {
    setTab(value);
    console.log(`from dashboard: ${value}`);
  };



  return (
    <>
      <Helmet>
        <title>Oncology MS</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="mx-auto flex w-full max-w-[1321px] flex-col gap-[30px] md:p-5 mt-[100px]">
        <Sidebar onTabChange={handleTabChange} />
        <div className="w-[81%] flex flex-col gap-[30px] self-end">
          <PatientInfo fetchType={tab}/>
        </div>
      </div>
      {tab === "not-found" && (
        <Popup
          message1={`We Truly Apologize.`}
          message2={"This Page is not available yet."}
          onClose={() => setTab("all")}
        />
      )}
    </>
  );
}
