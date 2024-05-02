import React from "react";
import { Button, Img, Text } from "components";
import "./patientinfo.css";

const initialTableData = [
  {
    patient: {
      name: "Ahmed Atef",
      age: 23,
    },
    id: "GB3C5F",
    gender: "Male",
    diseaseType: "Bowel cancer",
    phoneNumber: "01218484148",
  },
];

export default function PatientInfo() {
  return (
    <div>
      <div className="info-container container-xs mt-9 px-[51px] md:px-5">
        <div className="flex items-start">
          <Text className="label label-margin">Patient</Text>
          <Text className="label label-margin">ID</Text>
          <Text className="label label-margin">Gender</Text>
          <Text className="label label-margin">Disease type</Text>
          <Text className="label">Phone number</Text>
        </div>
      </div>
      <div className="patient-details-container container-xs mt-4 px-[19px] md:px-5">
        {initialTableData.map((patient, index) => (
          <div key={index} className="patient-details items-start">
            <div className="detail-column">
              <Text className="detail">{patient.patient.name}</Text>
              <Text className="detail-age">
                {patient.patient.age} years old
              </Text>
            </div>
            <div className="detail-column">
              <Text className="detail">{patient.id}</Text>
            </div>
            <div className="detail-column">
              <Text className="detail">{patient.gender}</Text>
            </div>
            <div className="detail-column">
              <Text className="detail">{patient.diseaseType}</Text>
            </div>
            <div className="detail-column">
              <Text className="detail">{patient.phoneNumber}</Text>
            </div>
            <div className="flex items-start">
              <Button
                size="md"
                shape="circle"
                className="mb-[614px] ml-[34px] mt-[10px] w-[40px] !rounded-[20px]"
              >
                <Img src="images/img_thumbs_up.svg" />
              </Button>
              <Button
                size="md"
                shape="circle"
                className="ml-[5px] mt-[10px] w-[40px] !rounded-[20px]"
              >
                <Img src="images/img_map.svg" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
