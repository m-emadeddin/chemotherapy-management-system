import React from "react";
import { Text } from "..";

const CancerComponent = ({ cancerData }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="grid grid-cols-1 gap-5 self-stretch">
          {cancerData && cancerData.cancerOverview && (
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                <Text
                  size="xs"
                  as="p"
                  className="h-[15px] w-[15px] !text-blue_gray-300"
                >
                  Diagnoses
                </Text>
                <Text as="p" className="mb-[5px] px-2">
                  {cancerData.cancerOverview.Diagnoses}
                </Text>
              </div>

              <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                <Text
                  size="xs"
                  as="p"
                  className="h-[15px] w-[15px] !text-blue_gray-300"
                >
                  Staging
                </Text>
                <Text as="p" className="mb-[5px] px-2">
                  {cancerData.cancerOverview.Staging}
                </Text>
              </div>

              <div className="flex flex-col items-start justify-center gap-2.5 rounded-[10px] bg-gray-50 p-1.5 overflow-hidden whitespace-nowrap">
                <Text
                  size="xs"
                  as="p"
                  className="h-[15px] w-[15px] !text-blue_gray-300"
                >
                  Notes
                </Text>
                <Text as="p" className="mb-[5px] px-2">
                  {cancerData.cancerOverview.Note}
                </Text>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CancerComponent;
