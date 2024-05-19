import React from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../../components";
import PatientInfo from "components/PatientInfo";


export default function SelectPatientPage() {

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
