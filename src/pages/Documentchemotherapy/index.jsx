import React from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Heading } from "../../components";
import DocumentChemotherapyCycle from "../../components/DocumentChemotherapyCycle";
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import style from "pages/Documentchemotherapy/style.css";

const table1Data = [
  {
    medication: "Prednisone",
    dose: "750",
    route: "Intravenous",
    rowinstructions:
      "Daily x 5 days. 1st dose 60 minutes prio to chemotherapy PO",
    administereddose: "",
  },
  {
    medication: "Doxorubicin",
    dose: "50",
    route: "Intravenous",
    rowinstructions:
      "IV Push over 15 minutes Dilute to 2mg/mL with 0.9% NS. Give via IV push with free flowing 0.9% NS.",
    administereddose: "",
  },
  {
    medication: "Vincristine",
    dose: "100",
    route: "Oral",
    rowinstructions:
      "IV Push over 1-2 minutes No dilution needed. Give via IV push with free flowing 0.9% NS.",
    administereddose: "",
  },
  {
    medication: "Cyclophosphamide",
    dose: "1.4",
    route: "Intravenous",
    rowinstructions:
      "IV Push over 1-2 hours Dilute to 1g/50ml with sterile water for injection. Mix prescribed dose/volume with 500mL 0.9 NS",
    administereddose: "",
  },
];
const table2Data = [
  {
    medication: "ONDANSENTRON",
    dose: "8",
    route: "Oral",
    rowinstructions: "Once 60 minutes prior to chemotherapy",
  },
  {
    medication: "Sodium chloride",
    dose: "1000",
    route: "Intravenous",
    rowinstructions: "Once prior to chemotherapy",
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
          <Text
            as="p"
            className="pb-[21px] pl-[19px] !text-gray-600_01 sm:pb-5"
          >
            Medication
          </Text>
        ),
        meta: { width: "20%" },
      }),
      table1ColumnHelper.accessor("dose", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Dose
          </Text>
        ),
        meta: { width: "10%" },
      }),
      table1ColumnHelper.accessor("route", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Route
          </Text>
        ),
        meta: { width: "10%" },
      }),
      table1ColumnHelper.accessor("rowinstructions", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="!text-gray-600_01">
            Instructions
          </Text>
        ),
        meta: { width: "35%" },
      }),
      table1ColumnHelper.accessor("administereddose", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className=" !text-gray-600_01">
            Administered dose
          </Text>
        ),
        meta: { width: "15%" },
      }),
    ];
  }, []);
  const table2Columns = React.useMemo(() => {
    const table2ColumnHelper = createColumnHelper();
    return [
      table2ColumnHelper.accessor("medication", {
        cell: (info) => (
          <Text as="p" className="uppercase">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text
            as="p"
            className="pb-[21px] pl-[19px] !text-gray-600_01 sm:pb-5"
          >
            Medication
          </Text>
        ),
        meta: { width: "20%" },
      }),
      table2ColumnHelper.accessor("dose", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Dose
          </Text>
        ),
        meta: { width: "10%" },
      }),
      table2ColumnHelper.accessor("route", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="pb-5 pt-px !text-gray-600_01">
            Route
          </Text>
        ),
        meta: { width: "10%" },
      }),
      table2ColumnHelper.accessor("rowinstructions", {
        cell: (info) => <Text as="p">{info?.getValue?.()}</Text>,
        header: (info) => (
          <Text as="p" className="!text-gray-600_01">
            Instructions
          </Text>
        ),
        meta: { width: "50%" },
      }),
    ];
  }, []);
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="flex w-full flex-col bg-gray-100">
        {/* header section */}
        <Header className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />
        <div className="flex w-[100%] items-stretch md:w-full md:flex-col md:p-5">
          {/* introduction section */}
          <div className="flex w-[19%] flex-col items-start gap-5 bg-white-A700 py-[19px] md:w-full">
            <Text size="xs" as="p" className="w-[100%] md:ml-0 text-center">
              Chemotherapy
            </Text>

            {/* treatment cycle section */}
            <div className="mb-80 self-stretch pb-[324px] md:pb-5">
              <DocumentChemotherapyCycle />
            </div>
          </div>
          <div className="m-[30px] flex flex-1 flex-col gap-[30px] md:self-stretch ">
            {/* treatment protocol section */}
            <div className="flex flex-col gap-[27px]">
              <div className="flex items-stretch justify-between gap-5 md:flex-col p-[19px]">
                <div className="flex flex-col items-start gap-3.5 self-end ">
                  <Heading as="h1">
                    CHOP: Protocol for Non Hodgkin Lymphoma
                  </Heading>
                  <Text size="xs" as="p">
                    Cycle 1 of 6
                  </Text>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Link
                    style={{ color: "white" }}
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white"
                    to="/Document"
                  >
                    Document
                  </Link>
                  <Link
                    style={{ color: "white" }}
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-white"
                    to="/Orderchemotherapy"
                  >
                    Modify Order
                  </Link>
                </div>
              </div>

              {/* premedications section */}
              <div className="flex flex-col gap-[15px] rounded-[20px] bg-white-A700 py-4">
                <div className="flex flex-col items-start gap-[18px]">
                  <Text
                    size="md"
                    as="p"
                    className="ml-[19px] uppercase md:ml-0"
                  >
                    Premedications
                  </Text>
                  <div className="h-px w-full self-stretch bg-blue_gray-100" />
                </div>
                <div className="mb-[5px]">
                  <ReactTable
                    size="sm"
                    className="w-full"
                    bodyProps={{ className: "" }}
                    headerProps={{ className: "md:flex-col" }}
                    rowDataProps={{ className: "flex-wrap" }}
                    columns={table2Columns}
                    data={table2Data}
                  />
                </div>
              </div>
              {/* chemotherapy details section */}
              <div className="flex flex-col gap-[15px] rounded-[20px] bg-white-A700 py-4">
                <div className="flex flex-col items-start gap-[18px]">
                  <Text
                    size="md"
                    as="p"
                    className="ml-[19px] uppercase md:ml-0"
                  >
                    Chemotherapy
                  </Text>
                  <div className="h-px w-full self-stretch bg-blue_gray-100" />
                </div>
                <div className="mb-[5px]">
                  <ReactTable
                    size="sm"
                    className={style.table}
                    bodyProps={{ className: "" }}
                    headerProps={{ className: "md:flex-col" }}
                    rowDataProps={{ className: "flex-wrap" }}
                    columns={table1Columns}
                    data={table1Data}
                  />
                </div>
              </div>
              {/*Physician notes section */}
              <div className="flex flex-col p-[19px] gap-5">
                <Text size="md" style={{ fontWeight: "bold" }}>
                  Physician notes
                </Text>
                <Text>
                  Dose reduced Doxorubicin because patient has weak heart
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
