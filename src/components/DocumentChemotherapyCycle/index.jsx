import React from "react";
import { Text, Img } from "./..";

export default function DocumentChemotherapyCycle({ pageone = "cycle 1 of 6", ten = "active", ...props }) {
  return (
    <div {...props}>
      <div className="flex items-center justify-end gap-[23px] self-stretch bg-gray-300 p-1.5">
        <div className="flex items-center gap-[9px] self-start">
          <Img src="images/img_mobile.svg" alt="mobile" className="h-[23px] w-[23px]" />
          <Text as="p" className="!font-medium">
            {pageone}
          </Text>
        </div>
        <Text
          size="xs"
          as="p"
          className="flex items-center justify-center self-start rounded-[5px] bg-blue-500 p-1 !text-white-A700"
        >
          {ten}
        </Text>
      </div>
      <div className="relative mt-[-1px] h-[3px] self-stretch bg-blue-500" />
    </div>
  );
}
