import { Button, Img } from "components";
import { Link } from "react-router-dom";
import "../PatientInfo/patientinfo.css";

export default function PatientTable({ patient, onClickMap, onDeleteClick }) {
  return (
    <div className="info-data-container flex w-[90%] justify-between">
      <Link
        to={"/patient"}
        state={{ selectedPatient: patient }}
        className="w-[85%] flex justify-between items-center"
      >
        <div className="w-[20%]">
          <div className="name">{patient.Name}</div>
          <div className="age">{patient.Age} years old</div>
        </div>
        <div className="info w-[20%]">{patient.Patient_ID}</div>
        <div className="info w-[20%]">{patient.Gender}</div>
        <div className="info w-[20%]">{patient.disease_type}</div>
        <div className="info w-[20%]">{patient.mobile}</div>
      </Link>
      <div className="flex items-center">
        <Button
          size="md"
          shape="circle"
          className="action-button"
          onClick={onDeleteClick}
        >
          <Img src="images/img_thumbs_up.svg" />
        </Button>
        <Button
          size="md"
          shape="circle"
          className="action-button"
          onClick={onClickMap}
        >
          <Img src="images/img_map.svg" />
        </Button>
      </div>
    </div>
  );
}
