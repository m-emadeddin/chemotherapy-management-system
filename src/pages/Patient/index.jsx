import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Text, Heading, Img } from "../../components";
import Header from "../../components/Header";
import PatientPopup from "../../components/PatientPopUp" ;
const data = [
  {
    bilateralsalpi: "Bilateral salpingo-oophorectomy",
    thirtyTwoThousandEighteen: "03/20/18 Requested",
  },
  {
    bilateralsalpi: "Bilateral salpingo-oophorectomy test",
    thirtyTwoThousandEighteen: "09/17/17",
  },
  {
    bilateralsalpi: "Excisional biopsy of left breats",
    thirtyTwoThousandEighteen: "06/19/16 Requested",
  },
];

const data1 = [
  { height: "Height", distance: "176.784 cm" },
  { height: "Weight", distance: "58.967 kg" },
  { height: "(Calculated) BMI", distance: "19.8" },
  { height: "Temperature", distance: "37.9 °C" },
  { height: "Heart Rate", distance: "60 /min" },
  { height: "Respiratory Rate", distance: "15 /min" },
  { height: "Blood Pressure", distance: "140/80" },
  { height: "O2 Sat", distance: "95 %" },
];

const data2 = [
  { id: "ID", y2Dc5F: "Y2DC5F" },
  { id: "Gender", y2Dc5F: "Male" },
  { id: "Date of birth", y2Dc5F: "12.Mar.2001 (23 y.o)" },
  { id: "Blood type", y2Dc5F: "A+" },
  { id: "Disease type", y2Dc5F: "Lung Cancer" },
  { id: "Phone number", y2Dc5F: "01095368957" },
];

export default function PatientPage() {
  const [hovered, setHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [patientData, setPatientData] = useState({
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
    gender:"Male"
    
  });
  const togglePopup = () => {
    setShowPopup(!showPopup);
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
      <div className="flex w-full flex-col items-center gap-[15px] bg-gray-100 pb-[70px] md:pb-5">
        {/* header section */}
        <Header className="flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs" />
        <div className="mx-auto flex w-full max-w-[1321px] flex-col gap-[30px] md:p-5">
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
                  className="h-[10px] self-end mr-[10px]"
                />
                <Text
                  size="xs"
                  as="p"
                  className="!text-blue_gray-300_02 cursor-pointer"
                >
                  Patient Name
                </Text>
              </div>
            </div>

            <div className="flex gap-[22px]">
              <Button
                size="xl"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="min-w-[213px] gap-2.5 rounded-[20px] font-lama bg-blue-500 text-white custom-button"
                onClick={orderChemo}
              >
                {hovered ? (
                  <Img
                    src="images/icons (1).png"
                    alt="thumbs_up"
                    className="h-[14px] w-[14px]"
                  />
                ) : (
                  <Img
                    src="images/img_thumbsup_white_a700.svg"
                    alt="thumbs_up"
                    className="h-[14px] w-[14px]"
                  />
                )}
                Order Chemotherapy
              </Button>
              <Button
                size="xl"
                leftIcon={
                  <Img
                    src="images/img_megaphone.svg"
                    alt="megaphone"
                    className="h-[14px] w-[14px]"
                  />
                }
                className="min-w-[213px] gap-2.5 rounded-[20px] font-lama sans bg-blue-500 text-white custom-button"
                onClick={docChemo}
              >
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
                        onClick={togglePopup}
                      >
                        <Img src="images/img_map.svg" />
                      </Button>
                    </div>

                    <Heading size="s" as="h3">
                      General info
                    </Heading>

                    <div className="grid grid-cols-2 gap-6 self-stretch md:grid-cols-1">
                      {data2.map((d, index) => (
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
                    onClick={togglePopup}
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
                    <Button
                      size="lg"
                      shape="circle"
                      className="w-[48px] !rounded-[24px] action-button"
                    >
                      <Img src="images/img_edit.svg" />
                    </Button>
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
                      <Text
                        size="xs"
                        as="p"
                        className="mt-1 !text-blue_gray-300"
                      >
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
              <div className="flex w-[49%] flex-col items-start gap-[25px] rounded-[40px] bg-white-A700 p-[15px] md:w-full">
                <div className="flex items-center justify-between gap-5 self-stretch sm:flex-col">
                  <div className="flex w-[77%] items-center gap-[15px] sm:w-full">
                    <Img
                      src="images/img_patient_in_a_circle_1.png"
                      alt="patientina"
                      className="h-[74px] w-[73px] object-cover"
                    />
                    <Heading size="md" as="h6" className="mb-[21px] self-end">
                      Vital Signs
                    </Heading>
                  </div>
                  <Button
                    size="lg"
                    shape="circle"
                    className="w-[48px] !rounded-[24px] action-button"
                  >
                    <Img src="images/img_clock.svg" />
                  </Button>
                </div>
                <Heading size="xs">Last update: 12/04/2024</Heading>
                <div className="flex flex-col items-start gap-[15px] self-stretch">
                  <div className="grid grid-cols-2 gap-6 self-stretch md:grid-cols-1">
                    {data1.map((d, index) => (
                      <div
                        key={"patient" + index}
                        className="flex w-full flex-col items-start justify-center gap-2 rounded-[10px] bg-gray-50 p-2.5"
                      >
                        <Text
                          size="xs"
                          as="p"
                          className="mt-[5px] !text-blue_gray-300"
                        >
                          {d.height}
                        </Text>
                        <Text as="p" className="mb-[5px]">
                          {d.distance}
                        </Text>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-start justify-center gap-[9px] rounded-[10px] bg-gray-50 p-2.5">
                    <Text size="xs" as="p" className="mt-1 !text-blue_gray-300">
                      Chief Complaint
                    </Text>
                    <Text as="p" className="mb-[5px]">
                      Shortness of breath
                    </Text>
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
                >
                  <Img src="images/img_edit.svg" />
                </Button>
              </div>

              <div className="flex flex-col items-center gap-5">
                <div className="flex flex-col gap-5 self-stretch pr-[157px] md:pr-5">
                  {data.map((d, index) => (
                    <div
                      key={"content" + index}
                      className="flex flex-col items-start gap-[15px] pt-1"
                    >
                      <Heading size="xs" as="p">
                        {d.bilateralsalpi}
                      </Heading>
                      <div className="flex flex-col items-start justify-center gap-[11px] rounded-[10px] bg-gray-50 p-2.5">
                        <Text size="xs" className="!text-blue_gray-300">
                          Latest Status
                        </Text>
                        <Text as="p">
                          <span className="text-black-900">
                            {d.thirtyTwoThousandEighteen}
                          </span>
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
                >
                  View all
                </Button>
                {showPopup && (
                  <PatientPopup
                    name={patientData.name}
                    age={patientData.age}
                    onClose={togglePopup}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function orderChemo() {
  window.location.href = "/orderchemotherapy";
}

function docChemo() {
  window.location.href = "/documentchemotherapy";
}
