import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./style.css";
import { useEffect, useState } from "react";
import DatePopUp from "components/DatePopUp/DatePopUp";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";

export let date;
export let setDate;
export default function Date() {
  const { setStartDate, setDateValue, dateValue } = useRegimenDetails();
  [date, setDate] = useState(null);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);
  const [patientsNumber, setPatientsNumber] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [showDatePopUp, setShowDatePopUp] = useState(false);

  const formatWithLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const formattedMonth = formatWithLeadingZero(month);
  const formattedDay = formatWithLeadingZero(day);
  const startDate = `${year}-${formattedMonth}-${formattedDay}`;

  useEffect(() => {
    if (!dateValue) {
      if (date !== null) {
        setYear(date.$y);
        setMonth(date.$M + 1);
        setDay(date.$D);
        setIsFetching(true);
        axios
          .get(`/order/patient-no/${startDate}`)
          .then((res) => {
            setPatientsNumber(res.data.patientsNumber);
            setIsFetching(false);
            setTimeout(() => {
              setShowDatePopUp(true);
            }, 800);
          })
          .catch((err) => {
            console.log("Error in fetching patientsNumber", err);
            setIsFetching(false);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, year, month, day, date]);

  const handleConfirmDate = () => {
    setStartDate(startDate);
    setShowDatePopUp(false);
    setDateValue(date);
  };

  const clearDate = () => {
    setDate(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Choose Date"
        views={["year", "month", "day"]}
        value={date}
        format="DD/MM/YYYY"
        onChange={(newValue) => setDate(newValue)}
      />
      {isFetching ? (
        <Loader />
      ) : (
        showDatePopUp && (
          <DatePopUp
            onClose={() => setShowDatePopUp(false)}
            onConfirm={handleConfirmDate}
            clearDate={clearDate}
            patientsNumber={patientsNumber}
          />
        )
      )}
    </LocalizationProvider>
  );
}
