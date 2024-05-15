import React from "react";
import { Text, PremedicationsTable, ChemotherapyTable } from "./..";

const CycleDetails = ({ id, cycle, cycleNote }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className="uppercase md:ml-0 p-[19px]">
          Premedications
        </Text>
        <div>
          <PremedicationsTable id={id} cycle={cycle}></PremedicationsTable>
        </div>
      </div>
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className=" uppercase md:ml-0 p-[19px]">
          Chemotherapy
        </Text>
        <div>
          <ChemotherapyTable id={id} cycle={cycle} />
        </div>
      </div>
      {cycleNote && (
        <div className="flex flex-col p-[19px] gap-5">
          <Text size="md" style={{ fontWeight: "bold" }}>
            Physician notes
          </Text>
          <Text>{cycleNote}</Text>
        </div>
      )}
    </div>
  );
};
export { CycleDetails };
