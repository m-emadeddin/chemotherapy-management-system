import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import PatientPopup from "../../components/PatientPopUp";
import WarningPopUp from "../../components/WarningPopUp";
import { useNavigate } from "react-router-dom";
import PathologyPopup from "../../components/PathologyPopup";
import { useRegimenDetails } from "../../contexts/RegimenDetailsContext ";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
};

const GeneralInfoData = [
  { id: "ID", y2Dc5F: "Y2DC5F" },
  { id: "Gender", y2Dc5F: "Male" },
  { id: "Date of birth", y2Dc5F: "12.Mar.2001 (23 y.o)" },
  { id: "Blood type", y2Dc5F: "A+" },
  { id: "Disease type", y2Dc5F: "Lung Cancer" },
  { id: "Phone number", y2Dc5F: "01095368957" },
];

export default function PatientPage() {
  const [orderHovered, setOrderHovered] = useState(false);
  const [documentHovered, setDocumentHovered] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showPathologyPopup, setShowPathologyPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [medicalData, setMedicalData] = useState(null);
  const [radioData, setRadioData] = useState(null);
  const [vitalData, setVitalData] = useState(null);
  const { newRegimenDetails: patientOrder } = useRegimenDetails();
  const navigate = useNavigate();
  const id = 1;
  console.log(patientOrder);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`patient/medical/${id}`);
        const data = await response.json();
        setMedicalData(data);
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`patient/radiography/${id}`);
        const data = await response.json();
        setRadioData(data);
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`patient/vital-sign/${id}`);
        const data = await response.json();
        setVitalData(data);
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  function orderChemo() {
    navigate("/order");

    // console.log(vitalData["response"]["BMI"]);
  }

  function docChemo() {
    if (patientOrder) {
      navigate("/document");
    } else {
      setShowWarningPopup(true);
    }
  }

  const [patientData] = useState({
    name: "Hazem Abdulnasser",
    age: "23",
    ID: "Y2DC5F",
    bloodType: "A+",
    DateofBirth: "12.Mar.2001",
    diseaseType: "Lung Cancer",
    street: "45 Mahmoud Al Nahal st.",
    city: "Zagazig",
    government: "Ash Sharqiah",
    nationality: "Egyptian",
    phonenumber: "01095368957",
    gender: "Male",
  });

  const togglePatientPopup = () => {
    setShowPatientPopup(!showPatientPopup);
  };
  const togglePathologyPopup = () => {
    setShowPathologyPopup(!showPathologyPopup);
  };
  const toggleWarningPopUp = () => {
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
            <Heading as="h1" className="cursor-pointer">
              Patient List
            </Heading>
            <div className="flex items-center">
              <Img
                src="images/img_arrow_right_blue_gray_300_02.svg"
                alt="arrowright"
                className="h-[10px] mr-[10px]"
              />
              <Text
                size="xs"
                as="p"
                className="!text-blue_gray-300_02 cursor-pointer"
              >
                {patientData.name}
              </Text>
            </div>
          </div>

          <div className="flex gap-[22px]">
            <Button
              size="xl"
              onMouseEnter={() => setOrderHovered(true)}
              onMouseLeave={() => setOrderHovered(false)}
              className="min-w-[213px] gap-2.5 rounded-[20px] font-lama bg-blue-500 text-white custom-button"
              onClick={orderChemo}
            >
              {
                <Img
                  src={
                    orderHovered
                      ? "images/img_tube.svg"
                      : "images/img_thumbsup_white_a700.svg"
                  }
                  alt="thumbs_up"
                  className="h-[14px] w-[14px]"
                />
              }
              Order Chemotherapy
            </Button>
            <Button
              size="xl"
              onMouseEnter={() => setDocumentHovered(true)}
              onMouseLeave={() => setDocumentHovered(false)}
              className="min-w-[213px] gap-2.5 rounded-[20px] font-lama bg-blue-500 text-white custom-button"
              onClick={docChemo}
            >
              <Img
                src={
                  documentHovered
                    ? "images/img_megaphone.svg"
                    : "images/img_megaphone_white_a700.svg"
                }
                alt="thumbs_up"
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
                <div className="flex flex-col items-start gap-[25px] self-stretch">
                  <div className="flex items-center justify-between gap-5 self-stretch">
                    <div className="flex w-[77%] items-center justify-center gap-[15px]">
                      <Img
                        src="images/img_patient_in_a_circle.png"
                        alt="hazemabdulnassr"
                        className="h-[74px] w-[73px] object-cover"
                      />
                      <Heading
                        size="md"
                        as="h2"
                        className="w-[74%] leading-[25px]"
                      >
                        <>
                          Hazem
                          <br />
                          Abdulnasser
                        </>
                      </Heading>
                    </div>
                    <Button
                      size="lg"
                      shape="circle"
                      className="w-[48px] !rounded-[24px] action-button"
                      onClick={togglePatientPopup}
                    >
                      <Img src="images/img_map.svg" />
                    </Button>
                  </div>

                  <Heading size="s" as="h3">
                    General info
                  </Heading>

                  <div className="grid grid-cols-2 gap-6 self-stretch md:grid-cols-1">
                    {GeneralInfoData.map((d, index) => (
                      <div
                        key={"patient1" + index}
                        className="flex w-full flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-2.5 overflow-hidden whitespace-nowrap"
                      >
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          {d.id}
                        </Text>
                        <Text as="p" className="mb-[5px]">
                          {d.y2Dc5F}
                        </Text>
                      </div>
                    ))}
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
                      src="images/img_patient_in_a_circle_74x73.png"
                      alt="cancer_overview"
                      className="h-[74px] w-[73px] object-cover"
                    />
                    <Heading size="md" as="h4">
                      Cancer Overview
                    </Heading>
                  </div>
                </div>
                <Heading size="s" as="h3">
                  General info
                </Heading>
                <div className="flex flex-col items-start gap-[15px] self-stretch">
                  <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-2.5">
                    <Text
                      size="xs"
                      as="p"
                      className="mt-[5px] !text-blue_gray-300"
                    >
                      Diagnosis
                    </Text>
                    <Text as="p">Non-Hodgkin&#39;s malignant lymphoma</Text>
                  </div>
                  <div className="flex w-[47%] flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-2.5 md:w-full">
                    <Text
                      size="xs"
                      as="p"
                      className="mt-[5px] !text-blue_gray-300"
                    >
                      Staging
                    </Text>
                    <Text as="p">Stage || T2 N1 M0</Text>
                  </div>
                  <div className="flex w-[89%] flex-col items-start justify-center gap-[7px] rounded-[10px] bg-gray-50 p-[9px] md:w-full">
                    <Text size="xs" as="p" className="mt-1 !text-blue_gray-300">
                      Note
                    </Text>
                    <Text as="p" className="w-full leading-[25px]">
                      <>
                        Patient has a weak heart so be careful when giving
                        NSAIDs
                      </>
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* vital signs section */}
            <div className="flex w-[49%] flex-col gap-4 rounded-[40px] bg-white-A700 py-[15px] pl-[15px] md:w-full px-4">
              <div className="flex items-center justify-between gap-5">
                <div className="flex w-[77%] items-center gap-[15px]">
                  <Img
                    src="images/img_patient_in_a_circle_1.png"
                    alt="patientina"
                    className="h-[74px] w-[73px] object-cover"
                  />
                  <Heading size="md" as="h6" className="mb-[21px] self-end">
                    Vital Signs
                  </Heading>
                </div>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
                  {vitalData && vitalData.response && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Blood Pressure
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Blood_Pressure} / 80
                        </Text>
                      </div>

                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Height
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Height} Cm
                        </Text>
                      </div>

                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Weight
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Weight} Kg
                        </Text>
                      </div>

                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Heart Rate
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Heart_Rate} / min
                        </Text>
                      </div>

                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          BMI
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.BMI}
                        </Text>
                      </div>

                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Temperature
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Temperature} ْC
                        </Text>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Chief Complaint
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {vitalData.response.Chief_Complaint}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* pathology section */}
          <div className="flex w-[33%] flex-col gap-4 rounded-[40px] bg-white-A700 py-[15px] pl-[15px] md:w-full px-4">
            <div className="flex items-center justify-between gap-5">
              <div className="flex w-[77%] items-center gap-[15px]">
                <Img
                  src="images/img_patient_in_a_circle_2.png"
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
                <Img src="images/img_edit.svg" />
              </Button>
            </div>

            <Heading size="s" as="h3">
              Medical Analysis
            </Heading>
            <Heading size="xs">
              Last update:{" "}
              {medicalData &&
                medicalData.MedicalAnalysis &&
                formatDate(medicalData["MedicalAnalysis"][0]["updatedAt"])}
            </Heading>

            <div className="flex flex-col items-center gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
                {medicalData &&
                  medicalData.MedicalAnalysis &&
                  medicalData.MedicalAnalysis.map((analysis, index) => (
                    <div
                      key={"medicalAnalysis" + index}
                      className="grid grid-cols-2 gap-5"
                    >
                      {/* Urinanalysis */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Urinanalysis
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.Urinanalysis}
                        </Text>
                      </div>

                      {/* CBC */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          CBC
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.CBC}
                        </Text>
                      </div>

                      {/* Electrophoresis */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Electrophoresis
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.Electrophoresis}
                        </Text>
                      </div>

                      {/* CEA */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          CEA
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.CEA}
                        </Text>
                      </div>

                      {/* AFP */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          AFP
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.AFP}
                        </Text>
                      </div>

                      {/* B2M */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          B2M
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.B2M}
                        </Text>
                      </div>

                      {/* Tumor_size */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Tumor Size
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.Tumor_size}
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Heading size="s" as="h3">
              Radiography
            </Heading>

            <Heading size="xs">
              Last update:{" "}
              {radioData &&
                radioData.radiography &&
                formatDate(radioData["radiography"][0]["updatedAt"])}
            </Heading>

            <div className="flex flex-col items-center gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
                {radioData &&
                  radioData.radiography &&
                  radioData.radiography.map((analysis, index) => (
                    <div
                      key={"radiography" + index}
                      className="grid grid-cols-2 gap-5"
                    >
                      {/* Urinanalysis */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          MRI
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.MRI}
                        </Text>
                      </div>

                      {/* CBC */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          CT
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.CT}
                        </Text>
                      </div>

                      {/* Electrophoresis */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          PET_CT
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.PET_CT}
                        </Text>
                      </div>

                      {/* Ultrasound */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Ultrasound
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.Ultrasound}
                        </Text>
                      </div>

                      {/* XRay */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          XRay
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.XRay}
                        </Text>
                      </div>

                      {/* Mammography */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          Mammography
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.Mammography}
                        </Text>
                      </div>

                      {/* DEXA */}
                      <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                        <Text
                          size="xs"
                          as="p"
                          className="h-[15px] w-[15px] !text-blue_gray-300"
                        >
                          DEXA
                        </Text>
                        <Text as="p" className="mb-[5px] px-2">
                          {analysis.DEXA}
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>

              <Button
                size="sm"
                className="min-w-[218px] rounded-[15px] sm:px-5 custom-button"
                variant="fill"
                color="blue_500"
                onClick={togglePathologyPopup}
              >
                View all
              </Button>
            </div>

            {showPatientPopup && (
              <PatientPopup
                name={patientData.name}
                age={patientData.age}
                onClose={togglePatientPopup}
                ID={patientData.ID}
                Gender={patientData.gender}
                DateOFBirth={patientData.DateofBirth}
                bloodType={patientData.bloodType}
                DiseaseType={patientData.diseaseType}
                Street={patientData.street}
                City={patientData.city}
                Government={patientData.government}
                Nationality={patientData.nationality}
                PhoneNumber={patientData.phonenumber}
              />
            )}

            {showPathologyPopup && (
              <PathologyPopup
                name={patientData.name}
                age={patientData.age}
                onClose={togglePathologyPopup}
                ID={patientData.ID}
                Gender={patientData.gender}
                DateOFBirth={patientData.DateofBirth}
                bloodType={patientData.bloodType}
                DiseaseType={patientData.diseaseType}
                Street={patientData.street}
                City={patientData.city}
                Government={patientData.government}
                Nationality={patientData.nationality}
                PhoneNumber={patientData.phonenumber}
              />
            )}
            {showWarningPopup && <WarningPopUp onClose={toggleWarningPopUp} />}
          </div>
        </div>
      </div>
    </>
  );
}
