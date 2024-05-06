import { Button, Img } from "components";
import { Link } from "react-router-dom";
import "../PatientInfo/patientinfo.css";

export default function PatientTable({ patient, onClickMap }) {
  return (
    <div className="info-data-container flex w-[90%] justify-between">
      <Link
        to={"/patient"}
        state={{ selectedPatient: patient }}
        className="w-[85%] flex justify-between "
      >
        <div className="w-[26%]">
          <div className="name">{patient.name}</div>
          <div className="age">{patient.age} years old</div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="info w-[10%]">{patient.id}</div>
          <div className="info w-[14%]">{patient.gender}</div>
          <div className="info w-[20%]">{patient.diseaseType}</div>
          <div className="info w-[10%]">{patient.phoneNumber}</div>
        </div>
      </Link>
      <div className="flex items-center">
        <Button size="md" shape="circle" className="action-button">
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
