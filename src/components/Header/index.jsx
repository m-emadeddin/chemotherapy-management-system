import React from "react";
import { Button, Img, Text } from "./..";

export default function Header({ ...props }) {
  return (
    <header {...props}>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-5 self-start sm:flex-col">
        <div className="flex items-center gap-1.5 self-end p-[5px]">
          <Img src="images/img_icon_1.png" alt="iconone" className="h-[26px] w-[26px] object-cover" />
          <Img src="images/img_arrow_down.svg" alt="arrowdown" className="h-[7px]" />
        </div>
        <div className="flex w-[26%] items-center justify-center gap-[13px] pl-[29px] sm:w-full sm:pl-5">
          <div className="flex flex-1 items-center justify-between gap-5">
            <div className="ml-[7px] flex w-[60%] items-center justify-center gap-2.5">
              <Img src="images/img_hesham_1.png" alt="heshamone" className="h-[33px] w-[33px] rounded-[50%]" />
              <Text size="xs" as="p" className="!font-almarai">
                Dr. Hesham
              </Text>
            </div>
            <Img src="images/img_arrowdown_black_900.svg" alt="arrowdown" className="mb-3 mr-[7px] h-[8px] self-end" />
          </div>
          <Button
            shape="round"
            leftIcon={<Img src="images/img_arrowleft_white_a700.svg" alt="arrow_left" className="h-[14px] w-[14px]" />}
            className="min-w-[89px] gap-2.5 font-almarai"
          >
            Log out
          </Button>
        </div>
      </div>
    </header>
  );
}
