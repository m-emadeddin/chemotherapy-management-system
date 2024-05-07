import React from "react";
import { Text, Img } from "./..";
import { Link } from "react-router-dom";

export default function DocumentChemotherapyCycle({
  id = "1",
  openCycle = "1",
  cyclesCount = "1",
  activeCycle = "1",
}) {
  const renderDivs = () => {
    const divs = [];
    for (let i = cyclesCount; i > 0; i--) {
      divs.push(
        <div className="self-stretch  md:pb-5" key={i}>
          <Link to={"/document"} state={{ cycle: i, cyclesCount: cyclesCount }}>
            <div
              className={`flex items-center self-stretch  cursor-pointer hover:bg-gray-300 transition-all duration-300 p-1.5 ${
                i === openCycle ? "bg-gray-300" : ""
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
                    cycle {i} of {cyclesCount}
                  </Text>
                </div>
                {activeCycle === i && (
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
            {activeCycle === i && (
              <div className=" mt-[-1px] h-[3px] self-stretch bg-blue-500" />
            )}
          </Link>
        </div>
      );
    }
    return divs;
  };

  return <>{renderDivs()}</>;
}
