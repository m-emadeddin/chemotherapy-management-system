import React from "react";
import { Text, Img, Button } from "./..";

const DocumentChemotherapyCycle = ({
  openCycle = "1",
  cyclesCount = "1",
  activeCycle = "1",
  dates = [],
  handleNavigation,
}) => {
  const renderDivs = () => {
    const divs = [];
    for (let i = activeCycle || cyclesCount; i > 0; i--) {
      divs.push(
        <div className="self-stretch flex flex-col" key={i}>
          <Button
            className="w-full px-0 h-[40px]"
            onClick={() => {
              handleNavigation(i);
            }}
          >
            <div
              className={`w-full flex justify-end items-center self-stretch cursor-pointer hover:bg-gray-300 transition-all duration-300 p-[5px] ${
                i === openCycle ? "bg-gray-300" : ""
              }`}
            >
              <div className="flex justify-between w-[80%] items-center p-1">
                <div className="flex items-center gap-[9px]">
                  <Img
                    src="images/img_mobile.svg"
                    className="h-[23px] w-[23px]"
                  />
                  <Text size="xl" as="p" className="font-bold">
                    cycle {i} of {cyclesCount}
                  </Text>
                </div>
                {activeCycle === i ? (
                  <Text
                    size="xs"
                    as="p"
                    className="flex items-center justify-center rounded-[5px] bg-blue-500 p-1 !text-white-A700"
                  >
                    active
                  </Text>
                ) : (
                  <div className="text-sm text-gray-700">{dates[i]}</div>
                )}
              </div>
            </div>
          </Button>
          {openCycle === i && (
            <div className=" h-[3px] self-stretch bg-blue-500" />
          )}
        </div>
      );
    }
    return divs;
  };

  return <>{renderDivs()}</>;
};
export { DocumentChemotherapyCycle };
