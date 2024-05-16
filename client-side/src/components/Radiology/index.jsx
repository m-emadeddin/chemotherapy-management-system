import React from "react";
import { Text, Heading } from "..";

const RadiologyComponent = ({ radioData, togglePathologyPopup }) => {
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
  return (
    <>
      <Heading size="xs" className="w-full">
        Last update: {radioData && formatDate(radioData["updatedAt"])}
      </Heading>

      <div className="flex flex-col items-center gap-5 w-full">
        <div className="grid grid-cols-1 gap-5 self-stretch md:pr-5">
          {radioData && (
            <div className="grid grid-cols-2 gap-5">
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
                  {radioData.MRI}
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
                  {radioData.CT}
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
                  {radioData.PET_CT}
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
                  {radioData.Ultrasound}
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
                  {radioData.XRay}
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
                  {radioData.Mammography}
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
                  {radioData.DEXA}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RadiologyComponent;
