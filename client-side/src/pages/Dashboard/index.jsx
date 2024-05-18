import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PatientTable from "components/PatientTable";
import PatientInfo from "components/PatientInfo";

import {
  Text,
  Button,
  Heading,
  CycleDetails,
  CycleDocument,
  DocumentChemotherapyCycle,
  WarningPopUp,
  Img,
} from "../../components";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
import Sidebar from "components/Sidebar/Sidebar";
import { usePatientsInfo } from "contexts/PatientsInfoContext";

export default function Dashboard() {
  const { fetchPatientsInfo } = usePatientsInfo();
  useEffect(() => {
    async function refreshPatients() {
      await fetchPatientsInfo();
    }
    setTimeout(() => {
      refreshPatients();
    }, 10000);
  }, [fetchPatientsInfo]);


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
      
        <Sidebar/>
        <div className="w-[81%] flex flex-col gap-[30px] self-end">
          <PatientInfo/>
        </div>
      </div>
    </>
  );
}
