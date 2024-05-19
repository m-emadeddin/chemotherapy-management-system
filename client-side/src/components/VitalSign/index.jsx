import React from "react";
import { Text } from "..";

const VitalSignComponent = ({ vitalData }) => {

  return (
    <>
      {" "}
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="grid grid-cols-1 gap-5 self-stretch md:pr-5">
          {vitalData && (
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
                  {vitalData.Blood_Pressure} / 80
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
                  {vitalData.Height} Cm
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
                  {vitalData.Weight} Kg
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
                  {vitalData.Heart_rate} / min
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
                  {vitalData.BMI}
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
                  {vitalData.Temp} ْC
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
                  {vitalData.Chief_Complaint}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VitalSignComponent;
