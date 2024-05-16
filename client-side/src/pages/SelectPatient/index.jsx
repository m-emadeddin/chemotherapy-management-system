import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../../components";
import PatientInfo from "components/PatientInfo";
import { usePatientsInfo } from "contexts/PatientsInfoContext";

export default function SelectPatientPage() {
  const { fetchPatientsInfo } = usePatientsInfo();
  useEffect(() => {
    async function refreshPatients() {
      await fetchPatientsInfo();
    }
    setTimeout(() => {
      refreshPatients();
    }, 2000);
  }, [fetchPatientsInfo]);
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      <div className="mx-auto flex w-full max-w-[1321px] flex-col gap-[30px] md:p-5 mt-[100px]">
        <Heading as="h1" className="self-start">
          Patient List
        </Heading>

        <div className="w-full justify-start px-[51px]">
          <PatientInfo />
        </div>
      </div>
    </>
  );
}
