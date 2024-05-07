import React, { useState, useEffect } from "react";
import { Text, Button } from "../../components";
import { useLocation } from "react-router-dom";
import { TextArea, Input } from "../../components";

const CycleDocument = ({ toggle }) => {
  const location = useLocation();
  const id = 1;
  const activeCycle = 1;
  const { cycle } = location.state || { cycle: activeCycle };
  const handleToggle = () => {
    toggle();
  };
  const [chemotherapy, setChemotherapy] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/chemotherapy/${id}`
        );
        const data = await response.json();
        if (data && data.cycles) {
          const chemotherapyResponse = data.cycles.find(
            (item) => item.cycleNumber === cycle
          )?.chemotherapyMedications;
          if (chemotherapyResponse) {
            setChemotherapy(Object.values(chemotherapyResponse));
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
    <div className="flex flex-col p-[19px] gap-[25px]">
      <Text as="p" style={{ fontWeight: "bold" }}>
        Please record the dosage given to the patient
      </Text>
      <div className="flex flex-col gap-[15px] w-[60%] px-[20px]">
        {/* dosage entry section prednisone */}
        {chemotherapy.map((chemo) => {
          return (
            <>
              <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                  <Text size="md" as="p" className="uppercase">
                    {chemo.name}
                  </Text>
                  <Text size="xs" as="p" className="text-gray-700">
                    750Milligram per square meter
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      mg
                    </Text>
                    <Input
                      className="p-1"
                      shape="round"
                      name="edittext"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                  <div className="flex w-[42%] flex-col items-center gap-[11px]">
                    <Text size="xs" as="p">
                      ml
                    </Text>
                    <Input
                      className="p-1 text-center"
                      shape="round"
                      name="edittext_one"
                      inputProps={{ className: "text-center" }}
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-800" />
            </>
          );
        })}

        {/*  */}
      </div>
      <div className="flex flex-col gap-5">
        <Text as="p" style={{ fontWeight: "bold" }}>
          Cycle summary notes
        </Text>
        <TextArea
          shape="round"
          name="groupthree"
          placeholder={`Type your summary here...`}
          className=" self-stretch !border-black-900 text-gray-600 sm:pb-5 sm:pr-5"
        />
      </div>

      {/* submission controls section */}
      <div className=" flex gap-[15px] self-center items-center">
        <Button
          className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
          size="sm"
          onClick={handleToggle}
        >
          Submit
        </Button>
        <Button
          size="sm"
          className="h-[80%] p-5 flex items-center justify-center rounded-[20px] bg-gray-600 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
          onClick={handleToggle}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CycleDocument;
