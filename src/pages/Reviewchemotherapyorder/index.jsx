import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img } from "../../components";
import Header from "../../components/Header";

export default function ReviewchemotherapyorderPage() {
  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>

      {/* review chemotherapy order section */}
      <div className="flex w-full flex-col items-center gap-[33px] bg-gray-100_01 pb-[30px] sm:pb-5">
        {/* header section */}
        <Header className="flex items-center justify-center self-stretch border-b border-solid border-gray-400 bg-white-A700 py-2 shadow-xs" />

        {/* main content section */}
        <div className="container-xs md:p-5">
          {/* patient navigation section */}
          <div className="flex flex-col items-start gap-[33px]">
            {/* navigation menu section */}
            <div className="flex flex-wrap items-center gap-[15px] sm:flex-col">
              <Heading size="xs" as="h1">
                Patient List
              </Heading>
              <Img
                src="images/img_arrow_right.svg"
                alt="arrowright"
                className="h-[10px] self-end sm:w-full"
              />
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

            {/* chemotherapy details section */}
            <div className="flex w-[85%] flex-col items-start self-end md:w-full">
              {/* regimen information section */}
              <div className="flex flex-col gap-[30px] self-stretch">
                <div className="flex flex-col items-start">
                  <Text size="lg" as="p">
                    Review
                  </Text>
                  <Heading as="h2" className="mt-8">
                    CHOP: Protocol for Non Hodgkin Lymphoma
                  </Heading>
                  <Text size="xs" as="p" className="mt-[13px]">
                    Every 3 weeks x 6 cycles
                  </Text>
                </div>

                {/* medication list section */}
                <div className="flex flex-col items-start gap-4">
                  <Heading as="h3">Medications</Heading>
                  <div className="flex flex-col justify-center gap-[11px] self-stretch rounded-[20px] bg-white-A700 py-4">
                    {/* premedication header section */}
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

                    {/* premedication details section */}
                    <div className="flex flex-col items-start gap-3.5">
                      <Text
                        as="p"
                        className="ml-[19px] !font-medium uppercase md:ml-0"
                      >
                        Ondansentron
                      </Text>
                      <Text as="p" className="ml-[19px] !text-gray-700 md:ml-0">
                        Once 60 minutes prior to chemotherapy
                      </Text>
                      <div className="h-px w-full self-stretch bg-blue_gray-100" />
                    </div>

                    {/* hydration details section */}
                    <div className="ml-[19px] flex flex-col items-start gap-3.5 md:ml-0">
                      <Text as="p" className="!font-medium uppercase">
                        Sodium chloride
                      </Text>
                      <Text as="p" className="!text-gray-700">
                        Once prior to chemotherapy
                      </Text>
                    </div>
                  </div>

                  {/* chemotherapy header section */}
                  <div className="flex flex-col items-center justify-center gap-[13px] self-stretch rounded-[20px] bg-white-A700 py-4">
                    <div className="flex flex-col items-start gap-[18px] self-stretch">
                      <Text
                        size="md"
                        as="p"
                        className="ml-[19px] uppercase md:ml-0"
                      >
                        Chemotherapy
                      </Text>
                      <div className="h-px w-full self-stretch bg-blue_gray-100" />
                    </div>

                    {/* chemotherapy prednisone section */}
                    <div className="flex flex-col items-start gap-3.5 self-stretch">
                      <Text
                        as="p"
                        className="ml-[19px] !font-medium uppercase md:ml-0"
                      >
                        Prednisone
                      </Text>
                      <Text as="p" className="ml-[19px] !text-gray-700 md:ml-0">
                        Daily x 5 days. 1st dose 60 minutes prio to chemotherapy
                        PO
                      </Text>
                      <div className="h-px w-full self-stretch bg-blue_gray-100" />
                    </div>

                    {/* chemotherapy doxorubicin section */}
                    <div className="flex flex-col items-start self-stretch">
                      <div className="ml-[19px] flex flex-wrap items-start justify-between gap-5 self-stretch md:ml-0">
                        <Text as="p" className="!font-medium uppercase">
                          Doxorubicin
                        </Text>
                        <Text
                          size="xs"
                          as="p"
                          className="mt-[11px] flex items-center justify-center rounded-[5px] bg-blue-500 p-[5px] !text-white-A700"
                        >
                          -10%
                        </Text>
                      </div>
                      <Text
                        as="p"
                        className="relative ml-[19px] mt-[-3px] !text-gray-700 md:ml-0"
                      >
                        IV Push over 15 minutes Dilute to 2mg/mL with 0.9% NS.
                        Give via IV push with free flowing 0.9% NS.
                      </Text>
                      <div className="mt-[13px] h-px w-full self-stretch bg-blue_gray-100" />
                    </div>

                    {/* chemotherapy vincristine section */}
                    <div className="flex flex-col items-start gap-[13px] self-stretch">
                      <div className="ml-[19px] flex flex-col items-start gap-3.5 md:ml-0">
                        <Text as="p" className="!font-medium uppercase">
                          Vincristine
                        </Text>
                        <Text as="p" className="!text-gray-700">
                          IV Push over 1-2 minutes No dilution needed. Give via
                          IV push with free flowing 0.9% NS.
                        </Text>
                      </div>
                      <div className="h-px w-full self-stretch bg-blue_gray-100" />
                    </div>

                    {/* chemotherapy cyclophosphamide section */}
                    <div className="flex flex-col items-start gap-3.5">
                      <Text as="p" className="!font-medium uppercase">
                        Cyclophosphamide
                      </Text>
                      <Text as="p" className="!text-gray-700">
                        IV Push over 1-2 hours Dilute to 1g/50ml with sterile
                        water for injection. Mix prescribed dose/volume with
                        500mL 0.9 NS
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <Heading as="h4" className="mt-[29px]">
                Physician notes
              </Heading>
              <Heading size="xs" as="h5" className="mt-[19px]">
                Dose reduced Doxorubicin because patient has weak heart
              </Heading>

              {/* action buttons section */}
              <div className="mt-[35px] flex gap-[15px] self-center">
                <Button
                  color="blue_gray_500"
                  className="min-w-[152px] rounded-[15px] sm:px-5"
                >
                  Back
                </Button>
                <Button className="min-w-[152px] rounded-[15px] sm:px-5">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
