import React from "react";
import { Text, Heading, Button } from "..";

const RadiologyComponent = ({ radioData, togglePathologyPopup }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <Heading size="xs">
        Last update: {radioData && formatDate(radioData["updatedAt"])}
      </Heading>

      <div className="flex flex-col items-center gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
          {radioData && (
              <div
                className="grid grid-cols-2 gap-5"
              >
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
        <Button
          size="sm"
          className="min-w-[218px] rounded-[15px] sm:px-5 custom-button"
          variant="fill"
          color="blue_500"
          onClick={togglePathologyPopup}
        >
          View all
        </Button>
      </div>
    </>
  );
};

export default RadiologyComponent;
