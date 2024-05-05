import React, { useState, useEffect } from "react";
import { Button, Heading, Img, Input, Text } from "components";
import "./patientinfo.css";
import PatientPopup from "../PatientPopUp/index";
import PatientTable from "components/PatientTable";

export default function PatientInfo({ patients }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const patientsPerPage = 10;

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchBarValue.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchBarValue, patients]);

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
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  return (
    <>
      <div className="container-xs mt-9 flex flex-col items-start px-[51px] md:px-5">
        <div className="flex w-[85%] flex-col items-start gap-5 md:w-full">
          <Heading size="s" as="h2">
            Select Patient
          </Heading>
          <Input
            size="xs"
            shape="round"
            name="search"
            placeholder={`Enter Patient Name`}
            value={searchBarValue}
            onChange={(e) => setSearchBarValue(e)}
            className="text-black-900 sm:pr-5"
          />
        </div>
      </div>

      <div className="patient-record flex w-full flex-col gap-[5px]">
        <div className="p-[10px] w-full info-tablehead ">
          <div className="w-[85%]  flex gap-2.5 justify-between">
            <div className="w-[15%]">Patient</div>
            <div className="w-[10%]">ID</div>
            <div className="w-[15%]">Gender</div>
            <div className="w-[19%]">Disease Type</div>
            <div className="w-[18%]">Phone Number</div>
          </div>
        </div>
        {currentPatients.map((patient) => (
          <PatientTable
            patient={patient}
            key={patient.id}
            selected
            onClickMap={() => handleMapClick(patient)}
          />
        ))}
      </div>

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

      {filteredPatients.length > 0 && ( // Conditionally render pagination if there are filtered patients
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
      )}
    </>
  );
}
