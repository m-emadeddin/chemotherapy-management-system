import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import {
  Text,
  Button,
  Heading,
  CycleDetails,
  CycleDocument,
  DocumentChemotherapyCycle,
  WarningPopUp,
} from "../../components";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";

export default function DocumentchemotherapyPage() {
  const navigate = useNavigate();
  const { selectedPatientInfo } = useSelectedPatientInfo();
  const id = selectedPatientInfo.Patient_ID;

  const [cycleID, setCycleID] = useState(1);
  const [activeCycle, setActiveCycle] = useState(1);
  const [cyclesCount, setCyclesCount] = useState(1);
  const [cycle, setCycle] = useState(1);

  const [regimenName, setRegimenName] = useState("");
  const [cycleNote, setCycleNote] = useState("");

  const [dates, setDates] = useState({});

  const [redirectToDoc, setRedirectToDoc] = useState(false);
  const [showWarningPopup, setShowWarningPopup] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      fetch(`/document-chemotherapy/active-cycle/${id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.exists) {
            setActiveCycle(data.Active_Cycle_Number);
          } else {
            setActiveCycle(0);
          }
          console.log("Active Cycle Fetched Successfully");
        })
        .catch((error) => {
          console.error("Error fetching Active Cycle:", error);
        });
    };
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [id, redirectToDoc]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/document-chemotherapy/regimen-info/${id}`
        );
        const data = await response.json();
        setCyclesCount(data.Cycle_Count);
        setRegimenName(data.Regimen_Name);
        console.log("Regimen Info Fetched Successfully");
      } catch (error) {
        console.error("Error fetching Regimen-info:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/document-chemotherapy/cycles-info/${id}`
        );

        const { Cycles } = await response.json();
        extractDates(Cycles);

        const cycle_info = Cycles.find((c) => c.Cycle_Number === cycle);
        setCycleID(cycle_info.Cycle_ID);
        setCycleNote(cycle_info.Cycle_Note);

        console.log("Cycles Info Fetched Successfully");
      } catch (error) {
        console.error("Error fetching Cycles info:", error);
      }
    };
    fetchData();
  }, [id, cycle, activeCycle]);

  const extractDates = (cyclesInfo) => {
    const extractedDates = {};
    for (const key in cyclesInfo) {
      const obj = cyclesInfo[key];
      extractedDates[obj.Cycle_Number] = new Date(
        obj.Documentation_Date
      ).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    setDates(extractedDates);
  };

  const toggleWarningPopup = () => {
    setShowWarningPopup(!showWarningPopup);
  };

  return (
    <>
      <Helmet>
        <title>Oncology MS</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
      </Helmet>
      <div className="mx-auto flex w-full max-w-[1321px] flex-col gap-[30px] md:p-5 mt-[100px]">
        <div className="flex w-[19%] flex-col items-start bg-white-A700 absolute top-[55px] left-0 h-full">
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
        <div className="w-[81%] flex flex-col gap-[30px] self-end">
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-between md:flex-col">
              <div className="flex flex-col items-start gap-3.5 lg:w-[55%] md:items-center p-2">
                <Heading as="h1">{regimenName}</Heading>
                <Text size="xs" as="p">
                  Cycle {cycle} of {cyclesCount}
                </Text>
              </div>
              {cycle === activeCycle && !redirectToDoc ? (
                <div className="flex justify-between gap-2">
                  <Button
                    size="xl"
                    className="p-5 flex justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      setRedirectToDoc(true);
                    }}
                  >
                    Document
                  </Button>
                  <Button
                    size="xl"
                    className="p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-base text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      setShowWarningPopup(true);
                    }}
                  >
                    Modify Order
                  </Button>
                </div>
              ) : (
                ""
              )}
              {cycle !== activeCycle && !redirectToDoc ? (
                <div className="flex justify-between gap-2">
                  <Button
                    size="xl"
                    className="p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      navigate(`/patient/${id}`);
                    }}
                  >
                    Go to patient page
                  </Button>
                  <Button
                    size="xl"
                    className="p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700 hover:border-black-900 hover:text-black-900 p-[15px]"
                    onClick={() => {
                      navigate("/dashboard");
                    }}
                  >
                    Go to dashboard
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            {redirectToDoc && cycle === activeCycle ? (
              <CycleDocument
                id={id}
                cycle={cycleID}
                Submit={() => {
                  setRedirectToDoc(false);
                }}
                Cancel={() => {
                  setRedirectToDoc(false);
                }}
              />
            ) : (
              <CycleDetails id={id} cycle={cycleID} cycleNote={cycleNote} />
            )}
          </div>
        </div>
      </div>
      {showWarningPopup && (
        <WarningPopUp
          onClose={toggleWarningPopup}
          message={"This feature isn't available yet"}
        />
      )}
    </>
  );
}
