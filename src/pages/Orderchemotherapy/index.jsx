import React from "react";
import { Helmet } from "react-helmet";
import { SelectBox, Img, Heading, Text } from "../../components";
import Header from "../../components/Header";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function OrderchemotherapyPage() {
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>

      {/* main content section */}
      <div className="flex w-full flex-col items-center justify-center gap-[33px] bg-gray-100 pb-[1075px] md:pb-5">
        {/* header section */}
        <Header className="flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />

        {/* body section */}
        <div className="container-xs md:p-5">
          <div className="flex flex-col items-start gap-[38px]">
            {/* navigation section */}
            <div className="flex flex-wrap items-center gap-[15px] sm:flex-col">
              <Heading size="xs" as="h1">
                Patient List
              </Heading>
              <Img src="images/img_arrow_right.svg" alt="arrowright" className="h-[10px] self-end sm:w-full" />
              <Text size="xs" as="p">
                Hazem Abdulnasser
              </Text>
              <Img
                src="images/img_arrow_right_blue_gray_300_01.svg"
                alt="arrowright"
                className="h-[10px] self-end sm:w-full"
              />
              <Text size="xs" as="p" className="!text-blue_gray-300_01">
                Chemo Orders
              </Text>
            </div>

            {/* form section */}
            <div className="flex w-[82%] flex-col items-start gap-[18px] self-end md:w-full">
              <Heading size="s" as="h2">
                Select regimen
              </Heading>
              <SelectBox
                color="white_A700"
                size="md"
                shape="round"
                indicator={
                  <Img src="images/img_arrowdown_blue_gray_300.svg" alt="arrow_down" className="h-[20px] w-[23px]" />
                }
                name="none"
                placeholder={`None`}
                options={dropDownOptions}
                className="gap-px self-stretch sm:pr-5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
