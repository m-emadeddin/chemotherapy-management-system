import React, { useState, useEffect } from "react";

const ChemotherapyTable = ({ cycle, id }) => {
  const [chemotherapy, setChemotherapy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/chemotherapy/${id}/cycle/${cycle}`
        );
        const data = await response.json();
        console.log(data);
        if (data) {
          const chemotherapyResponse = data.chemotherapyMedications;
          if (chemotherapyResponse) {
            setChemotherapy(Object.values(chemotherapyResponse));
          } else {
            console.error(
              "ChemoTherapy Medications not found for cycle",
              cycle
            );
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
          <div className="w-[15%] p-[19px]">Medication</div>
          <div className="w-[15%] p-[19px]">Dose</div>
          <div className="w-[15%] p-[19px]">Route</div>
          <div className="w-[30%] p-[19px]">Instructions</div>
          <div className="w-[20%] p-[19px]">Administered dose</div>
        </div>
        {chemotherapy.map((chemo) => {
          return (
            <div className="flex w-full border-t-[1px] border-gray-800">
              <div className="w-[15%] p-[19px]">{chemo.name}</div>
              <div className="w-[15%] p-[19px] flex justify-between items-center">
                {chemo.dose}
                {chemo.route === "Oral" ? "Miligram" : "MiliLiter"}
                {chemo.reduction > 0 ? (
                  <div className="bg-blue-500 p-1 text-white-A700 rounded">
                    -{chemo.reduction}%
                  </div>
                ) : null}
              </div>

              <div className="w-[15%] p-[19px]">{chemo.route}</div>
              <div className="w-[30%] p-[19px]">{chemo.Instructions}</div>
              <div className="w-[20%] p-[19px]">
                {chemo.route === "Oral"
                  ? `${chemo.administeredDoseMg}Miligram`
                  : `${chemo.administeredDoseMl}MiliLiter`}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { ChemotherapyTable };
