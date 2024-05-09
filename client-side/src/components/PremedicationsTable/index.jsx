import React, { useState, useEffect } from "react";

const PremedicationsTable = ({ cycle, id }) => {
  const [premedications, setPremedications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/document-chemotherapy/premedications/${id}`
        );
        const data = await response.json();
        if (data && data.cycles) {
          const premedicationsResponse = data.cycles.find(
            (item) => item.cycleNumber === cycle
          )?.premedications;
          if (premedicationsResponse) {
            setPremedications(Object.values(premedicationsResponse));
          } else {
            console.error("Premedications not found for cycle", cycle);
          }
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cycle, id]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex text-gray-600 w-full border-t-[1px] border-gray-800">
          <div className="w-[20%] p-[19px]">Medication</div>
          <div className="w-[10%] p-[19px]">Dose</div>
          <div className="w-[15%] p-[19px]">Route</div>
          <div className="w-[30%] p-[19px]">Instructions</div>
        </div>

        {premedications.map((premedication) => {
          return (
            <div className="flex w-full border-t-[1px] border-gray-800">
              <div className="w-[20%] p-[19px]">{premedication.Medication}</div>
              <div className="w-[10%] p-[19px]">{premedication.Dose}</div>
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

export default PremedicationsTable;