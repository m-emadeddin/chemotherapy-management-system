import React, { useState, useEffect } from "react";

const ChemotherapyTable = ({ cycle }) => {
  const [chemotherapy, setChemotherapy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/document-chemotherapy/chemotherapy/${cycle}`
        );
        const { Chemotherapy_Medications } = await response.json();
        setChemotherapy(Chemotherapy_Medications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [cycle]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex text-gray-600 w-full border-t-[1px] border-gray-800">
          <div className="w-[20%] p-[19px]">Medication</div>
          <div className="w-[15%] p-[19px]">Dose</div>
          <div className="w-[15%] p-[19px]">Route</div>
          <div className="w-[32%] p-[19px]">Instructions</div>
          <div className="w-[18%] p-[19px]">Administered dose</div>
        </div>
        {chemotherapy.map((chemo) => {
          return (
            <div
              key={chemo.Chemotherapy_id}
              className="flex w-full border-t-[1px] border-gray-800"
            >
              <div className="w-[20%] p-[19px]">{chemo.Name.toUpperCase()}</div>
              <div className="w-[15%] p-[19px] flex justify-between">
                {chemo.Route.toLowerCase() === "oral"
                  ? `${chemo.Dose} Miligram`
                  : `${chemo.Dose} MiliLiter`}
                {chemo.Reduction > 0 ? (
                  <div className="bg-blue-500 p-1 text-white-A700 rounded">
                    -{chemo.Reduction}%
                  </div>
                ) : null}
              </div>
              <div className="w-[15%] p-[19px]">
                {chemo.Route[0].toUpperCase() + chemo.Route.slice(1)}
              </div>
              <div className="w-[32%] p-[19px]">{chemo.Instructions}</div>
              <div className="w-[18%] p-[19px]">
                {chemo.AdministeredDose_Mg !== null &&
                chemo.Route.toLowerCase() === "oral"
                  ? `${chemo.AdministeredDose_Mg} Milligram`
                  : chemo.AdministeredDose_Ml !== null &&
                    `${chemo.AdministeredDose_Ml} Milliliter`}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { ChemotherapyTable };
