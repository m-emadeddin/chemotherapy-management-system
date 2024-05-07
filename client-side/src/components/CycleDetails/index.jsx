import React from "react";
import { Text } from "../../components";
import { useLocation } from "react-router-dom";
import PremedicationsTable from "../../components/PremedicationsTable";
import ChemotherapyTable from "../../components/ChemotherapyTable";

const CycleDetails = () => {
  console.log(2);
  const location = useLocation();
  const id = 1;
  const activeCycle = 1;
  const { cycle } = location.state || { cycle: activeCycle };
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col rounded-[20px] bg-white-A700 py-4">
        <Text size="md" as="p" className="uppercase md:ml-0 p-[19px]">
          Premedications
        </Text>
        <div className="h-px w-full self-stretch bg-blue_gray-100" />

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
      <div className="flex flex-col p-[19px] gap-5">
        <Text size="md" style={{ fontWeight: "bold" }}>
          Physician notes
        </Text>
        <Text>Dose reduced Doxorubicin because patient has weak heart</Text>
      </div>
    </div>
  );
};
export default CycleDetails;
