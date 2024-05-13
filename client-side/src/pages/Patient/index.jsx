import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import PatientPopup from "../../components/PatientPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import PathologyPopup from "../../components/PathologyPopup";
import WarningPopUp from "components/WarningPopUp";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
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
  const [orderBtnHovered, SetOrderBtnHovered] = useState(false);
  const [docBtnHovered, setDocBtnHovered] = useState(false);
  const [showPatientPopup, setShowPatientPopup] = useState(false);
  const [showPathologyPopup, setShowPathologyPopup] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [medicalData, setMedicalData] = useState(null);
  const [radioData, setRadioData] = useState(null);
  const [vitalData, setVitalData] = useState(null);
  const [cancerData, setCancerData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state.selectedPatient;
  console.log(patient);
  const id = patient.Patient_ID;
  const age = calculateAge(patient.date_of_birth);
  const date = formatDate(patient.date_of_birth);

  const { newRegimenDetails } = useRegimenDetails();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/patient/medical/${id}`);
        const data = await response.json();
        console.log(data);
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
        const response = await fetch(`/patient/cancer-overview/${id}`);
        const data = await response.json();
        console.log(data);
        setCancerData(data);
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
        const response = await fetch(`/patient/vital-sign/${id}`);
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
  }

  function docChemo() {
    if (newRegimenDetails) navigate("/document");
    else setShowWarningPopup(true);
  }

  const togglePatientPopup = () => {
    setShowPatientPopup(!showPatientPopup);
  };
  const togglePathologyPopup = () => {
    setShowPathologyPopup(!showPathologyPopup);
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
                {patient.Name}
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
                        <>{patient.Name}</>
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
                      {patient ? (
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
                              {patient.Patient_ID}
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
                              {patient.Gender}
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
                              {patient.blood_type}
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
                              {patient.disease_type}
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
                              {patient.mobile}
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

                <div className="flex flex-col items-center gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
                    {cancerData && cancerData.cancerOverview && (
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                          <Text
                            size="xs"
                            as="p"
                            className="h-[15px] w-[15px] !text-blue_gray-300"
                          >
                            Diagnoses
                          </Text>
                          <Text as="p" className="mb-[5px] px-2">
                            {cancerData.cancerOverview.Diagnoses}
                          </Text>
                        </div>

                        <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                          <Text
                            size="xs"
                            as="p"
                            className="h-[15px] w-[15px] !text-blue_gray-300"
                          >
                            Staging
                          </Text>
                          <Text as="p" className="mb-[5px] px-2">
                            {cancerData.cancerOverview.Staging}
                          </Text>
                        </div>

                        <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                          <Text
                            size="xs"
                            as="p"
                            className="h-[15px] w-[15px] !text-blue_gray-300"
                          >
                            Diagnoses
                          </Text>
                          <Text as="p" className="mb-[5px] px-2">
                            {cancerData.cancerOverview.Note}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                          {vitalData.response.Blood_Pressure}
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
                          {vitalData.response.Temperature} C
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
                name={patient.Name}
                age={age}
                onClose={togglePatientPopup}
                ID={patient.Patient_ID}
                Gender={patient.Gender}
                DateOFBirth={date}
                bloodType={patient.blood_type}
                DiseaseType={patient.disease_type}
                Street={patient.street}
                City={patient.city}
                Government={patient.governorate}
                Nationality={patient.nationality}
                PhoneNumber={patient.mobile}
                path={path}
              />
            )}

            {showPathologyPopup && (
              <PathologyPopup
                onClose={togglePathologyPopup}
                path={path}
                radioData={radioData["radiography"][0]}
                medicalData={medicalData["MedicalAnalysis"][0]}
                patientID={patient.Patient_ID}
              />
            )}
            {showWarningPopup && <WarningPopUp onClose={toggleWarningPopup} />}
          </div>
        </div>
      </div>
    </>
  );
}
