import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./style.css";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import DatePopUp from "components/DatePopUp/DatePopUp";
import axios from "axios";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";

export default function Date() {
  const { setStartDate } = useRegimenDetails();

  const [date, setDate] = useState(null);
  const [showDatePopUp, setShowDatePopUp] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [patientsNumber, setPatientsNumber] = useState(null);
  const startDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (date !== null) {
      setShowDatePopUp(true);
    }
  }, [date?.$D]);

  useEffect(() => {
    if (date !== null) {
      setYear(date.$y);
      setMonth(date.$M + 1);
      setDay(date.$D);
      axios
        .get(`/order/patient-no/${startDate}`)
        .then((res) => {
          setPatientsNumber(res.data.patientsNumber);
          setStartDate(startDate);
        })
        .catch((err) => {
          console.log("Error in fetching patientsNumber", err);
        });
    }
  }, [date, startDate, year, month, day, setStartDate]);
  const handleConfirmDate = () => {
    setShowDatePopUp(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Choose Date"
        views={["month", "year", "day"]}
        value={date}
        format="DD/MM/YYYY"
        onChange={(newValue) => setDate(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      {showDatePopUp && (
        <DatePopUp
          onClose={() => setShowDatePopUp(false)}
          onConfirm={handleConfirmDate}
          patientsNumber={patientsNumber}
        />
      )}
    </LocalizationProvider>
  );
}
