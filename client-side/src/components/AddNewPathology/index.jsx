import { Img, Button } from "../../components";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddNewPathology({ onClose, path, patientID }) {
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

  const handleMedicalInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "Tumor_size" && isNaN(value)) {
      toast.error("Please enter a valid number for Tumor size.");
      return;
    }
    setMedicalData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRadioInputChange = (e) => {
    const { id, value } = e.target;
    setRadioData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function postRadioData() {
    try {
      const response = await axios.post(
        `/patient/add-radiography/${patientID}`,
        radiodata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Radio Data saved successfully!");
        onClose();
      } else {
        toast.error("Failed to save data. Please try again later.");
      }
    } catch (error) {
      toast.error("Error saving data:", error.message);
    }
  }

  async function postMedicalData() {
    try {
      const response = await axios.post(
        `/patient/add-medical/${patientID}`,
        medicaldata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("medicalData saved successfully!");
        onClose();
      } else {
        toast.error("Failed to save data. Please try again later.");
      }
    } catch (error) {
      toast.error("Error saving data:", error.message);
    }
  }
  async function addNew() {
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

    postMedicalData();
    postRadioData();
    toast.success("New Pathology Added Successfully");
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
                  <div className="grow text-ellipsis">Add New Pathology</div>
                </div>
                <Button
                  size="xl"
                  className="gap-2.5 rounded-[20px] font-lama bg-green-500 text-white custom-button"
                  onClick={addNew}
                >
                  Add
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
          {/* New row */}
          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Urinanalysis
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              CBC
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Electrophoresis
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              CEA
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              AFP
            </div>
          </div>
          <div className="flex gap-3">
            {/* Input for Urinanalysis */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="Urinanalysis"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"Urinanalysis"}
                onChange={handleMedicalInputChange}
                value={medicaldata.Urinanalysis}
              />
            </div>

            {/* Input for CBC */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="CBC"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"CBC"}
                onChange={handleMedicalInputChange}
                value={medicaldata.CBC}
              />
            </div>

            {/* Input for Electrophoresis */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="Electrophoresis"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"Electrophoresis"}
                onChange={handleMedicalInputChange}
                value={medicaldata.Electrophoresis}
              />
            </div>

            {/* Input for CEA */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="CEA"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"CEA"}
                onChange={handleMedicalInputChange}
                value={medicaldata.CEA}
              />
            </div>

            {/* Input for AFP */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="AFP"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"AFP"}
                onChange={handleMedicalInputChange}
                value={medicaldata.AFP}
              />
            </div>
          </div>

          {/* New row */}
          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              B2M
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Tumor size
            </div>
          </div>
          <div className="flex gap-3">
            {/* Input for B2M */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="B2M"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"B2M"}
                onChange={handleMedicalInputChange}
                value={medicaldata.B2M}
              />
            </div>

            {/* Input for Tumor size */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="Tumor_size"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"Tumor size"}
                onChange={handleMedicalInputChange}
                value={medicaldata.Tumor_size}
              />
            </div>
          </div>

          <div className="new-row flex">
            <div className=" font-bold text-black">Radiology Analysis</div>
          </div>
          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              MRI
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              CT
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              PET-CT
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Ultrasound
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              XRay
            </div>
          </div>
          <div className="flex gap-3">
            {/* Input for MRI */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="MRI"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"MRI"}
                onChange={handleRadioInputChange}
                value={radiodata.MRI}
              />
            </div>

            {/* Input for CT */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="CT"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"CT"}
                onChange={handleRadioInputChange}
                value={radiodata.CT}
              />
            </div>

            {/* Input for PET-CT */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="PET_CT"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"PET-CT"}
                onChange={handleRadioInputChange}
                value={radiodata.PET_CT}
              />
            </div>

            {/* Input for Ultrasound */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="Ultrasound"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"Ultrasound"}
                onChange={handleRadioInputChange}
                value={radiodata.Ultrasound}
              />
            </div>

            {/* Input for XRay */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="XRay"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"XRay"}
                onChange={handleRadioInputChange}
                value={radiodata.XRay}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Mammography
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              DEXA
            </div>
          </div>
          <div className="flex gap-3">
            {/* Input for Mammography */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="Mammography"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"Mammography"}
                onChange={handleRadioInputChange}
                value={radiodata.Mammography}
              />
            </div>

            {/* Input for DEXA */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                id="DEXA"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder={"DEXA"}
                onChange={handleRadioInputChange}
                value={radiodata.DEXA}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
