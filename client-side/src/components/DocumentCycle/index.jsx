import React from "react";
import { Text, Img } from "./..";

export default function DocumentCycle({ pageone = "cycle 1 of 6", ten, linefourOne, ...props }) {
  return (
    <div {...props}>
      <div className="mr-2 flex items-center gap-[23px] md:mr-0">
        <div className="flex items-center gap-[9px] self-start">
          <Img src="images/img_mobile.svg" alt="mobile" className="h-[23px] w-[23px]" />
          <Text as="p" className="!font-medium">
            {pageone}
          </Text>
        </div>
        {!!ten ? (
          <Text
            size="xs"
            as="p"
            className="flex items-center justify-center rounded-[5px] bg-blue-500 p-1 !text-white-A700"
          >
            {ten}
          </Text>
        ) : null}
      </div>
      {!!linefourOne ? <div className="h-[3px] w-full self-stretch bg-blue-500" /> : null}
    </div>
  );
}
