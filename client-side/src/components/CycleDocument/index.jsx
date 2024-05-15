import React, { useState, useEffect } from "react";
import { Text, Button, TextArea, Input } from "./..";
import toast, { Toaster } from "react-hot-toast";

const CycleDocument = ({ id, cycle, Submit, Cancel }) => {
  const [doseinput, setDoseInput] = useState([]);
  const [chemotherapy, setChemotherapy] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [symptomsSubmission, setSymptomsSubmission] = useState(false);
  const [cycleSubmission, setCycleSubmission] = useState(false);

  const [cycleNote, setCycleNote] = useState("");
  const [selectedValues, setSelectedValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `document-chemotherapy/chemotherapy/${cycle}`
        );
        const { Chemotherapy_Medications } = await response.json();
        setChemotherapy(Chemotherapy_Medications);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [cycle, id]);

  const handleDoseInput = (event, id, route) => {
    setDoseInput((prevDoseInput) =>
      prevDoseInput.filter((medication) => medication.ID !== id)
    );
    setDoseInput((prevDoseInput) => [
      ...prevDoseInput,
      {
        ID: id,
        [`AdministeredDose_${route === "Oral" ? "Mg" : "Ml"}`]: event,
        [`AdministeredDose_${route === "Oral" ? "Ml" : "Mg"}`]: "",
      },
    ]);
  };

  const handleNoteInput = (input) => {
    setCycleNote(input);
  };

  const handleSideEffectsInput = (val, name) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const cycleData = {
      Cycle_Documentation_Date: new Date().toLocaleDateString("en-GB"),
      Medications: doseinput,
      Cycle_Note: cycleNote,
    };
    sendSymptomsData(selectedValues);
    sendCycleData(cycleData);
  };
  useEffect(() => {
    if (symptomsSubmission && cycleSubmission) {
      Submit();
    }
  }, [symptomsSubmission, cycleSubmission]);

  const sendCycleData = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(
        `document-chemotherapy/cycles-updates/${cycle}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Cycle Updates Sent Successfully");
        setSymptomsSubmission(true);
      } else {
        console.error("Failed to submit:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendSymptomsData = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`patient/add-side-effects/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Patient Symptoms Sent Successfully");
        setCycleSubmission(true);
      } else {
        console.error("Failed to submit:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const possibleValues = ["High", "Moderate", "Low"];
  const symptoms = [
    { name: "Nausea", value: possibleValues },
    { name: "Loss of appetite", value: possibleValues },
    { name: "Hair loss", value: possibleValues },
    {
      name: "Gastrointestinal disturbances",
      value: possibleValues,
    },
    { name: "Loss of memory", value: possibleValues },
    { name: "Skin change", value: possibleValues },
    { name: "Blood cell loss", value: possibleValues },
    { name: "Psychological effects", value: possibleValues },
    {
      name: "Changes in kidney and liver function",
      value: possibleValues,
    },
  ];

  return (
    <div className="flex flex-col p-[19px] gap-[25px]">
      <div className="flex">
        <div className="flex flex-col w-[50%] gap-[15px] px-[20px]">
          <Toaster />
          <Text as="p" style={{ fontWeight: "bold" }}>
            Please record the side effects to the patient
          </Text>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="w-[55%]"></div>
              <div className="w-[45%] flex justify-evenly">
                <Text>High</Text>
                <Text>Moderate</Text>
                <Text>Low</Text>
              </div>
            </div>
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-2 border-gray-800 p-2 rounded-md container"
              >
                <Text className="w-[55%]">{symptom.name}</Text>
                <div className="w-[45%] flex justify-evenly">
                  {symptom.value.map((val, idx) => (
                    <Input
                      key={idx}
                      type="radio"
                      className="w-[20%] bg-transparent-0 h-[15px]"
                      name={symptom.name.replace(/\s+/g, "")}
                      inputProps={{ value: val }}
                      onChange={() =>
                        handleSideEffectsInput(
                          val,
                          symptom.name.replace(/\s+/g, "_")
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full bg-gray-800 w-[1px]"></div>
        <div className="flex flex-col gap-[15px] w-[50%] px-[20px]">
          <Text as="p" style={{ fontWeight: "bold" }}>
            Please record the dosage given to the patient
          </Text>
          {chemotherapy.map((chemo) => {
            return (
              <div
                key={chemo.Chemotherapy_id}
                className="flex flex-col gap-[15px]"
              >
                <div className=" flex items-center justify-between gap-5 md:ml-0 md:w-full">
                  <div className="mb-[5px] flex flex-col items-start gap-[9px] self-end">
                    <Text size="md" as="p" className="uppercase">
                      {chemo.Name}
                    </Text>
                    <Text size="xs" as="p" className="text-gray-700">
                      {chemo.Route === "Oral"
                        ? `${chemo.Dose} Miligram`
                        : `${chemo.Dose} MiliLiter`}
                    </Text>
                  </div>
                  <div className="flex w-[40%] items-center justify-end gap-5 sm:w-full">
                    <div className="flex w-[42%] flex-col items-center gap-2">
                      <Text size="xs" as="p">
                        {chemo.Route === "Oral" ? "mg" : "ml"}
                      </Text>
                      <Input
                        className="p-1 border hover:border-black-900"
                        autocomplete="off"
                        shape="round"
                        name={chemo.Name}
                        value={chemo.Name}
                        inputProps={{ className: "text-center" }}
                        onChange={(event) =>
                          handleDoseInput(
                            event,
                            chemo.Chemotherapy_id,
                            chemo.Route
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="h-px bg-gray-800" />
              </div>
            );
          })}
        </div>
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
          {isSubmitting ? "Submitting ..." : "Submit"}
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
