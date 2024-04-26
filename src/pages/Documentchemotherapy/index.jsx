import React from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Heading } from "../../components";
import DocumentChemotherapyCycle from "../../components/DocumentChemotherapyCycle";
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";

const table1Data = [
  {
    medication: "Prednisone",
    dose: "750",
    route: "Intravenous",
    rowinstructions: "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy PO",
  },
  {
    medication: "Doxorubicin",
    dose: "50",
    route: "Intravenous",
    rowinstructions:
      "IV Push over 15 minutes Dilute to 2mg/mL with 0.9% NS. Give via IV push with free flowing 0.9% NS.",
  },
  {
    medication: "Vincristine",
    dose: "100",
    route: "Oral",
    rowinstructions: "IV Push over 1-2 minutes No dilution needed. Give via IV push with free flowing 0.9% NS.",
  },
  {
    medication: "Cyclophosphamide",
    dose: "1.4",
    route: "Intravenous",
    rowinstructions:
      "IV Push over 1-2 hours Dilute to 1g/50ml with sterile water for injection. Mix prescribed dose/volume with 500mL 0.9 NS",
  },
];

export default function DocumentchemotherapyPage() {
  const table1Columns = React.useMemo(() => {
    const table1ColumnHelper = createColumnHelper();
    return [
      table1ColumnHelper.accessor("medication", {
        cell: (info) => (
          <Text as="p" className="uppercase">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="pb-[21px] pl-[19px] !text-gray-600_01 sm:pb-5">
            Medication
          </Text>
        ),
        meta: { width: "230px" },
      }),
      table1ColumnHelper.accessor("dose", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Dose
          </Text>
        ),
        meta: { width: "110px" },
      }),
      table1ColumnHelper.accessor("route", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Route
          </Text>
        ),
        meta: { width: "127px" },
      }),
      table1ColumnHelper.accessor("rowinstructions", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <div className="flex flex-1 flex-wrap justify-between gap-5 pb-[21px] pr-[21px] md:self-stretch sm:pb-5 sm:pr-5">
            <Text as="p" className="!text-gray-600_01">
              Instructions
            </Text>
            <Text as="p" className="mr-[101px] !text-gray-600_01">
              Administered dose
            </Text>
          </div>
        ),
        meta: { width: "629px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex w-full flex-col bg-gray-100">
        {/* header section */}
        <Header className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />
        <div className="flex w-[96%] items-start gap-6 md:w-full md:flex-col md:p-5">
          {/* introduction section */}
          <div className="flex w-[19%] flex-col items-start gap-5 bg-white-A700 py-[19px] md:w-full">
            <Text size="xs" as="p" className="ml-[60px] md:ml-0">
              Chemotherapy
            </Text>

            {/* treatment cycle section */}
            <div className="mb-80 self-stretch pb-[324px] md:pb-5">
              <DocumentChemotherapyCycle />
            </div>
          </div>
          <div className="mt-[30px] flex flex-1 flex-col gap-[30px] md:self-stretch">
            {/* treatment protocol section */}
            <div className="flex flex-col gap-[27px]">
              <div className="flex items-center justify-between gap-5 md:flex-col">
                <div className="flex flex-col items-start gap-3.5 self-end">
                  <Heading as="h1">CHOP: Protocol for Non Hodgkin Lymphoma</Heading>
                  <Text size="xs" as="p">
                    Cycle 1 of 6
                  </Text>
                </div>
                <div className="flex gap-2.5 self-start">
                  <Button size="md" className="min-w-[111px] rounded-[20px]">
                    Document
                  </Button>
                  <Button color="blue_gray_500" size="md" className="min-w-[134px] rounded-[20px]">
                    Modify Order
                  </Button>
                </div>
              </div>

              {/* premedications section */}
              <div className="flex flex-col justify-center gap-[17px] rounded-[20px] bg-white-A700 py-4">
                <div className="flex flex-col items-start gap-[18px]">
                  <Text size="md" as="p" className="ml-[19px] uppercase md:ml-0">
                    Premedications
                  </Text>
                  <div className="h-px w-full self-stretch bg-blue_gray-100" />
                </div>
                <div className="flex flex-col gap-[17px]">
                  <div className="flex flex-1 flex-col items-start gap-[19px]">
                    <div className="ml-[19px] flex w-[50%] justify-between gap-5 md:ml-0 md:w-full sm:flex-col">
                      <Text as="p" className="!text-gray-600_01">
                        Medication
                      </Text>
                      <div className="flex w-[61%] flex-wrap justify-between gap-5 sm:w-full">
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
                  <div className="flex flex-1 flex-col items-start gap-[18px]">
                    <div className="ml-[19px] flex w-[70%] justify-between gap-5 md:ml-0 md:w-full sm:flex-col">
                      <div className="flex w-[29%] flex-wrap justify-between gap-5 self-start sm:w-full">
                        <Text as="p" className="uppercase">
                          Ondansentron
                        </Text>
                        <Text as="p">8</Text>
                      </div>
                      <Text as="p" className="self-start">
                        Oral
                      </Text>
                      <Text as="p" className="self-end">
                        Once 60 minutes prior to chemotherapy
                      </Text>
                    </div>
                    <div className="h-px w-full self-stretch bg-blue_gray-100" />
                  </div>
                </div>
                <div className="ml-[19px] flex w-[62%] items-center justify-between gap-5 md:ml-0 md:w-full md:flex-col md:p-5">
                  <div className="flex w-[38%] flex-wrap justify-between gap-5 self-start md:w-full">
                    <Text as="p" className="uppercase">
                      Sodium chloride
                    </Text>
                    <Text as="p">1000</Text>
                  </div>
                  <div className="flex w-[52%] flex-wrap justify-between gap-5 md:w-full">
                    <Text as="p" className="self-start">
                      Intravenous
                    </Text>
                    <Text as="p" className="self-end">
                      Once prior to chemotherapy
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* chemotherapy details section */}
            <div className="flex flex-col gap-[15px] rounded-[20px] bg-white-A700 py-4">
              <div className="flex flex-col items-start gap-[18px]">
                <Text size="md" as="p" className="ml-[19px] uppercase md:ml-0">
                  Chemotherapy
                </Text>
                <div className="h-px w-full self-stretch bg-blue_gray-100" />
              </div>
              <div className="mb-[5px]">
                <ReactTable
                  size="sm"
                  bodyProps={{ className: "" }}
                  headerProps={{ className: "md:flex-col" }}
                  rowDataProps={{ className: "flex-wrap" }}
                  columns={table1Columns}
                  data={table1Data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
