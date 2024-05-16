import ShowVital from "components/ShowVital";
import { Img } from "..";
import React, { useState } from "react";

export default function AllVital({
  onClose,
  path,
  vitalData,
  patientID,
  vitalIsPresent,
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
  const [VitalselectedIndex, setVitalSelectedIndex] = useState(null);

  const [showVitalHistoryPopup, setShowVitalHistoryPopup] = useState(false);
  const toggleVitalHistoryPopup = (index) => {
    setVitalSelectedIndex(index);
    setShowVitalHistoryPopup(!showVitalHistoryPopup);
  };
  return (
    <div className="edit-popup-overlay">
      <div className="edit-popup-container">
        <div className="popup-heading">
          <div className="flex items-center justify-between">
            <div className="text">
              <div className="flex gap-5 justify-between self-center mt-0 w-full text-2xl font-bold leading-6 text-black whitespace-nowrap max-w-[55px] max-md:flex-wrap max-md:max-w-full">
                <Img
                  src={`/images/img_patient_in_a_circle_1.png`}
                  alt="patientina"
                  className="h-[74px] w-[73px] object-cover"
                />
                <div className="flex items-center gap-5">
                  <div className="grow text-ellipsis">All Vital Signs</div>
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
            <div className=" font-bold text-black">Vital Data History</div>
          </div>
          {vitalIsPresent ? (
            vitalData &&
            vitalData.VitalSigns &&
            vitalData.VitalSigns.map((analysis, index) => (
              <div key={"VitalSigns" + index}>
                <button
                  className="new-row flex border-2 border-blue-500 rounded-md p-2 w-full"
                  onClick={() => toggleVitalHistoryPopup(index)}
                >
                  <div className="text-black pr-2">Vital Data {index + 1}</div>
                  <div className="ml-auto font-bold text-black pr-2">
                    Last Update :
                  </div>
                  <div className="text-black">
                    {formatDate(vitalData["VitalSigns"][index]["updatedAt"])}
                  </div>
                </button>
              </div>
            ))
          ) : (
            <p className="px-3">No Current Medical Data For This Patient</p>
          )}
          {showVitalHistoryPopup && VitalselectedIndex !== null && (
            <ShowVital
              onClose={toggleVitalHistoryPopup}
              path={path}
              patientID={patientID}
              vitalData={vitalData["VitalSigns"][VitalselectedIndex]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
