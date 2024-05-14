import React from "react";
import { Text, Heading } from "../../components";

const MedicalAnalysisComponent = ({ medicalData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${year}/${month}/${day}`;
  };
  return (
    <>
      <Heading size="xs">
        Last update:{" "}
        {medicalData &&
          medicalData.MedicalAnalysis &&
          formatDate(medicalData["MedicalAnalysis"][0]["updatedAt"])}
      </Heading>

      <div className="flex flex-col items-center gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 self-stretch md:pr-5">
          {medicalData &&
            medicalData.MedicalAnalysis &&
            medicalData.MedicalAnalysis.map((analysis, index) => (
              <div
                key={"medicalAnalysis" + index}
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
                    {analysis.Urinanalysis}
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
                    {analysis.CBC}
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
                    {analysis.Electrophoresis}
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
                    {analysis.CEA}
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
                    {analysis.AFP}
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
                    {analysis.B2M}
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
                    {analysis.Tumor_size}
                  </Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MedicalAnalysisComponent;
