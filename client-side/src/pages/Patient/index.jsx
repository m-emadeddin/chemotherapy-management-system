import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import PatientPopup from "../../components/PatientPopUp";
import { useNavigate } from "react-router-dom";
import PathologyPopup from "../../components/PathologyPopup";
import AllPathologyPopup from "../../components/AllPathology";
import MedicalAnalysisComponent from "../../components/Medical";
import CancerComponent from "../../components/CancerOverview";
import { WarningPopUp } from "../../components";
import RadiologyComponent from "components/Radiology";
import VitalSignComponent from "components/VitalSign";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";

const path = process.env.PUBLIC_URL;
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

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

export default function PatientPage() {
  const { selectedPatientInfo } = useSelectedPatientInfo();

  const [orderBtnHovered, SetOrderBtnHovered] = useState(false);
  const [docBtnHovered, setDocBtnHovered] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showPathologyPopup, setShowPathologyPopup] = useState(false);
  const [showAllPathologyPopup, setShowAllPathologyPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [medicalData, setMedicalData] = useState(null);
  const [radioData, setRadioData] = useState(null);
  const [vitalData, setVitalData] = useState(null);
  const [cancerData, setCancerData] = useState(null);
  const navigate = useNavigate();
  const [medicalIsPresent, setmedicalIsPresent] = useState(false);
  const [radioIsPresent, setradioIsPresent] = useState(false);
  const [vitalIsPresent, setvitalIsPresent] = useState(false);
  const [cancerIsPresent, setcancerIsPresent] = useState(false);
console.log(radioData)
  const id = selectedPatientInfo.Patient_ID;
  const age = calculateAge(selectedPatientInfo.date_of_birth);
  const date = formatDate(selectedPatientInfo.date_of_birth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/medical/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setMedicalData(data);
          setmedicalIsPresent(true);
        } else if (response.status === 404) {
          setmedicalIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/cancer-overview/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setCancerData(data);
          setcancerIsPresent(true);
        } else if (response.status === 404) {
          setcancerIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/radiography/${id}`);
        const data = await response.json();
        if (response.status === 200) {
          const lastItem = data["radiography"].slice(-1)[0]; // Get the last item
          if (lastItem) {
            setRadioData(lastItem);
            setradioIsPresent(true);
          } else {
            setradioIsPresent(false);
          }
        } else {
          setradioIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching radiography data:", error);
        setradioIsPresent(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/vital-sign/${id}`);
        if (response.status === 200) {
          const data = await response.json();
          setVitalData(data);
          setvitalIsPresent(true);
        } else if (response.status === 404) {
          setvitalIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  function orderChemo() {
    navigate("/order");
  }

  function docChemo() {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/has-treatmentplan/${id}`);
        const { exists } = await response.json();
        if (exists) {
          navigate("/document");
        } else {
          setShowWarningPopup(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }

  const togglePatientPopup = () => {
    setShowPatientPopup(!showPatientPopup);
  };

  const togglePathologyPopup = () => {
    setShowPathologyPopup(!showPathologyPopup);
  };

  const toggleAllPathologyPopup = () => {
    setShowAllPathologyPopup(!showAllPathologyPopup);
  };

  const toggleWarningPopup = () => {
    setShowWarningPopup(!showWarningPopup);
  };

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
        {/* navigation section */}
        <div className="flex items-start justify-between gap-5 md:flex-col">
          <div className="mt-[18px] flex items-center gap-[15px]">
            <Heading as="h1">Patient List</Heading>
            <div className="flex items-center">
              <Img
                src={`${process.env.PUBLIC_URL}/images/img_arrow_right_blue_gray_300_02.svg`}
                alt="arrowright"
                className="h-[10px] mr-[10px]"
              />
              <Text size="xs" as="p" className="!text-blue_gray-300_02">
                {selectedPatientInfo.Name}
              </Text>
            </div>
          </div>

          <div className="flex gap-[22px]">
            <Button
              size="xl"
              onMouseEnter={() => SetOrderBtnHovered(true)}
              onMouseLeave={() => SetOrderBtnHovered(false)}
              className="min-w-[213px] gap-2.5 rounded-[20px] font-lama bg-blue-500 text-white custom-button"
              onClick={orderChemo}
            >
              <Img
                src={
                  orderBtnHovered
                    ? `${process.env.PUBLIC_URL}/images/img_tube.svg`
                    : `${path}/images/img_thumbsup_white_a700.svg`
                }
                alt="thumbs_up"
                className="h-[14px] w-[14px]"
              />
              Order Chemotherapy
            </Button>
            <Button
              size="xl"
              onMouseEnter={() => setDocBtnHovered(true)}
              onMouseLeave={() => setDocBtnHovered(false)}
              className="min-w-[213px] gap-2.5 rounded-[20px] font-lama sans bg-blue-500 text-white custom-button"
              onClick={docChemo}
            >
              <Img
                src={
                  docBtnHovered
                    ? `${process.env.PUBLIC_URL}/images/img_megaphone.svg`
                    : `${process.env.PUBLIC_URL}/images/img_megaphone_white_a700.svg`
                }
                alt="megaphone"
                className="h-[14px] w-[14px]"
              />
              Document Chemotherapy
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-6 md:flex-col">
          {/* patient info section */}
          <div className="flex flex-1 flex-col gap-[30px] md:self-stretch">
            <div className="flex flex-1 items-start gap-6 md:flex-col">
              <div className="flex w-full flex-col items-center gap-5 rounded-[40px] bg-white-A700 p-[15px]">
                <div className="flex w-[100%] flex-col gap-4 rounded-[40px] bg-white-A700  pl-[5px] md:w-full px-4">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex w-[77%] items-center gap-[20px]">
                      <Img
                        src={`${path}/images/img_patient_in_a_circle.png`}
                        alt="hazemabdulnassr"
                        className="h-[74px] w-[73px] object-cover"
                      />
                      <Heading
                        size="md"
                        as="h2"
                        className="w-[74%] leading-[25px]"
                      >
                        <>{selectedPatientInfo.Name}</>
                      </Heading>
                    </div>
                    <Button
                      size="lg"
                      shape="circle"
                      className="w-[48px] !rounded-[24px] action-button"
                      onClick={togglePatientPopup}
                    >
                      <Img src={`${path}/images/img_map.svg`} />
                    </Button>
                  </div>

                  <Heading size="s" as="h3">
                    General info
                  </Heading>

                  <div className="flex flex-col items-center gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
                      {selectedPatientInfo ? (
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap w-full">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Patient ID
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {selectedPatientInfo.Patient_ID}
                            </Text>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap w-full">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Gender
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {selectedPatientInfo.Gender}
                            </Text>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap w-full">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Date Of Birth
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {date} ({age}) y.o
                            </Text>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap w-full">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Blood Type
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {selectedPatientInfo.blood_type}
                            </Text>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Disease Type
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {selectedPatientInfo.disease_type}
                            </Text>
                          </div>

                          <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                            <Text
                              size="xs"
                              as="p"
                              className="h-[15px] w-[15px] !text-blue_gray-300"
                            >
                              Phone Number
                            </Text>
                            <Text as="p" className="mb-[5px] px-2">
                              {selectedPatientInfo.mobile}
                            </Text>
                          </div>
                        </div>
                      ) : (
                        console.log("Error")
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="min-w-[218px] rounded-[15px] sm:px-5 custom-button"
                  variant="fill"
                  color="blue_500"
                  onClick={togglePatientPopup}
                >
                  View all
                </Button>
              </div>

              <div className="flex w-full flex-col items-start gap-[25px] rounded-[40px] bg-white-A700 p-[15px]">
                <div className="flex items-center justify-between gap-5 self-stretch sm:flex-col">
                  <div className="flex w-[77%] items-center justify-center gap-[15px] pr-1.5 sm:w-full">
                    <Img
                      src={`${path}/images/img_patient_in_a_circle_74x73.png`}
                      alt="cancer_overview"
                      className="h-[74px] w-[73px] object-cover"
                    />
                    <Heading size="md" as="h4">
                      Cancer Overview
                    </Heading>
                  </div>
                </div>
                <Heading size="s">General info</Heading>

                {cancerIsPresent ? (
                  <CancerComponent cancerData={cancerData}></CancerComponent>
                ) : (
                  <p className="mb-5 px-3">No Cancer Data</p>
                )}
              </div>
            </div>

            {/* vital signs section */}
            <div className="flex w-[49%] flex-col gap-4 rounded-[40px] bg-white-A700 py-[15px] pl-[15px] md:w-full px-4">
              <div className="flex items-center justify-between gap-5">
                <div className="flex w-[77%] items-center gap-[15px]">
                  <Img
                    src={`${path}/images/img_patient_in_a_circle_1.png`}
                    alt="patientina"
                    className="h-[74px] w-[73px] object-cover"
                  />
                  <Heading size="md" as="h6" className="mb-[21px] self-end">
                    Vital Signs
                  </Heading>
                </div>
              </div>
              {vitalIsPresent ? (
                <VitalSignComponent vitalData={vitalData}></VitalSignComponent>
              ) : (
                <p className="mb-5 px-3">No Vital Data</p>
              )}
            </div>
          </div>

          {/* pathology section */}
          <div className="flex w-[33%] flex-col gap-4 rounded-[40px] bg-white-A700 py-[15px] pl-[15px] md:w-full px-4">
            <div className="flex items-center justify-between gap-5">
              <div className="flex w-[77%] items-center gap-[15px]">
                <Img
                  src={`${path}/images/img_patient_in_a_circle_2.png`}
                  alt="patientina"
                  className="h-[74px] w-[73px] object-cover"
                />
                <Heading size="md" as="h3" className="mb-5 self-end">
                  Pathology
                </Heading>
              </div>
              <Button
                size="lg"
                shape="circle"
                className="w-[48px] !rounded-[24px] action-button"
                onClick={togglePathologyPopup}
              >
                <Img src={`${path}/images/img_edit.svg`} />
              </Button>
            </div>

            <Heading size="s" as="h3">
              Medical Analysis
            </Heading>
            {medicalIsPresent ? (
              <MedicalAnalysisComponent
                medicalData={medicalData}
              ></MedicalAnalysisComponent>
            ) : (
              <p className="px-3">No Medical Data</p>
            )}

            <Heading size="s" as="h3">
              Radiography
            </Heading>

            {radioIsPresent ? (
              <RadiologyComponent
                radioData={radioData}
                togglePathologyPopup={toggleAllPathologyPopup}
              ></RadiologyComponent>
            ) : (
              <p className="mb-5 px-3">No Radio Data</p>
            )}

            {showPatientPopup && (
              <PatientPopup
                name={selectedPatientInfo.Name}
                age={age}
                onClose={togglePatientPopup}
                ID={selectedPatientInfo.Patient_ID}
                Gender={selectedPatientInfo.Gender}
                DateOFBirth={date}
                bloodType={selectedPatientInfo.blood_type}
                DiseaseType={selectedPatientInfo.disease_type}
                Street={selectedPatientInfo.street}
                City={selectedPatientInfo.city}
                Government={selectedPatientInfo.governorate}
                Nationality={selectedPatientInfo.nationality}
                PhoneNumber={selectedPatientInfo.mobile}
                path={path}
              />
            )}

            {showPathologyPopup && (
              <PathologyPopup
                onClose={togglePathologyPopup}
                path={path}
                radioData={radioIsPresent ? radioData["radiography"][0] : " "}
                medicalData={
                  medicalIsPresent ? medicalData["MedicalAnalysis"][0] : " "
                }
                patientID={selectedPatientInfo.Patient_ID}
                medicalIsPresent={medicalIsPresent}
                radioIsPresent={radioIsPresent}
              />
            )}
            {showAllPathologyPopup && (
              <AllPathologyPopup
                onClose={toggleAllPathologyPopup}
                path={path}
                radioData={radioIsPresent ? radioData["radiography"][0] : " "}
                medicalData={
                  medicalIsPresent ? medicalData["MedicalAnalysis"][0] : " "
                }
                patientID={selectedPatientInfo.Patient_ID}
                medicalIsPresent={medicalIsPresent}
                radioIsPresent={radioIsPresent}
              />
            )}
            {showWarningPopup && (
              <WarningPopUp
                onClose={toggleWarningPopup}
                message={"This patient doesn't have active chemotherapy plan"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
