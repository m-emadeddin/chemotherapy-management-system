import React, { useState, useEffect } from "react";
import { Text, Button, TextArea, Input } from "./..";

const CycleDocument = ({ Submit, Cancel, cycle }) => {
  const id = 1;
  const [doseinput, setDoseInput] = useState([]);
  const [cycleNote, setCycleNote] = useState({});
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

  const handleDoseInput = (event, route) => {
    const { name, value } = event;
    setDoseInput((prevDoseInput) =>
      prevDoseInput.filter((medication) => medication.name !== name)
    );
    setDoseInput((prevDoseInput) => [
      ...prevDoseInput,
      {
        name: name,
        [`Administered_Dose_${route === "Oral" ? "mg" : "ml"}`]: value,
      },
    ]);
  };

  const handleNoteInput = (input) => {
    setCycleNote(input);
  };

  const handleSubmit = () => {
    Submit();
    const data = {
      id: { id },
      cycle: { cycle },
      chemotherapyMedications: doseinput,
      cycle_note: { cycleNote },
    };
    sendData(data);
  };

  const sendData = async (data) => {
    console.log(data);
    try {
      const response = await fetch("Wating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
      } else {
        console.error("Failed to submit:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
                    {chemo.dose}
                    {chemo.route === "Oral" ? "Milligram" : "Milliliter"}
                  </Text>
                </div>
                <div className="flex w-[40%] items-center justify-between gap-5 sm:w-full">
                  <div className="flex w-[42%] flex-col items-center gap-2">
                    <Text size="xs" as="p">
                      {chemo.route === "Oral" ? "mg" : "ml"}
                    </Text>
                    <Input
                      className="p-1"
                      shape="round"
                      name={chemo.name}
                      value=""
                      inputProps={{ className: "text-center" }}
                      onChange={(event) => handleDoseInput(event, chemo.route)}
                    />
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-800" />
            </>
          );
        })}
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
          onChange={handleNoteInput}
        />
      </div>

      {/* submission controls section */}
      <div className=" flex gap-[15px] self-center items-center">
        <Button
          className="h-[80%] py-[15px] px-[50px] flex items-center justify-center rounded-[20px] bg-blue-500 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
          size="sm"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          size="sm"
          className="h-[80%] py-[15px] px-[50px] flex items-center justify-center rounded-[20px] bg-gray-600 text-white-A700 border-2 border-transparent-0 transition-all duration-300 hover:bg-white-A700  hover:border-black-900 hover:text-black-900"
          onClick={() => {
            Cancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export { CycleDocument };
