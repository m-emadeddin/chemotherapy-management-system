import React, { useState, useEffect } from "react";
import { Text, Button, TextArea, Input } from "./..";
import toast, { Toaster } from "react-hot-toast";
import { WarningPopUp } from "./..";

const CycleDocument = ({ id, cycle, Submit, Cancel }) => {
  const [doseinput, setDoseInput] = useState([]);
  const [chemotherapy, setChemotherapy] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [symptomsSubmission, setSymptomsSubmission] = useState(false);
  const [cycleSubmission, setCycleSubmission] = useState(false);
  const [cycleNote, setCycleNote] = useState("");
  const [WarningMessage, setWarningMessage] = useState("");
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const possibleValues = ["High", "Moderate", "Low"];
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    Nausea: "",
    Loss_of_appetite: "",
    Hair_loss: "",
    Gastrointestinal_disturbances: "",
    Loss_of_memory: "",
    Skin_change: "",
    Blood_cell_loss: "",
    Psychological_effects: "",
    Changes_in_kidney_and_liver_function: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/document-chemotherapy/chemotherapy/${cycle}`
        );
        const { Chemotherapy_Medications } = await response.json();
        setChemotherapy(Chemotherapy_Medications);
        Chemotherapy_Medications.forEach((medication) => {
          setDoseInput((prevState) => [
            ...prevState,
            {
              ID: medication.Chemotherapy_id,
              [`AdministeredDose_${
                medication.Route.toLowerCase() === "oral" ? "Mg" : "Ml"
              }`]: "",
              [`AdministeredDose_${
                medication.Route.toLowerCase() === "oral" ? "Ml" : "Mg"
              }`]: "",
            },
          ]);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cycle, id]);

  const handleDoseInput = (event, id, route) => {
    console.log(id);
    setDoseInput((prevDoseInput) =>
      prevDoseInput.filter((medication) => medication.ID !== id)
    );
    console.log(doseinput);
    setDoseInput((prevDoseInput) => [
      ...prevDoseInput,
      {
        ID: id,
        [`AdministeredDose_${route.toLowerCase() === "oral" ? "Mg" : "Ml"}`]:
          event,
        [`AdministeredDose_${route.toLowerCase() === "oral" ? "Ml" : "Mg"}`]:
          "",
      },
    ]);
  };

  const handleNoteInput = (input) => {
    setCycleNote(input);
  };

  const handleSideEffectsInput = (val, name) => {
    setSelectedSymptoms((prevState) => ({
      ...prevState,
      [name]: val,
    }));
  };

  const handleSubmit = () => {
    if (checkEmptySymptoms() || checkEmptyDose() || checkDoseInput()) {
      let message = "";
      if (checkEmptySymptoms()) {
        message = "Please fill all side effects";
      } else if (checkEmptyDose()) {
        message = "Please fill all administered doses";
      } else {
        message = "Administered dose should be positive";
      }

      setWarningMessage(message);
      setShowWarningPopup(true);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    const symptomsData = {
      ...selectedSymptoms,
      Cycle_Number: cycle,
      Date: new Date(),
    };

    const cycleData = {
      Cycle_ID: cycle,
      Cycle_Documentation_Date: new Date(),
      Medications: doseinput,
      Cycle_Note: cycleNote,
    };
    sendSymptomsData(symptomsData);
    sendCycleData(cycleData);
  };

  const checkEmptySymptoms = () => {
    return Object.values(selectedSymptoms).some((value) => value === "");
  };

  const checkEmptyDose = () => {
    for (const medication of doseinput) {
      if (
        medication.AdministeredDose_Mg === "" &&
        medication.AdministeredDose_Ml === ""
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDoseInput = () => {
    for (const medication of doseinput) {
      if (
        (medication.AdministeredDose_Mg !== "" &&
          medication.AdministeredDose_Mg < 0) ||
        (medication.AdministeredDose_Ml !== "" &&
          medication.AdministeredDose_Ml < 0)
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (symptomsSubmission && cycleSubmission) {
      Submit();
    }
  }, [symptomsSubmission, cycleSubmission, Submit]);

  const sendCycleData = async (data) => {
    try {
      const response = await fetch(
        `/document-chemotherapy/cycles-updates/${id}`,
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
    try {
      const response = await fetch(`/patient/add-side-effects/${id}`, {
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

  return (
    <div className="flex flex-col p-[10px] gap-[25px]">
      <div className="flex">
        <div className="flex flex-col w-[50%] gap-[15px] px-[20px]">
          <Toaster />
          <Text as="p" style={{ fontWeight: "bold" }}>
            Please record the side effects to the patient
          </Text>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="w-[60%]"></div>
              <div className="w-[40%] flex justify-evenly">
                <Text>High</Text>
                <Text>Moderate</Text>
                <Text>Low</Text>
              </div>
            </div>
            {Object.keys(selectedSymptoms).map((key, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-2 border-gray-800 p-2 rounded-md container"
              >
                <Text className="w-[60%]">{key.replace(/_/g, " ")}</Text>
                <div className="w-[40%] flex justify-evenly">
                  {possibleValues.map((val, idx) => (
                    <Input
                      key={idx}
                      type="radio"
                      className="w-[20%] bg-transparent-0 !h-[10px]"
                      name={key.replace(/\s+/g, "")}
                      inputProps={{ value: val }}
                      onChange={() =>
                        handleSideEffectsInput(val, key.replace(/\s+/g, "_"))
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
                      {chemo.Name.toUpperCase()}
                    </Text>
                    <Text size="xs" as="p" className="text-gray-700">
                      {chemo.Route.toLowerCase() === "oral"
                        ? `${chemo.Dose} Miligram`
                        : `${chemo.Dose} MiliLiter`}
                    </Text>
                  </div>
                  <div className="flex w-[40%] items-center justify-end gap-5 sm:w-full">
                    <div className="flex w-[42%] flex-col items-center gap-2">
                      <Text size="xs" as="p">
                        {chemo.Route.toLowerCase() === "oral" ? "mg" : "ml"}
                      </Text>
                      <Input
                        className="p-1 border hover:border-black-900"
                        autocomplete="off"
                        shape="round"
                        name={chemo.Name}
                        value={chemo.Name}
                        type="number"
                        inputProps={{ className: "text-center h-full" }}
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
      {showWarningPopup && (
        <WarningPopUp
          message={WarningMessage}
          onClose={() => {
            setShowWarningPopup(false);
          }}
        />
      )}
    </div>
  );
};
export { CycleDocument };
