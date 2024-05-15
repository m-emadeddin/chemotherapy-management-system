import { Button, Img } from "components";
import "../PatientInfo/patientinfo.css";
import { useNavigate } from "react-router-dom";
import { useSelectedPatientInfo } from "contexts/SelectedPatientInfoDetails";

export default function PatientTable({ patient, onClickMap, onDeleteClick }) {
  const navigate = useNavigate();
  const selectedPatientInfo = useSelectedPatientInfo();
  const handlePatientClick = () => {
    selectedPatientInfo.setSelectedPatientInfo(patient);
    navigate(`/patient/${patient.Patient_ID}`, {
      state: { selectedPatient: patient },
    });
  };
  return (
    <div className="info-data-container flex w-[90%] justify-between">
      <div
        className="w-[85%] flex justify-between items-center"
        onClick={handlePatientClick}
      >
        <div className="w-[20%]">
          <div className="name">{patient.Name}</div>
          <div className="age">{patient.Age} years old</div>
        </div>
        <div className="info w-[20%]">{patient.Patient_ID}</div>
        <div className="info w-[20%]">{patient.Gender}</div>
        <div className="info w-[20%]">{patient.disease_type}</div>
        <div className="info w-[20%]">{patient.mobile}</div>
      </div>
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
