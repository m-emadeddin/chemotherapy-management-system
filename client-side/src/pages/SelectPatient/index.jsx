import React from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../../components";
import PatientInfo from "components/PatientInfo";
import { usePatientsInfo } from "contexts/PatientsInfoContext";

export default function SelectPatientPage() {
  const patientsInfo = usePatientsInfo();
  const patients = patientsInfo.patients;
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      <div className="flex w-[87%] flex-col items-end md:ml-0 md:w-full md:p-5 mt-[100px]">
        <Heading as="h1" className="self-start">
          Patient List
        </Heading>

        <div className="w-full justify-start px-[51px]">
          <PatientInfo patients={patients} />
        </div>
      </div>
    </>
  );
}
