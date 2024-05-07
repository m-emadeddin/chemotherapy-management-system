import React from "react";
import { Helmet } from "react-helmet";
import { TextArea, Text, Input, Heading } from "../../components";
import DocumentChemotherapyCycle from "../../components/DocumentChemotherapyCycle";
import { Link, useLocation } from "react-router-dom";

export default function DocumentPage() {
  const location = useLocation();
  const cyclesCount = 7;
  const activeCycle = 7;
  const { cycle } = location.state || { cycle: activeCycle };

  const cycles = [];
  for (let i = cyclesCount; i > 0; i--) {
    cycles.push(
      <div key={i} className="self-stretch  md:pb-5">
        <DocumentChemotherapyCycle
          targetCycle={i}
          openCycle={cycle}
          active={i === activeCycle ? true : false}
        />
      </div>
    );
  }
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
        <div className="pt-[50px] flex w-[100%] items-stretch ">
          {/* treatment overview section */}
          <div className="flex w-[19%] flex-col items-start bg-white-A700 py-[19px]">
            <Text
              size="xs"
              as="p"
              className="w-[100%] md:ml-0 text-center mb-2"
            >
              Chemotherapy
            </Text>
            {/* treatment cycle section */}
            {cycles}
          </div>
          <div className="m-[30px] w-[81%] flex flex-1 flex-col gap-[30px] items-start">
            {/* treatment protocol section */}
            <div className="flex flex-col gap-[22px]">
              <Heading as="h1">CHOP: Protocol for Non Hodgkin Lymphoma</Heading>
              <Text size="xs" as="p">
                Cycle {cycle} of {cyclesCount}
              </Text>
            </div>
            <Text as="p" className=" !font-medium">
              Please record the dosage given to the patient
            </Text>

            <div className="flex flex-col gap-[15px]">
              {/* dosage entry section prednisone */}
              <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    Prednisone
                  </Text>
                  <Text size="xs" as="p" className="text-gray-700">
                    750Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      mg
                    </Text>
                    <Input
                      className="p-1"
                      shape="round"
                      name="edittext"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                  <div className="flex w-[42%] flex-col items-center gap-[11px]">
                    <Text size="xs" as="p">
                      ml
                    </Text>
                    <Input
                      className="p-1 text-center"
                      shape="round"
                      name="edittext_one"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-800" />
              {/* dosage entry section prednisone */}
              <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    DOXORUBICIN
                  </Text>
                  <Text size="xs" as="p" className="text-gray-700">
                    50Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      mg
                    </Text>
                    <Input
                      shape="round"
                      name="edittext"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                  <div className="flex w-[42%] flex-col items-center gap-[11px]">
                    <Text size="xs" as="p">
                      ml
                    </Text>
                    <Input
                      shape="round"
                      name="edittext_one"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-800" />
              {/* dosage entry section prednisone */}
              <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    VINCRISTINE
                  </Text>
                  <Text size="xs" as="p" className="text-gray-700">
                    100Milligram
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      mg
                    </Text>
                    <Input
                      shape="round"
                      name="edittext"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                  <div className="flex w-[42%] flex-col items-center gap-[11px]">
                    <Text size="xs" as="p">
                      ml
                    </Text>
                    <Input
                      shape="round"
                      name="edittext_one"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-800" />
              <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    CYCLOPHOSPHAMIDE
                  </Text>
                  <Text size="xs" as="p" className="text-gray-700">
                    1.4Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      mg
                    </Text>
                    <Input
                      shape="round"
                      name="edittext"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                  <div className="flex w-[42%] flex-col items-center gap-[11px]">
                    <Text size="xs" as="p">
                      ml
                    </Text>
                    <Input
                      shape="round"
                      name="edittext_one"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Text as="p" className="mt-[13px] !font-medium">
              Cycle summary notes
            </Text>
            <TextArea
              shape="round"
              name="groupthree"
              placeholder={`Type your summary here...`}
              className=" self-stretch !border-black-900 text-gray-600 sm:pb-5 sm:pr-5"
            />

            {/* submission controls section */}
            <div className=" flex gap-[15px] self-center items-center">
              <Link
                className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
                size="sm"
                to={"/Documentchemotherapy"}
              >
                Submit
              </Link>
              <Link
                size="sm"
                className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
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