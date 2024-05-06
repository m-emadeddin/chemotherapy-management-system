import React from "react";
import { Helmet } from "react-helmet";
import { Heading } from "../../components";
import PatientInfo from "components/PatientInfo";

const patients = Array.from({ length: 100 }, (_, index) => ({
  name: `Patient ${index + 1}`,
  age: Math.floor(Math.random() * 80) + 1, // Random age between 1 and 80
  id: `YG5${index + 1}F`,
  gender: index % 2 === 0 ? "Male" : "Female", // Alternating genders for demonstration
  diseaseType: "Sample Disease",
  phoneNumber: "0123456789",
  bloodType: "A+",
  DateofBirth: "12.Mar.2001",
  street: "45 Mahmoud Al Nahal st.",
  city: "Zagazig",
  government: "Ash Sharqiah",
  nationality: "Egyptian",
}));

export default function SelectPatientPage() {
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      <div className="ml-[60px] flex w-[87%] flex-col items-end md:ml-0 md:w-full md:p-5 mt-[100px]">
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
