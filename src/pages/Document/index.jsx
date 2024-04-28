import React from "react";
import { Helmet } from "react-helmet";
import { Button, TextArea, Text, Input, Heading } from "../../components";
import DocumentCycle from "../../components/DocumentCycle";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

export default function DocumentPage() {
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      {/* main content section */}
      <div className="flex w-full flex-col bg-gray-100">
        {/* header section */}
        <div>
          <Header className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />
        </div>
        <div className="flex w-[88%] items-center gap-6 md:w-full md:flex-col md:p-5">
          {/* treatment overview section */}
          <div className="flex w-[21%]  flex-col items-start gap-5 bg-white-A700 md:w-full">
            <Text size="xs" as="p" className="ml-[60px] mt-[17px] md:ml-0">
              Chemotherapy
            </Text>
            <DocumentCycle
              ten="active"
              linefourOne={true}
              className="mb-[716px] flex flex-col items-end gap-2 self-stretch pt-1.5"
            />
          </div>
          <div className="flex flex-1 flex-col items-start md:self-stretch">
            {/* treatment protocol section */}
            <div className="flex flex-col items-start gap-[22px]">
              <Heading as="h1">CHOP: Protocol for Non Hodgkin Lymphoma</Heading>
              <Text size="xs" as="p">
                Cycle 1 of 6
              </Text>
            </div>
            <Text as="p" className="mt-5 !font-medium">
              Please record the dosage given to the patient
            </Text>

            {/* dosage entry section prednisone */}
            <div className="mt-[17px] flex w-[57%] flex-col gap-[15px] md:w-full">
              <div className="flex items-center justify-between gap-5 sm:flex-col">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    Prednisone
                  </Text>
                  <Text size="xs" as="p" className="!text-gray-700">
                    750Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-start gap-2">
                    <Text size="xs" as="p" className="ml-[19px] md:ml-0">
                      mg
                    </Text>
                    <Input shape="round" name="edittext" />
                  </div>
                  <div className="flex w-[42%] flex-col items-start gap-[11px]">
                    <Text
                      size="xs"
                      as="p"
                      className="ml-[19px] h-[15px] w-[15px] md:ml-0"
                    >
                      ml
                    </Text>
                    <Input shape="round" name="edittext_one" />
                  </div>
                </div>
              </div>
              <div className="h-px bg-blue_gray-100" />
            </div>

            {/* dosage entry section doxorubicin */}
            <div className="mt-[17px] flex w-[57%] flex-col gap-[15px] md:w-full">
              <div className="flex items-center justify-between gap-5 sm:flex-col">
                <div className="mb-[5px] flex flex-col items-start gap-2.5 self-end">
                  <Text as="p" className="uppercase">
                    Doxorubicin
                  </Text>
                  <Text size="xs" as="p" className="!text-gray-700">
                    50Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-start self-end">
                    <Text size="xs" as="p" className="ml-[19px] md:ml-0">
                      mg
                    </Text>
                    <Input shape="round" name="edittext_two" />
                  </div>
                  <div className="flex w-[42%] flex-col items-start gap-[11px]">
                    <Text
                      size="xs"
                      as="p"
                      className="ml-[19px] h-[15px] w-[15px] md:ml-0"
                    >
                      ml
                    </Text>
                    <Input shape="round" name="edittext_three" />
                  </div>
                </div>
              </div>
              <div className="h-px bg-blue_gray-100" />
            </div>

            {/* dosage entry section vincristine */}
            <div className="ml-3 mt-[17px] flex w-[55%] items-center justify-between gap-5 md:ml-0 md:w-full">
              <div className="mb-[5px] flex flex-col items-start gap-2.5 self-end">
                <Text as="p" className="uppercase">
                  Vincristine
                </Text>
                <Text size="xs" as="p" className="!text-gray-700">
                  100Milligram
                </Text>
              </div>
              <div className="flex w-[40%] items-center justify-between gap-5">
                <div className="flex w-[42%] flex-col items-start self-end">
                  <Text size="xs" as="p" className="ml-[19px] md:ml-0">
                    mg
                  </Text>
                  <Input shape="round" name="edittext_four" />
                </div>
                <div className="flex w-[42%] flex-col items-start gap-[11px]">
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[19px] h-[15px] w-[15px] md:ml-0"
                  >
                    ml
                  </Text>
                  <Input shape="round" name="edittext_five" />
                </div>
              </div>
            </div>
            <div className="mt-[15px] h-px w-[57%] bg-blue_gray-100" />

            {/* dosage entry section cyclophosphamide */}
            <div className="ml-3 mt-[17px] flex w-[55%] items-center justify-between gap-5 md:ml-0 md:w-full sm:flex-col">
              <div className="mb-[5px] flex flex-col items-start gap-2.5 self-end">
                <Text as="p" className="uppercase">
                  Cyclophosphamide
                </Text>
                <Text size="xs" as="p" className="!text-gray-700">
                  1.4Milligram per square meter
                </Text>
              </div>
              <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                <div className="flex w-[42%] flex-col items-start self-end">
                  <Text size="xs" as="p" className="ml-[19px] md:ml-0">
                    mg
                  </Text>
                  <Input shape="round" name="edittext_six" />
                </div>
                <div className="flex w-[42%] flex-col items-start gap-[11px]">
                  <Text
                    size="xs"
                    as="p"
                    className="ml-[19px] h-[15px] w-[15px] md:ml-0"
                  >
                    ml
                  </Text>
                  <Input shape="round" name="edittext_seven" />
                </div>
              </div>
            </div>
            <div className="mt-[15px] h-px w-[57%] bg-blue_gray-100" />
            <Text as="p" className="mt-[13px] !font-medium">
              Cycle summary notes
            </Text>
            <TextArea
              shape="round"
              name="groupthree"
              placeholder={`Type your summary here...`}
              className="mt-[18px] self-stretch !border-black-900 text-gray-600 sm:pb-5 sm:pr-5"
            />

            {/* submission controls section */}
            <div className="mt-[30px] flex gap-[15px] self-center">
              <Link
                size="sm"
                className="min-w-[152px] rounded-[15px] sm:px-5"
                to={"/Documentchemotherapy"}
              >
                Submit
              </Link>
              <Link
                size="sm"
                className="min-w-[152px] rounded-[15px] sm:px-5"
                to={"/Documentchemotherapy"}
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
