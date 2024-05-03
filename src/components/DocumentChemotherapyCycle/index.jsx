import React from "react";
import { Text, Img } from "./..";
import { Link } from "react-router-dom";

export default function DocumentChemotherapyCycle({
  targetCycle = "1",
  cyclesCount = "7",
  openCycle = "1",
  active = true,
}) {
  return (
    <Link to={"/documentchemotherapy"} state={{ cycle: targetCycle }}>
      <div
        className={`flex items-center self-stretch  cursor-pointer hover:bg-gray-300 transition-all duration-300 p-1.5 ${
          targetCycle === openCycle ? "bg-gray-300" : ""
        }`}
      >
        <div className="w-[25%]"></div>
        <div className="flex items-center justify-start self-stretch  p-1.5 gap-5">
          <div className="flex items-center gap-[9px] self-start">
            <Img
              src="images/img_mobile.svg"
              alt="mobile"
              className="h-[23px] w-[23px]"
            />
            <Text as="p" className="fw-[500]">
              cycle {targetCycle} of {cyclesCount}
            </Text>
          </div>
          {active && (
            <Text
              size="xs"
              as="p"
              className="flex items-center justify-center rounded-[5px] bg-blue-500 p-1 !text-white-A700"
            >
              active
            </Text>
          )}
        </div>
      </div>
      {active && (
        <div className=" mt-[-1px] h-[3px] self-stretch bg-blue-500" />
      )}
    </Link>
  );
}
