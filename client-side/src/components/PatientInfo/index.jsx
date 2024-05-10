import React, { useState, useEffect } from "react";
import { Button, Heading, Img, Input, Text } from "components";
import "./patientinfo.css";
import PatientPopup from "../PatientPopUp/index";
import PatientTable from "components/PatientTable";

export default function PatientInfo({ patients }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [InfoPopupOpen, setInfoPopupOpen] = useState(false);
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
    setInfoPopupOpen(true);
  };

  const togglePopup = () => {
    setInfoPopupOpen(!InfoPopupOpen);
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

      <div className="patient-record flex w-full flex-col gap-[5px] items-center">
        <div className="p-[10px] w-[90%] info-tablehead ">
          <div className="w-[85%] flex justify-between">
            <div className="w-[20%]">Patient</div>
            <div className="w-[20%]">ID</div>
            <div className="w-[20%]">Gender</div>
            <div className="w-[20%]">Disease Type</div>
            <div className="w-[20%]">Phone Number</div>
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

      {InfoPopupOpen && (
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

      {filteredPatients.length > 0 && (
        <div className="container-xs mt-[15px] flex justify-center pr-14 md:px-5">
          <div className="flex flex-wrap items-center justify-center">
            <Button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
            >
              <Img
                src="images/img_arrow_left_gray_600.svg"
                alt="arrowleft"
                className=" h-[11px] self-center"
              />
            </Button>
            <Text
              as="p"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-[16px] bg-white-A700 text-center !font-light"
            >
              {currentPage}
            </Text>
            <Text
              as="p"
              className="ml-[5px] h-[20px] !font-light !text-gray-600 items-center justify-center"
            >
              /
            </Text>
            <Text
              as="p"
              className="flex h-[32px] w-[32px] items-center justify-center text-center !font-light"
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
                className="h-[11px] self-center "
              />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}