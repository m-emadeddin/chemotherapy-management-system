import React, { useState, useEffect } from "react";
import { Text, PremedicationsTable, ChemotherapyTable } from "./..";

const CycleDetails = ({ cycle, cycleNote }) => {
  const id = 1;
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className="uppercase md:ml-0 p-[19px]">
          Premedications
        </Text>
        <div>
          <PremedicationsTable cycle={cycle}></PremedicationsTable>
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
