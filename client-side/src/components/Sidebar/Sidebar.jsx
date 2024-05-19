import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import PatientTable from "components/PatientTable";
import PatientInfo from "components/PatientInfo";

import {
  Button,
  Img,
} from "../";
import { set } from "date-fns";

const Sidebar = ({onTabChange}) => {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    
  }, [tab]);

  const handleSetTab = (value) => {
    setTab(value == "not-found" ? "all" : value);
    onTabChange(value);
  };

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
                className={`w-full flex !justify-start gap-5 hover:bg-blue-100 ${
                  tab === "all" ? "bg-gray-200" : ""
                }`}
                size="sm"
                shape="round"
                onClick={() => handleSetTab("all")}
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
                className={`w-full flex !justify-start gap-5 hover:bg-blue-100 ${
                  tab === "active" ? "bg-gray-200" : ""
                }`}
                size="sm"
                shape="round"
                onClick={() => handleSetTab("active")}
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
                className={`w-full flex !justify-start gap-5 hover:bg-blue-100 ${
                  tab === "non-active" ? "bg-gray-200" : ""
                }`}
                size="sm"
                shape="round"
                onClick={() => handleSetTab("non-active")}
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
                onClick={() => handleSetTab("not-found")}
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
              <Button
                className="w-full  flex !justify-start gap-5 hover:bg-blue-100"
                size="sm"
                shape="round"
                onClick={() => handleSetTab("not-found")}
                leftIcon={
                  <Img
                    src="/images/high-risk.svg"
                    alt="arrow_left"
                    className="h-[14px] w-[14px]"
                  />
                }
              >
                {!expanded && <div>Reports & Schedule</div>}
              </Button>
            </>
          }
        </div>

        <div className="bg-white-A700 absolute top-5 rounded-full p-2 right-[-18px] border-gray-100 border border-4 hover:bg-blue-100">
          <Button
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            <Img
              // className={"absolute top-5"}
              src={`/images/chevron-${expanded ? "right" : "left"}.svg`}
            ></Img>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
