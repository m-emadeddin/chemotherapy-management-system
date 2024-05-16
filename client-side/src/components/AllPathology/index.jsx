import { Img, Button } from "..";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AllPathology({
  onClose,
  path,
  radioData,
  medicalData,
  patientID,
}) {
  const [medicaldata, setMedicalData] = useState({
    Urinanalysis: "",
    CBC: "",
    Electrophoresis: "",
    CEA: "",
    AFP: "",
    B2M: "",
    Tumor_size: "",
  });

  const [radiodata, setRadioData] = useState({
    MRI: "",
    CT: "",
    PET_CT: "",
    Ultrasound: "",
    XRay: "",
    Mammography: "",
    DEXA: "",
  });

  useEffect(() => {
    setMedicalData(medicalData);
    setRadioData(radioData);
  }, [medicalData, radioData]);

  async function putRadioData() {
    try {
      const response = await fetch(
        `/patient/Radiography-update/${patientID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(radiodata),
        }
      );
      if (response.ok) {
        console.log("radioData saved successfully!");
        onClose();
      } else {
        toast.error("Failed to save data. Please try again later.");
      }
    } catch (error) {
      toast.error("Error saving data:", error);
    }
  }

  async function putMedicalData() {
    try {
      const response = await fetch(`/patient/medical-update/${patientID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicaldata),
      });
      if (response.ok) {
        toast.success("medicalData saved successfully!");
        onClose();
      } else {
        toast.error("Failed to save data. Please try again later.");
      }
    } catch (error) {
      toast.error("Error saving data:", error);
    }
  }

  async function save() {
    // Check if any medical data fields are empty
    const medicalFields = Object.values(medicaldata);
    if (medicalFields.some((value) => value === "")) {
      toast.error("Please fill in all medical analysis fields.");
      return;
    }
    // Check if any radiology data fields are empty
    const radioFields = Object.values(radiodata);
    if (radioFields.some((value) => value === "")) {
      toast.error("Please fill in all radiology fields.");
      return;
    }
    console.log(medicaldata);
    console.log(radiodata);
    toast.success("Pathology Updated Successfully");

    window.location.reload();
  }

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
                  <div className="grow text-ellipsis">All Pathology</div>
                </div>
                <Button
                  size="xl"
                  className="gap-2.5 rounded-[20px] font-lama bg-green-500 text-white custom-button"
                >
                  Save Changes
                </Button>
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

        <div className="popup-content flex flex-col gap-4">
          <div className="new-row flex">
            <div className=" font-bold text-black">Medical Analysis</div>
          </div>

          <div className="new-row flex">
            <div className=" font-bold text-black">Radiology Analysis</div>
          </div>

          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Mammography
            </div>

            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              DEXA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
