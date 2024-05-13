import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./style.css";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import DatePopUp from "components/DatePopUp/DatePopUp";

export default function Date() {
  const [date, setDate] = useState(null);
  const [showDatePopUp, setShowDatePopUp] = useState(false);

  useEffect(() => {
    if (date !== null) {
      setShowDatePopUp(true);
    }
  }, [date]);

  const handleConfirmDate = () => {
    setShowDatePopUp(false);
    console.log(date?.$D, date?.$M + 1, date?.$y);
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
        />
      )}
    </LocalizationProvider>
  );
}
