import React, { useState } from "react";
import { Button, Img, Text } from "components";
import "./patientinfo.css";

export default function PatientInfo({ patients }) {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Calculate index range for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  return (
    <>
      <table className="patient-record">
        <thead>
          <tr className="info-tablehead">
            <th>Patient</th>
            <th>ID</th>
            <th>Gender</th>
            <th>Disease Type</th>
            <th>Phone Number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <>
              <tr key={patient.id} className="info-data-container">
                <td>
                  {patient.patient.name}
                  <br />
                  <span className="age">{patient.patient.age} years old</span>
                </td>
                <td>{patient.id}</td>
                <td>{patient.gender}</td>
                <td>{patient.diseaseType}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  <Button size="md" shape="circle" className="action-button">
                    <Img src="images/img_thumbs_up.svg" />
                  </Button>
                  <Button size="md" shape="circle" className="action-button">
                    <Img src="images/img_map.svg" />
                  </Button>
                </td>
              </tr>
              <tr className="separator" />
            </>
          ))}
        </tbody>
      </table>

      <div className="container-xs mt-[15px] flex flex-col items-start pl-[435px] pr-14 md:px-5">
        <div className="flex flex-wrap items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            <Img
              src="images/img_arrow_left_gray_600.svg"
              alt="arrowleft"
              className="mt-2.5 h-[11px] self-start"
            />
          </Button>
          <Text
            as="p"
            className="ml-2.5 flex h-[32px] w-[32px] items-center justify-center rounded-[16px] bg-white-A700 text-center !font-light"
          >
            {currentPage}
          </Text>
          <Text as="p" className="ml-[5px] !font-light !text-gray-600">
            /
          </Text>
          <Text
            as="p"
            className="ml-[5px] h-[17px] w-[16px] !font-light !text-gray-600"
          >
            {totalPages}
          </Text>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            <Img
              src="images/img_arrow_right.svg"
              alt="arrowright"
              className="ml-2.5 mt-2.5 h-[11px] self-start"
            />
          </Button>
        </div>
      </div>
    </>
  );
}
