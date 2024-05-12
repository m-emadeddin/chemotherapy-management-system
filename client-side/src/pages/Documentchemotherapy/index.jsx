import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Text,
  Button,
  Heading,
  CycleDetails,
  CycleDocument,
  DocumentChemotherapyCycle,
} from "../../components";

export default function DocumentchemotherapyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = 1;
  const [activeCycle, setActiveCycle] = useState(1);
  const [activeCycleID, setActiveCycleID] = useState(1);
  const [cyclesCount, setCyclesCount] = useState(1);
  const [regimenName, setRegimenName] = useState("");
  const [redirectToDoc, setRedirectToDoc] = useState(false);
  const [dates, setDates] = useState({});
  const [cycle, setCycle] = useState(
    activeCycle || cyclesCount || location.state.cycle
  );
  const [cycleID, setCycleID] = useState(activeCycleID);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/active-cycle/${id}`
        );
        const data = await response.json();
        console.log(data);
        setActiveCycle(data.activeCycleNumber);
        setActiveCycleID(data.activeCycleId);
      } catch (error) {
        console.error("Error fetching Active Cycle:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/Regimen-info/${id}`
        );
        const data = await response.json();
        setCyclesCount(data.cycleCount);
        setRegimenName(data.regimenName);
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy//cycles_info/${id}`
        );

        const data = await response.json();
        console.log(data);
        const extractedDates = {};
        for (const key in data.cycles) {
          const obj = data.cycles[key];
          extractedDates[obj.cycle_id] = obj.documentation_date;
        }
        setDates(extractedDates);
        const cycles_info = data.cycles.find(
          (cycle) => cycle.cycle_id === cycleID
        );
      } catch (error) {
        console.error("Error fetching cycle count:", error);
      }
    };
    fetchData();
  }, [id, activeCycle]);

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
            dates={dates}
            handleNavigation={(c) => {
              setCycle(c);
            }}
          />
        </div>
        <div className="m-[30px] w-[81%] flex flex-1 flex-col gap-[30px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center justify-between p-[19px] md:flex-col">
              <div className="flex flex-col items-start gap-3.5 lg:w-[55%] md:items-center ">
                <Heading as="h1">{regimenName}</Heading>
                <Text size="xs" as="p">
                  Cycle {cycle} of {cyclesCount}
                </Text>
              </div>
              {cycle === activeCycle && !redirectToDoc ? (
                <div className="flex justify-between items-center gap-2">
                  <Button
                    size="xl"
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      setRedirectToDoc(true);
                    }}
                  >
                    Document
                  </Button>
                  <Button
                    size="xl"
                    className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-base text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      navigate("/order");
                    }}
                  >
                    Modify Order
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            {redirectToDoc && cycle === activeCycle ? (
              <CycleDocument
                cycle={cycleID}
                Submit={() => {
                  setRedirectToDoc(false);
                  setActiveCycle(activeCycle + 1);
                }}
                Cancel={() => {
                  setRedirectToDoc(false);
                }}
              />
            ) : (
              <CycleDetails cycle={cycleID} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
