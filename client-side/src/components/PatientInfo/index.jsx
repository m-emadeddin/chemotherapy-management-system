import React, { useState, useEffect } from "react";
import { Button, Heading, Img, Input, Text } from "components";
import "./patientinfo.css";
import PatientPopup from "../PatientPopUp/index";
import PatientTable from "components/PatientTable";
import PatientDeletePopUp from "components/PatientDeletePopup";
import { usePatientsInfo } from "contexts/PatientsInfoContext";

export default function PatientInfo({ fetchType }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [InfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const patientsInfo = usePatientsInfo();

  const patientDetails = patientsInfo.patientsInfo;
  const patients = patientDetails.patients;
  const patientsPerPage = 10;

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  useEffect(() => {
    if (patients !== undefined) {
      const filtered = patients.filter((patient) =>
        patient.Name.toLowerCase().includes(searchBarValue.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchBarValue, patients]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleMapClick = (patient) => {
    setSelectedPatient(patient);
    setInfoPopupOpen(true);
  };

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setDeletePopupOpen(true);
  };

  const togglePopup = () => {
    setInfoPopupOpen(!InfoPopupOpen);
  };

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen);
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const deletePatientOnConfirm = async () => {
    if (selectedPatient) {
      try {
        await patientsInfo.deletePatient(selectedPatient.Patient_ID);
        setDeletePopupOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          {filteredPatients.length > 0 ? (
            <div className="w-[85%] flex justify-between">
              <div className="w-[20%]">Patient</div>
              <div className="w-[20%]">ID</div>
              <div className="w-[20%]">Gender</div>
              <div className="w-[20%]">Disease Type</div>
              <div className="w-[20%]">Phone Number</div>
            </div>
          ) : (
            <div className="w-full text-center py-5">
              <p>No patients found with this name</p>
            </div>
          )}
        </div>
        {currentPatients.map((patient) => (
          <PatientTable
            patient={patient}
            key={patient.Patient_ID}
            selected
            onClickMap={() => handleMapClick(patient)}
            onDeleteClick={() => handleDeleteClick(patient)}
          />
        ))}
      </div>

      {InfoPopupOpen && (
        <PatientPopup
          name={selectedPatient.Name}
          age={calculateAge(selectedPatient.date_of_birth)}
          onClose={togglePopup}
          ID={selectedPatient.Patient_ID}
          Gender={selectedPatient.Gender}
          DateOFBirth={calculateAge(formatDate(selectedPatient.date_of_birth))}
          bloodType={selectedPatient.blood_type}
          DiseaseType={selectedPatient.disease_type}
          Street={selectedPatient.street}
          City={selectedPatient.city}
          Government={selectedPatient.governorate}
          Nationality={selectedPatient.nationality}
          PhoneNumber={selectedPatient.mobile}
        />
      )}

      {deletePopupOpen && (
        <PatientDeletePopUp
          onClose={toggleDeletePopup}
          onConfirm={deletePatientOnConfirm}
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
