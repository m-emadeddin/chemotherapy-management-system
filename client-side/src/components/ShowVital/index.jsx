import { Img } from "..";
import React from "react";

export default function ShowVital({ onClose, path, patientID, vitalData, VitalselectedIndex }) {
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
                  <div className="grow text-ellipsis">
                    Vital Record No. {VitalselectedIndex +1 }
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

        <div className="popup-content flex flex-col gap-4">
          <div className="new-row flex">
            <div className=" font-bold text-black">Vital Records</div>
          </div>
          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Blood Pressure
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Weight
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              BMI
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Chief Complaint
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Height
            </div>
          </div>
          <div className="flex gap-3">
            {/* Display for MRI */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Blood_Pressure"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Blood_Pressure"]} / 80
              </div>
            </div>

            {/* Display for CT */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Weight"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Weight"]} Kg
              </div>
            </div>

            {/* Display for PET-CT */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="BMI"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["BMI"]}
              </div>
            </div>

            {/* Display for Ultrasound */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Chief_Complaint"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Chief_Complaint"]}
              </div>
            </div>

            {/* Display for XRay */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Height"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Height"]} Cm
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Heart Rate
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Temperature
            </div>
          </div>
          <div className="flex gap-3">
            {/* Input for Mammography */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Heart_rate"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Heart_rate"]} / min
              </div>
            </div>

            {/* Input for DEXA */}
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%] overflow-hidden">
              <div
                id="Temp"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap overflow-hidden text-ellipsis w-full"
              >
                {vitalData["Temp"]} ْ C
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
