import React, { useState } from "react";
import { Button, Img, Text } from "components";
import "./patientinfo.css";
import { Link } from "react-router-dom";
import PatientPopup from "../PatientPopUp/index";

export default function PatientInfo({ patients }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patientsPerPage = 10;

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleMapClick = (patient) => {
    setSelectedPatient(patient);
    setPopupOpen(true);
  };

  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

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
            <React.Fragment key={patient.id}>
              <tr className="info-data-container">
                <td>
                  <Link to="/patient">
                    {patient.name}
                    <br />
                    <span className="age">{patient.age} years old</span>
                  </Link>
                </td>
                <td>
                  <Link to="/patient">{patient.id}</Link>
                </td>
                <td>
                  <Link to="/patient">{patient.gender}</Link>
                </td>
                <td>
                  <Link to="/patient">{patient.diseaseType}</Link>
                </td>
                <td>
                  <Link to="/patient">{patient.phoneNumber}</Link>
                </td>
                <td>
                  <Button size="md" shape="circle" className="action-button">
                    <Img src="images/img_thumbs_up.svg" />
                  </Button>
                  <Button
                    size="md"
                    shape="circle"
                    className="action-button"
                    onClick={() => handleMapClick(patient)}
                  >
                    <Img src="images/img_map.svg" />
                  </Button>
                </td>
              </tr>
              <tr className="separator" />
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Render the PatientPopUp component if popupOpen is true */}
      {popupOpen && (
        <PatientPopup
          name={selectedPatient.name}
          age={selectedPatient.age}
          onClose={togglePopup}
          ID={selectedPatient.id}
          Gender={selectedPatient.gender}
          DateOFBirth={selectedPatient.DateofBirth}
          bloodType={selectedPatient.bloodType}
          DiseaseType={selectedPatient.diseaseType}
          Street={selectedPatient.street}
          City={selectedPatient.city}
          Government={selectedPatient.government}
          Nationality={selectedPatient.nationality}
          PhoneNumber={selectedPatient.phoneNumber}
        />
      )}

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
