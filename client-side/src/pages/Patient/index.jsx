import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import PatientPopup from "../../components/PatientPopUp";
import { useNavigate, Link } from "react-router-dom";
import PathologyPopup from "../../components/PathologyPopup";
import AllPathologyPopup from "../../components/AllPathology";
import MedicalAnalysisComponent from "../../components/Medical";
import CancerComponent from "../../components/CancerOverview";
import { WarningPopUp } from "../../components";
import RadiologyComponent from "components/Radiology";
import VitalSignComponent from "components/VitalSign";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";
import AllVital from "components/AllVital";

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
  const [showAllVitalPopup, setShowAllVitalPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [medicalData, setMedicalData] = useState(null);
  const [AllmedicalData, setAllMedicalData] = useState(null);
  const [radioData, setRadioData] = useState(null);
  const [AllradioData, setAllRadioData] = useState(null);
  const [vitalData, setVitalData] = useState(null);
  const [AllvitalData, setAllVitalData] = useState(null);
  const [cancerData, setCancerData] = useState(null);
  const navigate = useNavigate();
  const [medicalIsPresent, setmedicalIsPresent] = useState(false);
  const [radioIsPresent, setradioIsPresent] = useState(false);
  const [vitalIsPresent, setvitalIsPresent] = useState(false);
  const [cancerIsPresent, setcancerIsPresent] = useState(false);
  const [hasTreatmentPlan, setHasTreatmentPlan] = useState(false);
  const [treatmentPlanActive, setTreatmentPlanAcive] = useState(false);
  const id = selectedPatientInfo.Patient_ID;
  const age = calculateAge(selectedPatientInfo.date_of_birth);
  const date = formatDate(selectedPatientInfo.date_of_birth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/medical/${id}`);
        const data = await response.json();
        if (response.status === 200) {
          setAllMedicalData(data);
          const lastItem = data["MedicalAnalysis"].slice(-1)[0]; // Get the last item
          if (lastItem) {
            setMedicalData(lastItem);
            setmedicalIsPresent(true);
          } else {
            setmedicalIsPresent(false);
          }
        } else {
          setmedicalIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching Medical data:", error);
        setmedicalIsPresent(false);
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
          setAllRadioData(data);
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
        const data = await response.json();

        if (response.status === 200) {
          setAllVitalData(data);
          const lastItem = data["VitalSigns"].slice(-1)[0]; // Get the last item
          if (lastItem) {
            setVitalData(lastItem);
            setvitalIsPresent(true);
          } else {
            setvitalIsPresent(false);
          }
        } else if (response.status === 404) {
          setvitalIsPresent(false);
        }
      } catch (error) {
        console.error("Error fetching Vital Signs:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/has-treatmentplan/${id}`);
        const { exists } = await response.json();
        setHasTreatmentPlan(exists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/document-chemotherapy/active-cycle/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setTreatmentPlanAcive(data.exists);
          console.log("Active Cycle Fetched Successfully");
        })
        .catch((error) => {
          console.error("Error fetching Active Cycle:", error);
        });
    };
    const timeoutId = setTimeout(() => {
      if (hasTreatmentPlan) fetchData();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [id, hasTreatmentPlan]);

  function orderChemo() {
    if (hasTreatmentPlan && treatmentPlanActive) {
      navigate("review-order");
    } else {
      navigate("order");
    }
  }
  function docChemo() {
    if (hasTreatmentPlan) {
      navigate("document");
    } else {
      setShowWarningPopup(true);
    }
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
  const toggleAllVitalPopup = () => {
    setShowAllVitalPopup(!showAllVitalPopup);
  };
  const toggleWarningPopup = () => {
    setShowWarningPopup(!showWarningPopup);
  };

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
        {/* navigation section */}
        <div className="flex items-start justify-between gap-5 md:flex-col">
          <div className="flex items-center gap-[15px]">
            <Heading as="h1">
              <Link to="/dashboard">Patient List</Link>
            </Heading>
            <div className="flex items-center">
              <Img
                src={`/images/img_arrow_right_blue_gray_300_02.svg`}
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
                    ? `/images/img_tube.svg`
                    : `/images/img_thumbsup_white_a700.svg`
                }
                alt="thumbs_up"
                className="h-[14px] w-[14px]"
              />
              {hasTreatmentPlan && treatmentPlanActive
                ? "Review Chemotherapy"
                : "Order Chemotherapy"}
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
                    ? `/images/img_megaphone.svg`
                    : `/images/img_megaphone_white_a700.svg`
                }
                alt="megaphone"
                className="h-[14px] w-[14px]"
              />
              Document Chemotherapy
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 md:flex-col">
          {/* patient info section */}
          <div className="flex flex-1 w-full items-stretch gap-6">
            <div className="flex w-[33%] flex-col items-center justify-between gap-5 rounded-[40px] bg-white-A700 p-[15px]">
              <div className="flex w-[100%] flex-col gap-4 rounded-[40px] bg-white-A700 p-[5px] md:w-full">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex w-[77%] items-center gap-[20px]">
                    <Img
                      src={`/images/img_patient_in_a_circle.png`}
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
                    <Img src={`/images/img_map.svg`} />
                  </Button>
                </div>

                <Heading size="s" as="h3">
                  General info
                </Heading>

                <div className="flex flex-col items-center gap-5">
                  <div className="grid grid-cols-1 gap-5 self-stretch">
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
            <div className="flex w-[33%] flex-col items-start gap-[25px] rounded-[40px] bg-white-A700 p-[15px]">
              <div className="flex items-center justify-between gap-5 self-stretch sm:flex-col">
                <div className="flex w-[77%] items-center gap-[20px]">
                  <Img
                    src="/images/img_patient_in_a_circle_74x73.png"
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
            <div className="flex w-[33%] items-center flex-col gap-4 rounded-[40px] bg-white-A700 p-[15px] md:w-full">
              <div className="flex items-start w-full justify-between gap-5">
                <div className="flex w-[77%] items-center gap-[15px]">
                  <Img
                    src={`/images/img_patient_in_a_circle_1.png`}
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
              <Button
                size="sm"
                className="min-w-[218px] rounded-[15px] sm:px-5 custom-button"
                variant="fill"
                color="blue_500"
                onClick={toggleAllVitalPopup}
              >
                View vital history
              </Button>
            </div>
          </div>

          {/* pathology section */}
          <div className="flex w-[100%] items-center flex-col gap-4 rounded-[40px] bg-white-A700 p-[15px] md:w-full mb-10">
            <div className="flex items-center justify-between gap-6 w-full">
              <div className="flex w-[77%] items-center gap-[15px]">
                <Img
                  src={`/images/img_patient_in_a_circle_2.png`}
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
                <Img src={`/images/img_edit.svg`} />
              </Button>
            </div>
            <div className="flex w-full gap-5">
              <div className="flex-col w-[50%]">
                <Heading size="s" as="h3" className="w-full">
                  Medical Analysis
                </Heading>
                {medicalIsPresent ? (
                  <MedicalAnalysisComponent
                    medicalData={medicalData}
                  ></MedicalAnalysisComponent>
                ) : (
                  <p className="px-3">No Medical Data</p>
                )}
              </div>
              <div className="flex-col w-[50%]">
                <Heading size="s" as="h3" className="text-start w-full">
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
              </div>
            </div>

            <Button
              size="sm"
              className="min-w-[218px] rounded-[15px] sm:px-5 custom-button"
              variant="fill"
              color="blue_500"
              onClick={toggleAllPathologyPopup}
            >
              View pathology history
            </Button>

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
                radioData={radioIsPresent ? radioData : " "}
                medicalData={medicalIsPresent ? medicalData : " "}
                patientID={selectedPatientInfo.Patient_ID}
                medicalIsPresent={medicalIsPresent}
                radioIsPresent={radioIsPresent}
              />
            )}
            {showAllPathologyPopup && (
              <AllPathologyPopup
                onClose={toggleAllPathologyPopup}
                path={path}
                radioData={AllradioData}
                medicalData={AllmedicalData}
                patientID={selectedPatientInfo.Patient_ID}
                medicalIsPresent={medicalIsPresent}
                radioIsPresent={radioIsPresent}
              />
            )}
            {showAllVitalPopup && (
              <AllVital
                onClose={toggleAllVitalPopup}
                path={path}
                patientID={selectedPatientInfo.patientID}
                vitalIsPresent={vitalIsPresent}
                vitalData={AllvitalData}
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
