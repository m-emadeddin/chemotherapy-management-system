// import React from "react";
// import { Helmet } from "react-helmet";
// import { CloseSVG } from "../../assets/images";
// import { Img, Text, Button, Input, Heading } from "../../components";
// import { ReactTable } from "../../components/ReactTable";
// import { createColumnHelper } from "@tanstack/react-table";
// import Header from "components/Header";

// const tableData = [
//   {
//     patient: "Ahmed Atef",
//     id: "GB3C5F",
//     gender: "Male",
//     diseasetype: "Bowel cancer",
//     phonenumber: "01218484148",
//   },
// ];

// export default function SelectPatientPage() {
//   const [searchBarValue2, setSearchBarValue2] = React.useState("");
//   const tableColumns = React.useMemo(() => {
//     const tableColumnHelper = createColumnHelper();
//     return [
//       tableColumnHelper.accessor("patient", {
//         cell: (info) => (
//           <div className="flex flex-col items-start gap-[9px]">
//             <Text size="md" as="p" className="mt-[15px]">
//               {info?.getValue?.()}
//             </Text>
//             <Text size="xs" as="p" className="mb-[614px] !text-gray-600">
//               23 years old
//             </Text>
//           </div>
//         ),
//         header: (info) => (
//           <Text as="p" className="py-px pl-[19px] !text-gray-600">
//             Patient
//           </Text>
//         ),
//         meta: { width: "224px" },
//       }),
//       tableColumnHelper.accessor("id", {
//         cell: (info) => (
//           <Text as="p" className="!font-medium">
//             {info?.getValue?.()}
//           </Text>
//         ),
//         header: (info) => (
//           <Text as="p" className="p-px !text-gray-600">
//             ID
//           </Text>
//         ),
//         meta: { width: "167px" },
//       }),
//       tableColumnHelper.accessor("gender", {
//         cell: (info) => (
//           <Text as="p" className="!font-medium">
//             {info?.getValue?.()}
//           </Text>
//         ),
//         header: (info) => (
//           <Text as="p" className="p-px !text-gray-600">
//             Gender
//           </Text>
//         ),
//         meta: { width: "208px" },
//       }),
//       tableColumnHelper.accessor("diseasetype", {
//         cell: (info) => (
//           <Text as="p" className="!font-medium">
//             {info?.getValue?.()}
//           </Text>
//         ),
//         header: (info) => (
//           <Text as="p" className="p-px !text-gray-600">
//             Disease type
//           </Text>
//         ),
//         meta: { width: "248px" },
//       }),
//       tableColumnHelper.accessor("phonenumber", {
//         cell: (info) => (
//           <div className="flex items-start">
//             <Text as="p" className="mt-[29px] !font-medium">
//               {info?.getValue?.()}
//             </Text>
//             <Button
//               size="md"
//               shape="circle"
//               className="mb-[614px] ml-[34px] mt-[19px] w-[40px] !rounded-[20px]"
//             >
//               <Img src="images/img_thumbs_up.svg" />
//             </Button>
//             <Button
//               size="md"
//               shape="circle"
//               className="ml-[5px] mt-[19px] w-[40px] !rounded-[20px]"
//             >
//               <Img src="images/img_map.svg" />
//             </Button>
//           </div>
//         ),
//         header: (info) => (
//           <Text as="p" className="p-px !text-gray-600">
//             Phone number
//           </Text>
//         ),
//         meta: { width: "238px" },
//       }),
//     ];
//   }, []);

//   return (
//     <>
//       <Helmet>
//         <title>CMS App</title>
//         <meta
//           name="description"
//           content="Web site created using create-react-app"
//         />
//       </Helmet>

//       {/* main content section */}
//       <div className="flex w-full flex-col gap-[33px] bg-gray-100 pb-[30px] sm:pb-5">
//         {/* header section */}
//         <div>
//           <Header
//             userName="Mizo"
//             userPhoto="images/img_hesham_1.png"
//             className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs"
//           />
//         </div>

//         {/* patient list section */}
//         <div className="ml-[60px] flex w-[87%] flex-col items-end md:ml-0 md:w-full md:p-5">
//           <Heading as="h1" className="self-start">
//             Patient List
//           </Heading>

