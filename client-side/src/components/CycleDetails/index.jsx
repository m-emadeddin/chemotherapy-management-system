import React, { useState, useEffect } from "react";
import { Text, PremedicationsTable, ChemotherapyTable } from "./..";

const CycleDetails = ({ cycle }) => {
  const id = 1;
  const [cycleNote, setCycleNote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`Waiting../${id}`);
        const data = await response.json();
        console.log(data);

        // setCycleNote();
      } catch (error) {
        console.error("Error fetching cycle note:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className="uppercase md:ml-0 p-[19px]">
          Premedications
        </Text>
        <div>
          <PremedicationsTable cycle={cycle} id={id}></PremedicationsTable>
        </div>
      </div>
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className=" uppercase md:ml-0 p-[19px]">
          Chemotherapy
        </Text>
        <div>
          <ChemotherapyTable cycle={cycle} id={id} />
        </div>
      </div>
      {cycleNote && (
        <div className="flex flex-col p-[19px] gap-5">
          <Text size="md" style={{ fontWeight: "bold" }}>
            Physician notes
          </Text>
          <Text>Dose reduced Doxorubicin because patient has weak heart</Text>
        </div>
      )}
    </div>
  );
};
export { CycleDetails };
