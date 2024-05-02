import React from "react";
import { Text, Img } from "./..";

export default function DocumentChemotherapyCycle({
  pageone = "cycle 1 of 6",
  ten = "active",
  ...props
}) {
  return (
    <div {...props}>
      <div
        className="flex items-center self-stretch bg-gray-300 p-1.5"
        style={{ justifyContent: "end" }}
      >
        <div className="flex items-center justify-around self-stretch bg-gray-300 p-1.5 gap-5">
          <div className="flex items-center gap-[9px] self-start">
            <Img
              src="images/img_mobile.svg"
              alt="mobile"
              className="h-[23px] w-[23px]"
            />
            <Text as="p" className="!font-medium ">
              {pageone}
            </Text>
          </div>
          <Text
            size="xs"
            as="p"
            className="flex items-center justify-center rounded-[5px] bg-blue-500 p-1 !text-white-A700"
          >
            {ten}
          </Text>
        </div>
      </div>
      <div className=" mt-[-1px] h-[3px] self-stretch bg-blue-500" />
    </div>
  );
}
