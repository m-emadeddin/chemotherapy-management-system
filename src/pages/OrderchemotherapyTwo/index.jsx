import React from "react";
import { Helmet } from "react-helmet";
import { Button, TextArea, Heading, Text, SelectBox, Img } from "../../components";
import Header from "../../components/Header";
import OrderChemotherapyTwoCycles from "../../components/OrderChemotherapyTwoCycles";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const tableData = [
  { medication: "Ondansentron", dose: "8", route: "Oral", instructions: "Once 60 minutes prior to chemotherapy" },
  { medication: "Sodium chloride", dose: "1000", route: "Intravenous", instructions: "Once prior to chemotherapy" },
];

export default function OrderchemotherapyTwoPage() {
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("rowthumbone", {
        cell: (info) => (
          <div className="flex flex-1 md:self-stretch">
            <div className="h-[20px] w-[20px] self-start rounded-md border border-solid border-gray-700_01 bg-white-A700" />
          </div>
        ),
        header: (info) => (
          <div className="flex flex-1 px-[19px] pb-[19px] md:self-stretch">
            <div className="h-[20px] w-[20px] rounded-md border border-solid border-gray-700_01 bg-white-A700" />
          </div>
        ),
        meta: { width: "112px" },
      }),
      tableColumnHelper.accessor("medication", {
        cell: (info) => (
          <Text as="p" className="uppercase">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="pb-[21px] pt-px !text-gray-600_01 sm:pb-5">
            Medication
          </Text>
        ),
        meta: { width: "211px" },
      }),
      tableColumnHelper.accessor("dose", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Dose
          </Text>
        ),
        meta: { width: "110px" },
      }),
      tableColumnHelper.accessor("route", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Route
          </Text>
        ),
        meta: { width: "127px" },
      }),
      tableColumnHelper.accessor("instructions", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-[21px] pt-px !text-gray-600_01 sm:pb-5">
            Instructions
          </Text>
        ),
        meta: { width: "424px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col items-center gap-[33px] bg-gray-100_01 pb-[30px] sm:pb-5">
        {/* header section */}
        <Header className="flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />

        {/* main content section */}
        <div className="container-xs md:p-5">
          <div className="flex flex-col items-start gap-[35px]">
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
            <div className="flex w-[85%] flex-col gap-[29px] self-end md:w-full">
              <div className="flex w-[77%] flex-col items-start gap-3.5 md:w-full">
                <Heading as="h2">Select regimen</Heading>
                <SelectBox
                  color="white_A700"
                  size="md"
                  shape="round"
                  indicator={
                    <Img src="images/img_arrowdown_blue_gray_300.svg" alt="arrow_down" className="h-[20px] w-[23px]" />
                  }
                  name="chopprotocol"
                  placeholder={`CHOP: Protocol for Non Hodgkin Lymphoma`}
                  options={dropDownOptions}
                  className="gap-px self-stretch sm:pr-5"
                />
              </div>
              <OrderChemotherapyTwoCycles className="flex w-[63%] flex-col items-start gap-3.5 md:w-full" />

              {/* medication section */}
              <div className="flex flex-col items-start">
                <Heading as="h3">Medications</Heading>
                <div className="mt-[17px] flex flex-col gap-[17px] self-stretch rounded-[20px] bg-white-A700 py-1.5">
                  <div className="flex flex-col gap-2">
                    <div className="flex w-[96%] items-center justify-between gap-5 md:w-full">
                      <Text size="md" as="p" className="uppercase">
                        Premedications
                      </Text>
                      <div className="flex items-center gap-4">
                        <Button variant="outline" shape="round" className="min-w-[87px] font-semibold sm:px-5">
                          Edit
                        </Button>
                        <Button color="red_400" variant="outline" shape="round" className="min-w-[88px] font-semibold">
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="h-px bg-blue_gray-100" />
                  </div>
                  <ReactTable
                    size="xs"
                    bodyProps={{ className: "" }}
                    headerProps={{ className: "md:flex-col" }}
                    rowDataProps={{ className: "md:flex-col" }}
                    className="mb-3"
                    columns={tableColumns}
                    data={tableData}
                  />
                </div>

                {/* chemotherapy list section */}
                <div className="mt-[30px] flex flex-col gap-4 self-stretch rounded-[20px] bg-white-A700 py-1.5">
                  <div className="flex flex-col gap-2">
                    <div className="flex w-[96%] items-center justify-between gap-5 md:w-full sm:flex-col">
                      <Text size="md" as="p" className="uppercase">
                        Chemotherapy
                      </Text>
                      <div className="flex w-[40%] items-center justify-center gap-4 sm:w-full sm:flex-col">
                        <Button variant="outline" shape="round" className="min-w-[168px] font-semibold">
                          Change Dosage
                        </Button>
                        <Button
                          variant="outline"
                          shape="round"
                          className="w-full flex-1 font-semibold sm:self-stretch sm:px-5"
                        >
                          Edit
                        </Button>
                        <Button
                          color="red_400"
                          variant="outline"
                          shape="round"
                          className="w-full flex-1 font-semibold sm:self-stretch"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="h-px bg-blue_gray-100" />
                  </div>
                  <div className="flex flex-col gap-[17px]">
                    <div className="flex flex-1 flex-col items-start gap-[18px]">
                      <div className="ml-[19px] flex w-[66%] items-center justify-between gap-5 md:ml-0 md:w-full sm:flex-col">
                        <div className="flex w-[28%] items-center justify-between gap-5 sm:w-full">
                          <div className="h-[20px] w-[20px] rounded-md border border-solid border-gray-700_01 bg-white-A700" />
                          <Text as="p" className="self-start !text-gray-600_01">
                            Medication
                          </Text>
                        </div>
                        <div className="flex w-[52%] flex-wrap justify-between gap-5 self-start sm:w-full">
                          <Text as="p" className="!text-gray-600_01">
                            Dose
                          </Text>
                          <Text as="p" className="!text-gray-600_01">
                            Route
                          </Text>
                          <Text as="p" className="!text-gray-600_01">
                            Instructions
                          </Text>
                        </div>
                      </div>
                      <div className="h-px w-full self-stretch bg-blue_gray-100" />
                    </div>
                    <div className="flex flex-1 flex-col gap-[18px]">
                      <div className="flex w-[96%] items-center justify-between gap-5 md:w-full md:flex-col">
                        <div className="flex w-[21%] items-center justify-between gap-5 md:w-full">
                          <div className="h-[20px] w-[20px] rounded-md border border-solid border-gray-700_01 bg-white-A700" />
                          <Text as="p" className="self-start uppercase">
                            Prednisone
                          </Text>
                        </div>
                        <div className="flex w-[68%] items-center justify-between gap-5 md:w-full sm:flex-col">
                          <Text as="p" className="self-start">
                            750
                          </Text>
                          <div className="flex flex-wrap gap-[37px]">
                            <Text as="p" className="self-start">
                              Intravenous
                            </Text>
                            <Text as="p" className="self-end">
                              Daily x 5 days. 1st dose 60 minutes prio to chemotherapy PO
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div className="h-px bg-blue_gray-100" />
                    </div>
                    <div className="flex flex-1 flex-col gap-[18px]">
                      <div className="flex w-[96%] items-center md:w-full md:flex-col">
                        <div className="h-[20px] w-[20px] flex-1 rounded-md border border-solid border-gray-700_01 bg-white-A700 md:self-stretch" />
                        <Text as="p" className="ml-[73px] self-start uppercase md:ml-0">
                          Doxorubicin
                        </Text>
                        <Text as="p" className="ml-24 self-start md:ml-0">
                          50
                        </Text>
                        <div className="ml-[89px] flex flex-wrap gap-[37px] md:ml-0">
                          <Text as="p" className="self-start">
                            Intravenous
                          </Text>
                          <Text as="p" className="self-end">
                            IV Push over 15 minutes Dilute to 2mg/mL with 0.9% NS. Give via IV push with free flowing
                            0.9% NS.
                          </Text>
                        </div>
                      </div>
                      <div className="h-px bg-blue_gray-100" />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <div className="flex w-[96%] items-center justify-between gap-5 md:w-full md:flex-col">
                        <div className="flex w-[21%] items-center justify-between gap-5 md:w-full">
                          <div className="h-[20px] w-[20px] rounded-md border border-solid border-gray-700_01 bg-white-A700" />
                          <Text as="p" className="self-start uppercase">
                            Vincristine
                          </Text>
                        </div>
                        <div className="flex flex-wrap items-start">
                          <Text as="p">100</Text>
                          <Text
                            size="xs"
                            as="p"
                            className="ml-[11px] flex items-center justify-center rounded-[5px] bg-blue-500 p-[5px] !text-white-A700"
                          >
                            -10%
                          </Text>
                          <Text as="p" className="ml-[26px]">
                            Oral
                          </Text>
                        </div>
                        <Text as="p" className="self-start">
                          IV Push over 1-2 minutes No dilution needed. Give via IV push with free flowing 0.9% NS.
                        </Text>
                      </div>
                      <div className="h-px bg-blue_gray-100" />
                    </div>
                  </div>
                  <div className="mb-3 flex w-[96%] items-center md:w-full md:flex-col md:p-5">
                    <div className="h-[20px] w-[20px] rounded-md border border-solid border-gray-700_01 bg-white-A700" />
                    <div className="ml-[73px] flex w-[30%] flex-wrap justify-between gap-5 self-start md:ml-0 md:w-full">
                      <Text as="p" className="uppercase">
                        Cyclophosphamide
                      </Text>
                      <Text as="p">1.4</Text>
                    </div>
                    <div className="ml-[90px] flex flex-wrap gap-[37px] md:ml-0">
                      <Text as="p" className="self-start">
                        Intravenous
                      </Text>
                      <Text as="p" className="self-end">
                        IV Push over 1-2 hours Dilute to 1g/50ml with sterile water for injection. Mix prescribed
                        dose/volume with 500mL 0.9 NS
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* physician notes section */}
              <div className="flex flex-col items-center gap-[30px]">
                <div className="flex flex-col items-start gap-[15px] self-stretch">
                  <Heading as="h4">Physician notes</Heading>
                  <TextArea
                    shape="round"
                    name="groupsix"
                    placeholder={`Add your notes here...`}
                    className="self-stretch !border-black-900 text-gray-600_01 sm:pb-5 sm:pr-5"
                  />
                </div>
                <Button className="min-w-[218px] rounded-[15px] sm:px-5">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
