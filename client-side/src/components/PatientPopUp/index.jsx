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
}) {
  return (
    <div className="edit-popup-overlay">
      <div className="edit-popup-container">
        <div className="popup-heading">
          <div className="flex items-center justify-between">
            <div className="text">
              <div className="flex gap-5 justify-between self-center mt-0 w-full text-2xl font-bold leading-6 text-black whitespace-nowrap max-w-[55px] max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="images\patient_in_circle.png"
                  className="self-center w-16 aspect-[1.1]"
                  alt="patient"
                />
                <div className="flex items-center gap-5">
                  <div className="grow text-ellipsis">{name}</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/df690d57ab643da68c80957406d7e0577e5b281de2eb89748175ef071c34ad20?"
                    className="shrink-0 aspect-[1.05] w-[21px] cursor-pointer"
                    alt="afnsllmk"
                  />
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
        </div>

        <div className="popup-content flex flex-col gap-4">
          <div className="new-row flex">
            <div className=" font-bold text-black">General info</div>
          </div>

          {/* New row */}
          <div className="flex">
            <div className="self-start px-5 text-slate-400 max-md:ml-2.5 w-[20%]">
              ID
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Gender
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Date Of Birth
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Blood Type
            </div>
            <div className="self-start mt-0 px-5 text-sm leading-6 text-slate-400 max-md:mt-10 max-md:ml-2.5 whitespace-nowrap w-[20%]">
              Disease Type
            </div>
          </div>

          <div className="flex gap-3">
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis w-[20%]">
              {ID}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis w-[20%]">
              {Gender}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis w-[20%]">
              {DateOFBirth}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis w-[20%]">
              {bloodType}
            </div>
            <div className="justify-center px-5 py-4 rounded-3xl bg-slate-50 text-ellipsis w-[20%]">
              {DiseaseType}
            </div>
          </div>

          <div className="new-row flex">
            <div className=" font-bold text-black">Contact info</div>
          </div>

          {/* New row */}
          <div className="flex flex-wrap">
            <div className="self-start px-5 text-slate-400 max-md:ml-2.5 w-[25%]">
              Street
            </div>
            <div className="self-start px-5 text-slate-400 max-md:ml-2.5 w-[25%]">
              City/Village
            </div>
            <div className="self-start px-5 text-slate-400 max-md:ml-2.5 w-[25%]">
              Governorate
            </div>
            <div className="self-start px-5 text-slate-400 max-md:ml-2.5 w-[25%]">
              Nationality
            </div>
          </div>

          <div className="flex gap-3">
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis  w-[25%]">
              {Street}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis  w-[25%]">
              {City}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis  w-[25%]">
              {Government}
            </div>
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis w-[25%]">
              {Nationality}
            </div>
          </div>

          <div className="flex">
            <div className="flex justify-between items-center px-5 text-slate-400 max-md:ml-2.5 w-[25%]">
              Phone Number
              <div className="hover-container">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba3b520da1558a06e2ea5587cdc0403832bde2c2019cac5869a13f63d9291332?"
                  className="shrink-0 w-3 aspect-square"
                  alt="asd"
                />
                <div className="hover-text">Verfied</div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="justify-center px-5 py-5 rounded-3xl bg-slate-50 text-ellipsis whitespace-nowrap">
              {PhoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
