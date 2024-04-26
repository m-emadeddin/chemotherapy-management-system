import React from "react";
import { Button, Text, SelectBox, Img, Radio, Heading } from "./..";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function OrderChemotherapyTwoCycles({
  cycles = "Cycles",
  x = "X",
  cyclesOne = "Cycles",
  of = "of",
  daycycle = "day cycle",
  xOne = "X",
  cyclesTwo = "Cycles",
  check = "Check",
  ...props
}) {
  return (
    <div {...props}>
      <Heading as="h4">{cycles}</Heading>
      <div className="flex flex-col items-start gap-2.5 self-stretch">
        <div className="flex w-[64%] items-end gap-2.5 md:w-full sm:flex-col">
          <Radio
            value="every1"
            name="every"
            label="Every"
            className="mb-[7px] w-[17%] gap-1.5 py-[3px] text-sm text-black-900"
          />
          <SelectBox
            shape="round"
            indicator={
              <Img src="images/img_arrowdown_blue_gray_300.svg" alt="arrow_down" className="h-[8px] w-[9px]" />
            }
            name="weeksCounter"
            placeholder={`3 weeks`}
            options={dropDownOptions}
            className="flex-grow gap-px !rounded-[19px] sm:pr-5"
          />
          <Text size="xs" as="p" className="mb-2.5">
            {x}
          </Text>
          <SelectBox size="xs" shape="square" name="cycle_one" options={dropDownOptions} className="flex-grow" />
          <Text size="xs" as="p" className="mb-2">
            {cyclesOne}
          </Text>
        </div>
        <div className="flex items-center self-stretch md:flex-col">
          <Radio value="day1" name="day" label="Day" className="w-[10%] gap-1.5 py-[3px] text-sm text-black-900" />
          <SelectBox
            shape="round"
            indicator={
              <Img src="images/img_arrowdown_blue_gray_300.svg" alt="arrow_down" className="h-[8px] w-[9px]" />
            }
            name="3weeks"
            placeholder={`1,8,15`}
            options={dropDownOptions}
            className="ml-[23px] flex-grow gap-px !rounded-[19px] md:ml-0 sm:pr-5"
          />
          <Text size="xs" as="p" className="ml-2.5 h-[15px] w-[14px] md:ml-0">
            {of}
          </Text>
          <SelectBox
            shape="round"
            indicator={
              <Img src="images/img_arrowdown_blue_gray_300.svg" alt="arrow_down" className="h-[8px] w-[9px]" />
            }
            name="six"
            placeholder={`28`}
            options={dropDownOptions}
            className="ml-2.5 flex-grow gap-px !rounded-[19px] md:ml-0 sm:pr-5"
          />
          <Text size="xs" as="p" className="mb-2.5 ml-2.5 self-end md:ml-0">
            {daycycle}
          </Text>
          <Text size="xs" as="p" className="ml-2.5 md:ml-0">
            {xOne}
          </Text>
          <SelectBox
            size="xs"
            shape="square"
            name="cycle_three"
            options={dropDownOptions}
            className="ml-2.5 flex-grow md:ml-0"
          />
          <Text size="xs" as="p" className="mb-2.5 ml-2.5 self-end md:ml-0">
            {cyclesTwo}
          </Text>
        </div>
        <Button className="min-w-[96px] rounded-[15px]">{check}</Button>
      </div>
    </div>
  );
}
