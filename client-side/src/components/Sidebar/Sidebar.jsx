import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PatientTable from "components/PatientTable";
import PatientInfo from "components/PatientInfo";

import {
  Text,
  Button,
  Heading,
  CycleDetails,
  CycleDocument,
  DocumentChemotherapyCycle,
  WarningPopUp,
  Img,
} from "../";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";

const Sidebar = () => {
    
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {}, [expanded]);

  return (
    <div>
        <div
          className={`${
            expanded ? "w-[5%]" : "w-[19%]"
          } flex flex-col bg-white-A700 absolute top-[55px] left-0 h-full`}
        >
      <div className="w-full flex flex-col items-center gap-2 p-2">
            {
              <>
                <Button
                  className="w-full flex !justify-start gap-5 hover:bg-blue-100"
                  size="sm"
                  shape="round"
                  leftIcon={
                    <Img
                      src="/images/user-group.svg"
                      alt="arrow_left"
                      className="h-[14px] w-[14px]"
                    />
                  }
                >
                  {!expanded && <div>All Patients</div>}
                </Button>
                <Button
                  className="w-full flex !justify-start gap-5 hover:bg-blue-100"
                  size="sm"
                  shape="round"
                  leftIcon={
                    <Img
                      src="/images/active-patients.svg"
                      alt="arrow_left"
                      className="h-[14px] w-[14px]"
                    />
                  }
                >
                  {!expanded && <div>Active Patients</div>}
                </Button>
                <Button
                  className="w-full flex !justify-start gap-5 hover:bg-blue-100"
                  size="sm"
                  shape="round"
                  leftIcon={
                    <Img
                      src="/images/non-active.svg"
                      alt="arrow_left"
                      className="h-[14px] w-[14px]"
                    />
                  }
                >
                  {!expanded && <div>Non-active Patients</div>}
                </Button>
                <Button
                  className="w-full  flex !justify-start gap-5 hover:bg-blue-100"
                  size="sm"
                  shape="round"
                  leftIcon={
                    <Img
                      src="/images/high-risk.svg"
                      alt="arrow_left"
                      className="h-[14px] w-[14px]"
                    />
                  }
                >
                  {!expanded && <div>High Risk Patients</div>}
                </Button>
              </>
            }
          </div>

          <Button
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <div className="bg-white-A700 absolute top-5 rounded-full p-2 right-[-18px] border-gray-100 border border-4">
              <Img
                // className={"absolute top-5"}
                src={`/images/chevron-${expanded ? "right" : "left"}.svg`}
              ></Img>
            </div>
          </Button>
    </div>
    </div>
  )
}

export default Sidebar
