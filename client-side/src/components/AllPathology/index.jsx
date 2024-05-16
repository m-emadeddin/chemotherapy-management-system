import { Img, Button } from "..";
import React, { useState } from "react";
import AddNewPathology from "../../components/AddNewPathology";


export default function AllPathology({
  onClose,
  path,
  radioData,
  medicalData,
  patientID,
  medicalIsPresent,
  radioIsPresent
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    let hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = hour >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    if (hour > 12) {
      hour = (hour - 12).toString().padStart(2, "0");
    } else if (hour === 0) {
      hour = "12";
    }

    return `${day}/${month}/${year}, ${hour}:${minutes} ${amOrPm}`;
  };
  const [showAddNewPathologyPopup, setShowAddNewPathologyPopup] =
    useState(false);
  const toggleAddNewPathologyPopup = () => {
    setShowAddNewPathologyPopup(!showAddNewPathologyPopup);
  };

  return (
    <div className="edit-popup-overlay">
      <div className="edit-popup-container">
        <div className="popup-heading">
          <div className="flex items-center justify-between">
            <div className="text">
              <div className="flex gap-5 justify-between self-center mt-0 w-full text-2xl font-bold leading-6 text-black whitespace-nowrap max-w-[55px] max-md:flex-wrap max-md:max-w-full">
                <Img
                  src={`${path}/images/img_patient_in_a_circle_2.png`}
                  alt="patientina"
                  className="self-center w-16 aspect-[1.1]"
                />
                <div className="flex items-center gap-5">
                  <div className="grow text-ellipsis">
                    All Pathology Analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/362e8ffa6ae7d4536ca0b48a30657e68c80aef0e894cd013e9f71dd70a5fa3b8?"
            className="shrink-0 w-12 aspect-square cursor-pointer"
            alt="afnsllmk"
            onClick={onClose}
          />
        </div>

        <div className="popup-content flex flex-col gap-1.5">
          <div className="new-row flex">
            <div className=" font-bold text-black">Medical Analysis</div>
          </div>
          {medicalIsPresent?medicalData &&
            medicalData.MedicalAnalysis &&
            medicalData.MedicalAnalysis.map((analysis, index) => (
              <div key={"MedicalAnalysis" + index}>
                <button className="new-row flex border-2 border-blue-500 rounded-md p-2 w-full">
                  <div className="text-black pr-2">
                    Medical Analysis {index + 1}
                  </div>
                  <div className="ml-auto font-bold text-black pr-2">
                    Last Update :
                  </div>
                  <div className="text-black">
                    {formatDate(
                      medicalData["MedicalAnalysis"][index]["updatedAt"]
                    )}
                  </div>
                </button>
              </div>
            )) : <p className="px-3">No Current Medical Data For This Patient</p>}
          <div className="new-row flex">
            <div className=" font-bold text-black">Radiology Analysis</div>
          </div>
          {radioIsPresent? radioData &&
            radioData.radiography &&
            radioData.radiography.map((analysis, index) => (
              <div key={"radiography" + index}>
                <button className="new-row flex border-2 border-blue-500 rounded-md p-2 w-full">
                  <div className="text-black pr-2">
                    Radiology Analysis {index + 1}
                  </div>
                  <div className="ml-auto font-bold text-black pr-2">
                    Last Update :
                  </div>
                  <div className="text-black">
                    {formatDate(radioData["radiography"][index]["updatedAt"])}
                  </div>
                </button>
              </div>
            )) : <p className="px-3">No Current Radio Data For This Patient</p>}
          {/*radioData["radiography"][0]["MRI"]*/}
        </div>
        <Button
          size="xl"
          className="gap-2.5 rounded-[20px] font-lama bg-blue-500 text-white custom-button"
          onClick={toggleAddNewPathologyPopup}
        >
          Insert New Pathology
        </Button>
        {showAddNewPathologyPopup && (
              <AddNewPathology
                onClose={toggleAddNewPathologyPopup}
                path={path}
                patientID={patientID}
              />
            )}
      </div>
    </div>
  );
}
