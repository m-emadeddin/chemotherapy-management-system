import React from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Text, Input, Heading } from "../../components";
import Header from "../../components/Header";
import { ReactTable } from "../../components/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";

const table1Data = [
  {
    patient: "Hazem abdulnasser",
    id: "Y2DC5F",
    gender: "Male",
    diseasetype: "Breast cancer",
    phonenumber: "01218484148",
  },
];

export default function SelectedPatientPage() {
  const [searchBarValue3, setSearchBarValue3] = React.useState("");
  const table1Columns = React.useMemo(() => {
    const table1ColumnHelper = createColumnHelper();
    return [
      table1ColumnHelper.accessor("patient", {
        cell: (info) => (
          <div className="flex flex-col items-start gap-[9px]">
            <Text size="md" as="p" className="ml-1.5 mt-[22px] md:ml-0">
              {info?.getValue?.()}
            </Text>
            <Text size="xs" as="p" className="ml-1.5 !text-gray-600 md:ml-0">
              23 years old
            </Text>
          </div>
        ),
        header: (info) => (
          <Text as="p" className="py-px pl-[19px] !text-gray-600">
            Patient
          </Text>
        ),
        meta: { width: "224px" },
      }),
      table1ColumnHelper.accessor("id", {
        cell: (info) => (
          <Text as="p" className="!font-medium">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="p-px !text-gray-600">
            ID
          </Text>
        ),
        meta: { width: "167px" },
      }),
      table1ColumnHelper.accessor("gender", {
        cell: (info) => (
          <Text as="p" className="!font-medium">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="p-px !text-gray-600">
            Gender
          </Text>
        ),
        meta: { width: "208px" },
      }),
      table1ColumnHelper.accessor("diseasetype", {
        cell: (info) => (
          <Text as="p" className="!font-medium">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="p-px !text-gray-600">
            Disease type
          </Text>
        ),
        meta: { width: "248px" },
      }),
      table1ColumnHelper.accessor("phonenumber", {
        cell: (info) => (
          <Text as="p" className="!font-medium">
            {info?.getValue?.()}
          </Text>
        ),
        header: (info) => (
          <Text as="p" className="p-px !text-gray-600">
            Phone number
          </Text>
        ),
        meta: { width: "238px" },
      }),
    ];
  }, []);

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>

      {/* main content section */}
      <div className="flex w-full flex-col justify-center gap-[33px] bg-gray-100 pb-[899px] md:pb-5">
        {/* header section */}
        <div>
          <Header className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs" />
        </div>

        {/* patient list section */}
        <div className="ml-[60px] flex w-[87%] flex-col items-end gap-[51px] md:ml-0 md:w-full md:p-5 sm:gap-[25px]">
          <Heading as="h1" className="self-start">
            Patient List
          </Heading>
          <div className="container-xs flex flex-col items-start px-[51px] md:px-5">
            <div className="flex w-[77%] flex-col items-start gap-5 md:w-full">
              <Heading size="s" as="h2">
                Select Patient
              </Heading>
              <Input
                size="xs"
                shape="round"
                name="search"
                placeholder={`Hazem`}
                value={searchBarValue3}
                onChange={(e) => setSearchBarValue3(e)}
                suffix={searchBarValue3?.length > 0 ? <CloseSVG onClick={() => setSearchBarValue3("")} /> : null}
                className="text-black-900 sm:pr-5"
              />
            </div>
          </div>

          {/* patient table section */}
          <ReactTable
            className="container-xs"
            size="xs"
            bodyProps={{ className: "" }}
            headerProps={{ className: "flex-wrap" }}
            rowDataProps={{ className: "md:flex-col" }}
            columns={table1Columns}
            data={table1Data}
          />
        </div>
      </div>
    </>
  );
}
