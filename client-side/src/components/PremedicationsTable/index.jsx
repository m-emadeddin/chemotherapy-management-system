import React, { useState, useEffect } from "react";

const PremedicationsTable = ({ cycle }) => {
  const [premedications, setPremedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/premedications/${cycle}`
        );
        const { Premedications } = await response.json();
        setPremedications(Premedications);
        console.log("Premedications Fetched Successfully");
      } catch (error) {
        console.error("Error fetching Premedications:", error);
      }
    };

    fetchData();
  }, [cycle]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex text-gray-600 w-full border-t-[1px] border-gray-800">
          <div className="w-[15%] p-[19px]">Medication</div>
          <div className="w-[15%] p-[19px]">Dose</div>
          <div className="w-[15%] p-[19px]">Route</div>
          <div className="w-[30%] p-[19px]">Instructions</div>
        </div>

        {premedications.map((premedication) => {
          return (
            <div
              key={premedication.Premed_ID}
              className="flex w-full border-t-[1px] border-gray-800"
            >
              <div className="w-[15%] p-[19px]">{premedication.Medication}</div>
              <div className="w-[15%] p-[19px]">
                {premedication.Dose}
                {premedication.Route === "Oral" ? " Miligram" : " Milliliter"}
              </div>
              <div className="w-[15%] p-[19px]">{premedication.Route}</div>
              <div className="w-[30%] p-[19px]">
                {premedication.Instructions}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { PremedicationsTable };
