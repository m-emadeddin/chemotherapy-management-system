import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./style.css";
import { useEffect, useState } from "react";
import DatePopUp from "components/DatePopUp/DatePopUp";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { useRegimenDetails } from "contexts/RegimenDetailsContext ";
import { useAuth } from "contexts/AuthContext";

export let date;
export let setDate;

export default function DateComponent() {
  const auth = useAuth();
  const { setStartDate, setDateValue, dateValue } = useRegimenDetails();
  const [showDatePopUp, setShowDatePopUp] = useState(false);
  [date, setDate] = useState(dayjs(null));
  const [patientsNumber, setPatientsNumber] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (date && date.isValid() && !date.isSame(dateValue)) {
      setIsFetching(true);
      const startDate = date.format('YYYY-MM-DD');
      axios
        .get(`/order/patient-no/${startDate}`, {
          headers: {
            Authorization: `Bearer ${auth.userToken}`,
          },
        })
        .then((res) => {
          setPatientsNumber(res.data.patientsNumber);
          setTimeout(() => {
            setShowDatePopUp(true);
            setIsFetching(false);
          }, 1000);
        })
        .catch((err) => {
          console.log("Error in fetching patientsNumber", err);
          setIsFetching(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, dateValue]);

  const handleConfirmDate = () => {
    if (date && date.isValid()) {
      const startDate = date.format('YYYY-MM-DD');
      setStartDate(startDate);
      setDateValue(date);
      setShowDatePopUp(false);
    }
  };

  const clearDate = () => {
    setDate(dayjs(null));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Choose Date"
        views={["year", "month", "day"]}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        disablePast
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
