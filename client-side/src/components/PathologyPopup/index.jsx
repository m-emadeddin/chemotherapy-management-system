import { Img } from "../../components";

export default function PatientPopup({
  ID,
  Gender,
  name,
  DateOFBirth,
  bloodType,
  DiseaseType,
  Street,
  City,
  Government,
  Nationality,
  PhoneNumber,
  onClose,
  path,
}) {
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
                  <div className="grow text-ellipsis">Pathology</div>
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
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
          </div>

          <div className="flex">
            <div className="self-start  text-slate-400 max-md:ml-2.5 w-[20%]">
              B2M
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[25%]">
              Tumor Size
            </div>
          </div>

          <div className="flex gap-3">
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
          </div>

          <div className="new-row flex">
            <div className=" font-bold text-black">Radiology</div>
          </div>
          {/* New row */}
          <div className="flex gap-3">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              MRI
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              CT
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              PET_CT
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Ultrasound
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              XRay
            </div>
          </div>

          <div className="flex gap-3">
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
          </div>

          <div className="flex">
            <div className="self-start text-slate-400 max-md:ml-2.5 w-[20%]">
              Mammography
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[25%]">
              DEXA
            </div>
          </div>

          <div className="flex gap-3">
            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>

            <div className="justify-center px-5 py-5 rounded-3xl bg-gray-200 w-[20%]">
              <input
                type="text"
                className="self-start mt-0 px-5 text-sm leading-6 text-black max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-full"
                placeholder="Normal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
