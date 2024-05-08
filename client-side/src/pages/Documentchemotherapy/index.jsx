import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Heading } from "../../components";
import DocumentChemotherapyCycle from "../../components/DocumentChemotherapyCycle";
import { useLocation, Link } from "react-router-dom";
import CycleDetails from "../../components/CycleDetails";
import CycleDocument from "components/CycleDocument";

export default function DocumentchemotherapyPage(props) {
  const location = useLocation();
  const id = 1;
  const activeCycle = 1;
  const { cycle } = location.state || { cycle: activeCycle };
  const [cyclesCount, setCyclesCount] = useState();
  const [redirectToDoc, setRedirectToDoc] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/cycles-count/${id}`
        );
        const data = await response.json();
        console.log(data);
        setCyclesCount(data.cycle_count);
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>CMS App</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="w-full pt-[50px] flex w-[100%] items-stretch bg-gray-100">
        <div className="flex w-[19%] flex-col items-start bg-white-A700 py-[19px]">
          <Text size="xs" as="p" className="w-[100%] md:ml-0 text-center mb-2">
            Chemotherapy
          </Text>
          <DocumentChemotherapyCycle
            id={id}
            openCycle={cycle}
            cyclesCount={cyclesCount}
            activeCycle={activeCycle}
          />
        </div>
        <div className="m-[30px] w-[81%] flex flex-1 flex-col gap-[30px]">
          {/* treatment protocol section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between p-[19px] md:flex-col">
              <div className="flex flex-col items-start gap-3.5 lg:w-[55%] md:items-center ">
                <Heading as="h1">
                  CHOP: Protocol for Non Hodgkin Lymphoma
                </Heading>
                <Text size="xs" as="p">
                  Cycle {cycle} of {cyclesCount}
                </Text>
              </div>
              {cycle === activeCycle && !redirectToDoc ? (
                <div className="flex justify-between items-center gap-2">
                  <Button
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
                    onClick={() => {
                      setRedirectToDoc(true);
                    }}
                  >
                    Document
                  </Button>
                  <Link
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
                    to="/order"
                  >
                    Modify Order
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
            {redirectToDoc && cycle === activeCycle ? (
              <CycleDocument
                cycle={cycle}
                toggle={() => setRedirectToDoc(false)}
              />
            ) : (
              <CycleDetails cycle={cycle} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