//           {/* search patient section */}
//           <div className="container-xs mt-9 flex flex-col items-start px-[51px] md:px-5">
//             <div className="flex w-[77%] flex-col items-start gap-5 md:w-full">
//               <Heading size="s" as="h2">
//                 Select Patient
//               </Heading>
//               <Input
//                 size="sm"
//                 shape="round"
//                 name="search"
//                 value={searchBarValue2}
//                 onChange={(e) => setSearchBarValue2(e)}
//                 suffix={
//                   searchBarValue2?.length > 0 ? (
//                     <CloseSVG onClick={() => setSearchBarValue2("")} />
//                   ) : null
//                 }
//                 className="sm:pr-5"
//               />
//             </div>
//           </div>

//           {/* patient table section */}
//           <ReactTable
//             className="container-xs mt-[66px]"
//             size="sm"
//             bodyProps={{ className: "" }}
//             headerProps={{ className: "flex-wrap" }}
//             rowDataProps={{ className: "md:flex-col" }}
//             columns={tableColumns}
//             data={tableData}
//           />

//           {/* pagination section */}
//           <div className="container-xs mt-[15px] flex flex-col items-start pl-[435px] pr-14 md:px-5">
//             <div className="flex flex-wrap items-center">
//               <Img
//                 src="images/img_arrow_left_gray_600.svg"
//                 alt="arrowleft"
//                 className="mt-2.5 h-[11px] self-start"
//               />
//               <Text
//                 as="p"
//                 className="ml-2.5 flex h-[32px] w-[32px] items-center justify-center rounded-[16px] bg-white-A700 text-center !font-light"
//               >
//                 1
//               </Text>
//               <Text as="p" className="ml-[5px] !font-light !text-gray-600">
//                 /
//               </Text>
//               <Text
//                 as="p"
//                 className="ml-[5px] h-[17px] w-[16px] !font-light !text-gray-600"
//               >
//                 15
//               </Text>
//               <Img
//                 src="images/img_arrow_right.svg"
//                 alt="arrowright"
//                 className="ml-2.5 mt-2.5 h-[11px] self-start"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Img, Text, Button, Input, Heading } from "../../components";
import Header from "components/Header";
import PatientInfo from "components/PatientInfo";

const initialTableData = [
  {
    patient: {
      name: "Ahmed Atef",
      age: 23,
    },
    id: "GB3C5F",
    gender: "Male",
    diseaseType: "Bowel cancer",
    phoneNumber: "01218484148",
  },
];

export default function SelectPatientPage() {
  const [searchBarValue2, setSearchBarValue2] = React.useState("");

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
      <div className="flex w-full flex-col gap-[33px] bg-gray-100 pb-[30px] sm:pb-5">
        {/* header section */}
        <div>
          <Header
            userName="Mizo"
            userPhoto="images/img_hesham_1.png"
            className="flex items-center justify-center border-b border-solid border-gray-400 bg-white-A700 p-2 shadow-xs"
          />
        </div>

        {/* patient list section */}
        <div className="ml-[60px] flex w-[87%] flex-col items-end md:ml-0 md:w-full md:p-5">
          <Heading as="h1" className="self-start">
            Patient List
          </Heading>

          {/* search patient section */}
          <div className="container-xs mt-9 flex flex-col items-start px-[51px] md:px-5">
            <div className="flex w-[77%] flex-col items-start gap-5 md:w-full">
              <Heading size="s" as="h2">
                Select Patient
              </Heading>
              <Input
                size="sm"
                shape="round"
                name="search"
                value={searchBarValue2}
                onChange={(e) => setSearchBarValue2(e)}
                suffix={
                  searchBarValue2?.length > 0 ? (
                    <CloseSVG onClick={() => setSearchBarValue2("")} />
                  ) : null
                }
                className="sm:pr-5"
              />
            </div>
          </div>

          {/* Patient information labels row */}
          <div className="w-full justify-start px-[51px]">
            <PatientInfo />
          </div>

          {/* pagination section */}
          <div className="container-xs mt-[15px] flex flex-col items-start pl-[435px] pr-14 md:px-5">
            <div className="flex flex-wrap items-center">
              <Img
                src="images/img_arrow_left_gray_600.svg"
                alt="arrowleft"
                className="mt-2.5 h-[11px] self-start"
              />
              <Text
                as="p"
                className="ml-2.5 flex h-[32px] w-[32px] items-center justify-center rounded-[16px] bg-white-A700 text-center !font-light"
              >
                1
              </Text>
              <Text as="p" className="ml-[5px] !font-light !text-gray-600">
                /
              </Text>
              <Text
                as="p"
                className="ml-[5px] h-[17px] w-[16px] !font-light !text-gray-600"
              >
                15
              </Text>
              <Img
                src="images/img_arrow_right.svg"
                alt="arrowright"
                className="ml-2.5 mt-2.5 h-[11px] self-start"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
