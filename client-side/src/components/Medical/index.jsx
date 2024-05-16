import React from "react";
import { Text, Heading } from "../../components";

const MedicalAnalysisComponent = ({ medicalData }) => {
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
      <Heading size="xs">
        Last update:{" "}
        {medicalData &&
          formatDate(medicalData["updatedAt"])}
      </Heading>

      <div className="flex flex-col items-center gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
          {medicalData &&
            (
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
                    Urinanalysis
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.Urinanalysis}
                  </Text>
                </div>

                {/* CBC */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    CBC
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.CBC}
                  </Text>
                </div>

                {/* Electrophoresis */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    Electrophoresis
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.Electrophoresis}
                  </Text>
                </div>

                {/* CEA */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    CEA
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.CEA}
                  </Text>
                </div>

                {/* AFP */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    AFP
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.AFP}
                  </Text>
                </div>

                {/* B2M */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    B2M
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.B2M}
                  </Text>
                </div>

                {/* Tumor_size */}
                <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                  <Text
                    size="xs"
                    as="p"
                    className="h-[15px] w-[15px] !text-blue_gray-300"
                  >
                    Tumor Size
                  </Text>
                  <Text as="p" className="mb-[5px] px-2">
                    {medicalData.Tumor_size}
                  </Text>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default MedicalAnalysisComponent;
